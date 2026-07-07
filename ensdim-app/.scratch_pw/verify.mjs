import { chromium } from 'playwright';

const browser = await chromium.launch();

async function checkLogin(email, password, expectedPathPrefix, label) {
  const page = await browser.newPage();
  const errors = [];
  const badRequests = [];

  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('response', (res) => {
    if (res.status() >= 400) badRequests.push(`${res.status()} ${res.url()}`);
  });

  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.startsWith('/login'), { timeout: 20000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000); // let client-side queries settle

  const url = page.url();
  const ok = url.includes(expectedPathPrefix);
  const bodyText = await page.locator('body').innerText();
  const missingIntl = /MISSING_MESSAGE|Could not resolve/i.test(bodyText) ||
    errors.some((e) => /MISSING_MESSAGE|IntlError/i.test(e));

  await page.screenshot({ path: `.scratch_pw/verify-${label}.png`, fullPage: true });

  console.log(`\n=== ${label} ===`);
  console.log('Landed on:', url, ok ? '(OK)' : '(UNEXPECTED)');
  console.log('Console/page errors:', errors.length ? errors : 'none');
  console.log('HTTP >=400 responses:', badRequests.length ? badRequests : 'none');
  console.log('Missing i18n message detected:', missingIntl);

  await page.close();
}

await checkLogin('admin@demo.ensdim.com', 'Admin@123456', '/admin', 'admin-overview');
await checkLogin('client@demo.ensdim.com', 'Client@123456', '/dashboard', 'client-dashboard');

await browser.close();
