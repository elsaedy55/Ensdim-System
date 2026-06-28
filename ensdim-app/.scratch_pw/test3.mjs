import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGEERROR:', err.message));
page.on('requestfailed', req => console.log('REQFAILED:', req.url(), req.failure()?.errorText));
page.on('response', res => { if (res.status() >= 400) console.log('HTTP', res.status(), res.url()); });

await page.goto('https://app.ensdim.com/login', { waitUntil: 'networkidle', timeout: 30000 }).catch(e => console.log('GOTO ERR', e.message));
console.log('URL:', page.url());
await page.screenshot({ path: '.scratch_pw/05-prod-login.png' });
await browser.close();
