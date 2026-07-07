import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (err) => errors.push(err.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
await page.fill('#email', 'admin@demo.ensdim.com');
await page.fill('#password', 'Admin@123456');
await page.click('button[type="submit"]');
await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 20000 });

await page.goto('http://localhost:3000/admin/tasks', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const uniqueTitle = `Perf test task ${Date.now()}`;

// Open "Add task" on the first column and fill the form
const addButtons = page.getByText('Add task', { exact: false });
await addButtons.first().click();
await page.waitForTimeout(300);
await page.fill('#t-title', uniqueTitle);

// Track when the POST to Supabase actually resolves vs when the card appears
let insertResolvedAt = null;
page.on('response', (res) => {
  if (res.url().includes('/rest/v1/tasks') && res.request().method() === 'POST') {
    insertResolvedAt = Date.now();
  }
});

const clickAt = Date.now();
await page.locator('button[type="submit"]').last().click();

// Poll for the optimistic card to appear in the DOM
let cardAppearedAt = null;
for (let i = 0; i < 100; i++) {
  const visible = await page.getByText(uniqueTitle, { exact: false }).first().isVisible().catch(() => false);
  if (visible) { cardAppearedAt = Date.now(); break; }
  await page.waitForTimeout(20);
}

console.log('Task title:', uniqueTitle);
console.log('Card appeared in DOM after (ms):', cardAppearedAt ? cardAppearedAt - clickAt : 'NEVER');
console.log('Server insert resolved after (ms):', insertResolvedAt ? insertResolvedAt - clickAt : 'not captured');
console.log('Card appeared BEFORE server responded:', cardAppearedAt && insertResolvedAt ? cardAppearedAt < insertResolvedAt : 'n/a');

await page.waitForTimeout(1500); // let onSuccess invalidate/refetch settle
// Written outside the project dir so the screenshot file itself doesn't
// trigger the Next.js dev server's file watcher / Fast Refresh mid-test.
await page.screenshot({ path: 'C:/Users/ElSaedy/AppData/Local/Temp/claude/e--Projects-Ensdim-System/933713e7-b313-459b-a96f-6528a87a6800/scratchpad/mutation-task-created.png', fullPage: true });

console.log('Console/page errors:', errors.length ? errors : 'none');

await browser.close();
