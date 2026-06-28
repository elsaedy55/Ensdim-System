import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGEERROR:', err.message));
page.on('requestfailed', req => console.log('REQFAILED:', req.url(), req.failure()?.errorText));

await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
console.log('Please log in manually in the opened browser window. Waiting up to 3 minutes...');

await page.waitForURL(url => !url.pathname.startsWith('/login'), { timeout: 180000 });
console.log('Logged in! Current URL:', page.url());

await page.screenshot({ path: '.scratch_pw/02-dashboard.png' });

// Open user avatar dropdown (last button in header, rounded-full)
const avatarBtn = page.locator('header button.rounded-full');
await avatarBtn.waitFor({ state: 'visible', timeout: 10000 });
await avatarBtn.click();
await page.waitForTimeout(500);
await page.screenshot({ path: '.scratch_pw/03-dropdown-open.png' });

const signOutItem = page.getByText('تسجيل الخروج', { exact: false }).last();
console.log('SignOut item visible:', await signOutItem.isVisible().catch(() => false));

const requests = [];
page.on('request', req => { if (req.url().includes('supabase') || req.url().includes('/login')) requests.push(req.method() + ' ' + req.url()); });

await signOutItem.click();
await page.waitForTimeout(3000);
console.log('URL after click:', page.url());
await page.screenshot({ path: '.scratch_pw/04-after-click.png' });
console.log('Relevant requests:', requests);

await browser.close();
