# ENSDIM Technical SEO Checklist
**Date:** June 2026  
**Use this:** Before launch and monthly thereafter

---

## SECTION 1: CRITICAL BLOCKERS ✅ FIXED

- [x] **Remove noindex/nofollow** — Removed from `index.html`
- [x] **Fix placeholder title** — Replaced with production title
- [x] **Fix placeholder description** — Replaced with ENSDIM-specific description

---

## SECTION 2: CRAWLABILITY & INDEXING

- [x] **robots.txt exists** — `/public/robots.txt` created
- [x] **robots.txt allows Googlebot** — `User-agent: Googlebot / Allow: /`
- [x] **robots.txt allows AI crawlers** — GPTBot, ClaudeBot, PerplexityBot, Google-Extended all allowed
- [x] **sitemap.xml exists** — `/public/sitemap.xml` created
- [x] **sitemap.xml referenced in robots.txt** — `Sitemap: https://ensdim.com/sitemap.xml`
- [x] **sitemap.xml submitted to Google Search Console** — ⚠️ Action needed after deployment
- [x] **sitemap.xml submitted to Bing Webmaster Tools** — ⚠️ Action needed after deployment
- [ ] **Google Search Console property verified** — Add verification meta tag to `index.html`
- [ ] **Bing Webmaster Tools property verified** — Add verification meta tag
- [ ] **server returns 200 for HTML** — Verify after deployment

---

## SECTION 3: METADATA (Per Page)

- [x] **Unique title tag on every page** — Implemented via `SEO` component + `react-helmet-async`
- [x] **Unique meta description on every page** — Implemented
- [x] **Keywords meta tag** — Implemented (not ranking factor but AI signals)
- [x] **Canonical tag on every page** — Implemented via `SEO` component
- [x] **robots meta allows indexing** — `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`
- [x] **hreflang en + ar + x-default** — Implemented on all pages
- [ ] **Title length 50-60 characters** — Audit current titles
- [ ] **Description length 140-160 characters** — Audit current descriptions

---

## SECTION 4: OPEN GRAPH

- [x] **og:title** — Implemented
- [x] **og:description** — Implemented
- [x] **og:image** — Implemented (points to `/og-image.png`)
- [x] **og:url** — Implemented
- [x] **og:type** — Implemented (website/article)
- [x] **og:site_name** — ENSDIM
- [x] **og:locale** — en_US / ar_SA
- [x] **og:image dimensions** — 1200x630
- [ ] **OG image file exists** — ⚠️ Create `/public/og-image.png` (1200x630px, ENSDIM branding)
- [ ] **Test OG tags** — Use Facebook Sharing Debugger and LinkedIn Post Inspector

---

## SECTION 5: TWITTER CARDS

- [x] **twitter:card** — `summary_large_image`
- [x] **twitter:site** — `@ensdim`
- [x] **twitter:title** — Implemented
- [x] **twitter:description** — Implemented
- [x] **twitter:image** — Implemented
- [ ] **Test Twitter Cards** — Use Twitter Card Validator

---

## SECTION 6: STRUCTURED DATA (JSON-LD)

- [x] **Organization schema** — Implemented in `GlobalSchemas.tsx`
- [x] **LocalBusiness schema** — Implemented
- [x] **WebSite schema with SearchAction** — Implemented
- [x] **Service schema** — Implemented on `ServiceDetailPage`
- [x] **FAQPage schema** — Implemented on `HomePage`
- [x] **BlogPosting schema** — Implemented on `BlogArticlePage`
- [x] **JobPosting schema** — Implemented on `CareerDetailPage`
- [ ] **BreadcrumbList schema** — Not yet implemented (add to detail pages)
- [ ] **VideoObject schema** — Not yet implemented (add for hero video)
- [ ] **Review/Rating schema** — Add when testimonials have real data
- [ ] **Validate schemas** — Use Google Rich Results Test

---

## SECTION 7: PWA & PERFORMANCE

- [x] **manifest.json** — Created at `/public/manifest.json`
- [x] **theme-color meta tag** — Added to `index.html`
- [x] **apple-touch-icon** — Added to `index.html`
- [x] **Preconnect to Google Fonts** — Added to `index.html`
- [ ] **Favicon** — Verify `/ensdim-logo.png` renders at 32x32 and 192x192
- [ ] **Core Web Vitals — LCP** — Target < 2.5s. Optimize hero video loading
- [ ] **Core Web Vitals — CLS** — Target < 0.1. Check layout shifts from dynamic content
- [ ] **Core Web Vitals — INP** — Target < 200ms. Check interaction delays
- [ ] **PageSpeed score** — Run Google PageSpeed Insights after deployment
- [ ] **Mobile performance** — Test on real device or Chrome DevTools mobile
- [ ] **Image optimization** — Convert logo.png to WebP, use `loading="lazy"` on below-fold images

