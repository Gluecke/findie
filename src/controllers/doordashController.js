const puppeteer = require("puppeteer");

exports.searchDoordash = async (req, res) => {
  let ddSearch = await (async () => {
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

    await page.type("input", req.query.location, { delay: 200 });
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    //page not waiting for search to load, need to replace this with correct wait
    await page.waitFor(5000);

    await page.waitForSelector("input");
    await page.type("input", req.query.store);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    let doorDashRes = await page.waitForResponse(response => {
      return (
        response.url().includes("graphql") &&
        response.request().method() === "POST"
      );
    });

    ddJson = await doorDashRes.json();

    await page.close();
    await browser.close();

    let found = ddJson.data.storeSearch.stores.find(store =>
      store.name.includes(req.query.store)
    );

    if (found) {
      return {
        store: req.query.store,
        found: true,
        deliveryFee: found.deliveryFee
      };
    } else {
      return {
        store: req.query.store,
        found: false,
        deliveryFee: null
      };
    }
  })();

  res.json(ddSearch);
};
