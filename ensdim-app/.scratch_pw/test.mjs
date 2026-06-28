import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGEERROR:', err.message));
page.on('requestfailed', req => console.log('REQFAILED:', req.url(), req.failure()?.errorText));

await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' });
console.log('LOGIN PAGE URL:', page.url());

await page.screenshot({ path: '.scratch_pw/01-login.png' });

await browser.close();