---

## SECTION 8: GEO & AI SEARCH

- [x] **robots.txt allows AI crawlers** — All major AI crawlers explicitly allowed
- [x] **llms.txt** — Created at `/public/llms.txt`
- [x] **Organization entity JSON-LD** — Implemented
- [x] **FAQ schema for AI extraction** — Implemented on homepage
- [x] **Geo meta tags** — `geo.region`, `geo.placename`, ICBM coordinates
- [ ] **Google Business Profile** — Create and verify
- [ ] **Crunchbase listing** — Create company profile
- [ ] **LinkedIn company page** — Create if not exists
- [ ] **Clutch.co listing** — Register and collect reviews

---

## SECTION 9: CONTENT & INTERNAL LINKING

- [x] **Unique content per page** — All pages have unique descriptions
- [ ] **H1 tag on every page** — Audit that every page component has exactly one H1
- [ ] **Heading hierarchy** — Verify H1 → H2 → H3 hierarchy on all pages
- [ ] **Internal links on blog articles** — Add 3-5 contextual internal links per article
- [ ] **No orphan pages** — Verify all pages are linked from navigation or internal content
- [ ] **Alt text on all images** — Audit all `<img>` tags in components
- [ ] **Anchor text diversity** — Avoid using same anchor text for all links to a page

---

## SECTION 10: BILINGUAL (Arabic/English)

- [x] **hreflang tags** — en, ar, x-default on all pages
- [x] **HTML lang attribute** — Set dynamically via SEO component (`lang={lang}`)
- [x] **HTML dir attribute** — Set to ltr/rtl via SEO component
- [ ] **Arabic content quality** — Verify Arabic translations are natural, not machine-translated
- [ ] **Arabic keyword research** — Run keyword research for Arabic target terms
- [ ] **URL-based language routing** — Consider `/en/` and `/ar/` URL paths (long-term)

---

## SECTION 11: LAUNCH CHECKLIST

Complete these before launching to production:

### Pre-Launch
- [ ] Create `/public/og-image.png` (1200x630, ENSDIM branded)
- [ ] Verify all page titles are unique
- [ ] Verify all page descriptions are 140-160 characters
- [ ] Run Rich Results Test on homepage, service page, and blog article
- [ ] Test social sharing on Facebook, LinkedIn, Twitter
- [ ] Configure Google Analytics 4 (GA4)
- [ ] Configure Google Tag Manager (GTM)

### Day of Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Request indexing of homepage in Google Search Console
- [ ] Test robots.txt at `/robots.txt`
- [ ] Test sitemap at `/sitemap.xml`
- [ ] Test llms.txt at `/llms.txt`
- [ ] Test manifest at `/manifest.json`

### Post-Launch (Week 1)
- [ ] Monitor Google Search Console for crawl errors
- [ ] Verify pages appear in Google index (site:ensdim.com)
- [ ] Run PageSpeed Insights
- [ ] Test on mobile devices
- [ ] Verify OG images render correctly

### Post-Launch (Month 1)
- [ ] Check initial keyword rankings for primary terms
- [ ] Submit to regional directories (Clutch, GoodFirms)
- [ ] Create Google Business Profile
- [ ] Test AI search appearance (query ChatGPT/Perplexity with "ENSDIM")
- [ ] Publish first 4 blog articles from content plan

---

## MONITORING TOOLS

| Tool | Purpose | Frequency |
|---|---|---|
| Google Search Console | Crawl errors, indexation, rankings | Weekly |
| Google Analytics 4 | Traffic, conversions, behavior | Weekly |
| PageSpeed Insights | Core Web Vitals | Monthly |
| Screaming Frog | Full site crawl audit | Monthly |
| Ahrefs / SEMrush | Keyword rankings, backlinks | Monthly |
| Rich Results Test | Schema validation | After changes |
| Facebook Sharing Debugger | OG tag validation | After changes |
| ChatGPT / Perplexity | AI visibility check | Monthly |
