import { chromium } from 'playwright';
import sparticuzChromium from '@sparticuz/chromium';
import { preview } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { caseStudies } from '../src/data/caseStudies';
import { STATIC_PAGES } from '../src/data/staticPages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = 4173;

// Renders every route with a real browser after `vite build` and writes the
// resulting DOM (title, meta tags, JSON-LD, visible content — all injected
// client-side by react-helmet-async) to a static index.html per route.
// Vercel serves a matching static file before falling back to the SPA
// rewrite in vercel.json, so crawlers that don't execute JS (many AI bots,
// social preview scrapers) get real per-page content instead of the generic
// homepage shell.

async function getDynamicPaths(): Promise<string[]> {
  const paths = caseStudies
    .filter((study) => study.is_published)
    .map((study) => `/case-studies/${study.slug}`);

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('[prerender] Missing Supabase credentials — skipping blog/research slugs');
    return paths;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const [blogPosts, researchArticles] = await Promise.all([
    supabase.from('blog_posts').select('slug').eq('is_published', true),
    supabase.from('research_articles').select('slug').eq('is_published', true),
  ]);

  if (blogPosts.error) console.error('[prerender] Failed to fetch blog_posts:', blogPosts.error.message);
  if (researchArticles.error) console.error('[prerender] Failed to fetch research_articles:', researchArticles.error.message);

  for (const post of blogPosts.data ?? []) paths.push(`/blog/${post.slug}`);
  for (const article of researchArticles.data ?? []) paths.push(`/research/${article.slug}`);

  return paths;
}

function outputPathFor(route: string): string {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

async function main() {
  const staticPaths = STATIC_PAGES.map((p) => p.path);
  const dynamicPaths = await getDynamicPaths();
  const arPaths = [...staticPaths, ...dynamicPaths];
  const routes = arPaths.flatMap((p) => [p, p === '/' ? '/en' : `/en${p}`]);

  console.log(`[prerender] Prerendering ${routes.length} routes (${arPaths.length} pages x ar/en)...`);

  const server = await preview({ root: ROOT, preview: { port: PORT, strictPort: true } });
  const base = server.resolvedUrls?.local?.[0] ?? `http://localhost:${PORT}/`;

  // Vercel's build container is missing the shared libs (libnspr4.so etc.)
  // that Playwright's downloaded Chromium needs, and there's no apt/yum
  // access to install them. @sparticuz/chromium ships a statically-linked
  // build made for exactly this environment, so use it there and fall back
  // to Playwright's own browser (installed via postinstall) everywhere else.
  const launchBrowser = async () =>
    process.env.VERCEL
      ? chromium.launch({
          args: sparticuzChromium.args,
          executablePath: await sparticuzChromium.executablePath(),
          headless: true,
        })
      : chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  let browser = await launchBrowser();
  let page = await browser.newPage();

  // Headless Chromium's memory grows across many sequential navigations
  // (animations, canvases, etc.) and can crash the renderer/browser process
  // outright. Recreate the page periodically and transparently relaunch the
  // browser whenever it (or the page) has died, so one crash doesn't take
  // down every remaining route.
  const RECYCLE_EVERY = 15;
  let routesSinceRecycle = 0;

  async function ensureLivePage() {
    if (!browser.isConnected()) {
      browser = await launchBrowser();
      page = await browser.newPage();
      routesSinceRecycle = 0;
      return;
    }
    if (page.isClosed()) {
      page = await browser.newPage();
      routesSinceRecycle = 0;
    }
  }

  let ok = 0;
  const failed: string[] = [];

  for (const route of routes) {
    if (routesSinceRecycle >= RECYCLE_EVERY) {
      await page.close().catch(() => {});
      page = await browser.newPage();
      routesSinceRecycle = 0;
    }

    const url = new URL(route, base).toString();
    const attempts = 2;
    let lastErr: Error | undefined;

    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        await ensureLivePage();
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        await page.waitForSelector('footer', { timeout: 15000 });
        // Let react-helmet-async's effect flush title/meta/JSON-LD into <head>.
        await page.waitForTimeout(150);

        const html = await page.content();
        const outPath = outputPathFor(route);
        await fs.mkdir(path.dirname(outPath), { recursive: true });
        await fs.writeFile(outPath, `<!doctype html>\n${html}`);
        ok++;
        routesSinceRecycle++;
        lastErr = undefined;
        break;
      } catch (err) {
        lastErr = err as Error;
        // Force a relaunch/new page before the retry attempt.
        await ensureLivePage().catch(() => {});
      }
    }

    if (lastErr) {
      failed.push(route);
      console.error(`[prerender] Failed: ${route} — ${lastErr.message}`);
    }
  }

  await browser.close().catch(() => {});
  await new Promise<void>((resolve, reject) => {
    server.httpServer.close((err) => (err ? reject(err) : resolve()));
  });

  console.log(`[prerender] Done. ${ok}/${routes.length} pages prerendered.`);
  if (failed.length) {
    console.error(`[prerender] ${failed.length} route(s) failed:\n${failed.join('\n')}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exitCode = 1;
});
