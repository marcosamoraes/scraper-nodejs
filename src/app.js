import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

(async () => {
	const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
  });

	const page = await browser.newPage();

	await page.goto("https://www.instagram.com/");
  await page.waitForNetworkIdle();

  await page.type('[name="username"]', process.env.INSTAGRAM_USERNAME, {delay:100});
  await page.type('[name="password"]', process.env.INSTAGRAM_PASSWORD, {delay:100});

  await page.click('[type="submit"]');

  await page.waitForNavigation();

	await page.goto("https://www.instagram.com/p/CoTA0KoOahY/?igshid=YmMyMTA2M2Y=", {waitUntil: 'domcontentloaded'});
  await page.waitForNetworkIdle();

  const scrollable_section = '._ae5q._akdn._ae5r._ae5s';
  await page.waitForSelector('._ae5q._akdn._ae5r._ae5s > ul._a9z6._a9za');

  await page.evaluate(selector => {
    const scrollableSection = document.querySelector(selector);

    scrollableSection.scrollTop = scrollableSection.offsetHeight;
  }, scrollable_section);

  await page.waitForSelector('[aria-label="Carregar mais comentários"]').then(() => {
    page.click('[aria-label="Carregar mais comentários"]');
  })

  await page.waitForTimeout(Math.floor(Math.random() * 5000) + 2000);
})();
