const puppeteer = require("puppeteer");
const fs = require("fs");

exports.test = async (req, res) => {
  console.log("started");
  const pngName = "goog-home.png";

  await (async () => {
    const browser = await puppeteer.launch({
      defaultViewport: null,
      args: [
        "--window-size=1920,1080",
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ]
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto("https://google.com");

    console.log("saying hello");
    await page.type("input", "hello google");

    console.log("snapping a pic");
    await page.screenshot({ path: pngName });

    await page.close();
    await browser.close();
  })();

  res.set("Content-Type", "image/png");

  s = fs.createReadStream("./" + pngName);

  s.pipe(res);
};
