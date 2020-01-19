const puppeteer = require("puppeteer");

exports.searchDoordash = async (req, res) => {
  await (async () => {
    const browser = await puppeteer.launch({
      // headless: false,
      defaultViewport: null,
      args: [
        "--window-size=1920,1080",
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ]
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto("https://doordash.com", { waitUntil: "networkidle0" });
    await page.waitForSelector("input");

    await page.type("input", "526 Market St, Philadelphia, PA", { delay: 200 });
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    //page not waiting for search to load, need to replace this with correct wait
    await page.waitFor(5000);

    await page.waitForSelector("input");
    await page.type("input", "Five Guys");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    page.close();
    browser.close();
  })();

  res.json({ found: false, deliveryFee: null });
};
