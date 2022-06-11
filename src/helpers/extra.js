const puppeteer = require("puppeteer");
client.set = util.promisify(client.set);
const redis = require("redis");


async function scrapAuthorComents() {
  (async () => {
    let dataTitleUrl = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");

    const listTitleUrl = await page.$$(".athing");

    for (const item of listTitleUrl) {
      const title = await item.$(".titlelink");
      const url = await item.$(".sitestr");
      const getTitle = await page.evaluate((title) => title?.innerText, title);
      const getUrl = await page.evaluate((url) => url?.innerText, url);
      dataTitleUrl.push({ title: getTitle, url: getUrl, num: "1" });
    }

    const dataAuthorComents = [];
    const listAuthorComents = await page.$$(".subtext");

    for (const item of listAuthorComents) {
      const author = await item.$(".hnuser");
      // const urls = await item.$eval(" span",el=>el.textContent);
      const getAuthor = await page.evaluate(
        (author) => author?.innerText,
        author
      );
      // const getUrl = await page.evaluate(comments => comments?.innerText, comments);
      dataAuthorComents.push({
        author: getAuthor,
        comments: "null",
        control: "1",
      });
    }

    const info = dataTitleUrl.map((titleComent, index) => {
      return {
        title: titleComent?.title,
        url: titleComent?.url,
        author: dataAuthorComents[index]?.author,
        comments: dataAuthorComents[index]?.comments,
      };
    });

    await page.click("#didomi-notice-agree-button");
    await browser.close();

    res.status(200).send({
      data: info,
    });
  })();
}

async function scrapAuthorComents() {
  (async () => {
    let dataTitleUrl = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");

    const listTitleUrl = await page.$$(".athing");

    for (const item of listTitleUrl) {
      const title = await item.$(".titlelink");
      const url = await item.$(".sitestr");
      const getTitle = await page.evaluate((title) => title?.innerText, title);
      const getUrl = await page.evaluate((url) => url?.innerText, url);
      dataTitleUrl.push({ title: getTitle, url: getUrl, num: "1" });
    }

    const dataAuthorComents = [];
    const listAuthorComents = await page.$$(".subtext");

    for (const item of listAuthorComents) {
      const author = await item.$(".hnuser");
      // const urls = await item.$eval(" span",el=>el.textContent);
      const getAuthor = await page.evaluate(
        (author) => author?.innerText,
        author
      );
      // const getUrl = await page.evaluate(comments => comments?.innerText, comments);
      dataAuthorComents.push({
        author: getAuthor,
        comments: "null",
        control: "1",
      });
    }

    const info = dataTitleUrl.map((titleComent, index) => {
      return {
        title: titleComent?.title,
        url: titleComent?.url,
        author: dataAuthorComents[index]?.author,
        comments: dataAuthorComents[index]?.comments,
      };
    });

    await page.click("#didomi-notice-agree-button");
    await browser.close();

    res.status(200).send({
      data: info,
    });
  })();
}

module.exports = { scrapAuthorComents };
