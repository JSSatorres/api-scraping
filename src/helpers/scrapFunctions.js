const puppeteer = require("puppeteer");

async function scrapTitleUrl() {
  (async () => {
    const dataTitleUrl = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");

    const listTitleUrl = await page.$$(".athing");

    for (const item of listTitleUrl) {
      const title = await item.$(".titlelink");
      const url = await item.$(".sitestr");
      const getTitle = await page.evaluate((title) => title?.innerText, title);
      const getUrl = await page.evaluate((url) => url?.innerText, url);
      await dataTitleUrl.push({
        title: getTitle,
        url: getUrl,
        num: "1"
      });
    }
    console.log("ssssssssssss", dataTitleUrl);
    await browser.close();
    return dataTitleUrl;

  })();
}

async function scrapAuthorComents() {
  (async () => {
    const dataAuthorComents = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");
    const listAuthorComents = await page.$$(".subtext");

    for (const item of listAuthorComents) {
      const author = await item.$(".hnuser");
      // const urls = await item.$eval(" span",el=>el.textContent);
      const getAuthor = await page.evaluate((author) => author?.innerText, author );
      // const getUrl = await page.evaluate(comments => comments?.innerText, comments);
      await dataAuthorComents.push({
        author: getAuthor,
        comments: "null",
        control: "1",
      });
    }
    console.log("ojooo");
    await browser.close();
    return  dataAuthorComents
  })();
}



module.exports = { scrapAuthorComents, scrapTitleUrl };
