const puppeteer = require("puppeteer");
const redis = require("redis");
// const util = require("util");

async function scrapOnePage(req, res, next) {

  try {
    const client = redis.createClient("redis://127.0.0.1:6379");

    // client.set = util.promisify(client.set);
    await client.connect()
    const cachedPost1 = await client.get( `info1`);

    if (cachedPost1 ) {
      return res.send({ data: JSON.parse(cachedPost1)});
    }

    (async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://news.ycombinator.com/");

      const dataTitleUrl = [];
      const listTitleUrl = await page.$$(".athing");

      for (const item of listTitleUrl) {
        const title = await item.$(".titlelink");
        const url = await item.$(".sitestr");
        const getTitle = await page.evaluate((title) => title?.innerText,title);
        const getUrl = await page.evaluate((url) => url?.innerText, url);
        dataTitleUrl.push({ title: getTitle, url: getUrl, control: "1" });
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

      await browser.close();

      const info = dataTitleUrl.map((titleComent, index) => {
        return {
          title: titleComent?.title,
          url: titleComent?.url,
          author: dataAuthorComents[index]?.author,
          comments: dataAuthorComents[index]?.comments,
          control:index,
        };
      });

      client.set(`info1`, JSON.stringify(info));
      res.status(200).send({
        data: info,
      });
    })();
  } catch (error) {
    next(error);
  }
}


async function scrapXPages(req, res, next) {
  const { pages } = req.params;
  const client = redis.createClient("redis://127.0.0.1:6379");
  let pagesNoScrap = 0

  // const SET_ASYNC = util.promisify(client.set).bind(client);
  // const GET_ASYNC = util.promisify(client.get).bind(client);
  // const HGETALL_ASYNC = util.promisify(client.hGetAll).bind(client);

  await client.connect()

  const cachePage = await client.get(`info${pages}`);
  if (cachePage ) {
    return res.send({ data: JSON.parse(cachePage)});
  }

  for (let index =pages-1; 1 <index; index--) {

    let checkPages = "info"+index
    console.log("check pages ",checkPages);
    const cachePage = await client.get(checkPages);
    if (cachePage) {
      pagesNoScrap = index
      break;
    }
  }

  let loop;
  if (pages === undefined) {
    loop = 0;

  } else {
    loop = parseInt(pages)-pagesNoScrap;
    console.log("esto ea un loop", loop)
  }

  try {
    (async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(`https://news.ycombinator.com/news?p=${pagesNoScrap}`);
      let totalDataTitleUrl = [];
      let totalDataAuthorComents = [];


      for (let index = 0; index < loop; index++) {

      const dataTitleUrl = [];
      const listTitleUrl = await page.$$(".athing");

      for (const item of listTitleUrl) {
        const title = await item.$(".titlelink");
        const url = await item.$(".sitestr");
        const getTitle = await page.evaluate((title) => title?.innerText,title);
        const getUrl = await page.evaluate((url) => url?.innerText, url);
        dataTitleUrl.push({
          title: getTitle,
          url: getUrl,
          control: "1"
        });
      }
      totalDataTitleUrl = [...totalDataTitleUrl.concat(dataTitleUrl)]

      const dataAuthorComents = [];
      const listAuthorComents = await page.$$(".subtext");
      for (const item of listAuthorComents) {
        const author = await item.$(".hnuser");
        // const urls = await item.$eval(" span",el=>el.textContent);
        const getAuthor = await page.evaluate(author => author?.innerText,author);
        // const getUrl = await page.evaluate(comments => comments?.innerText, comments);
        dataAuthorComents.push({
          author: getAuthor,
          comments: "null",
          control: "1",
        });
      }
      totalDataAuthorComents =[...totalDataAuthorComents.concat( dataAuthorComents)]
      await page.click(".morelink");
      await page.waitForTimeout(1000);
    }

    await browser.close();

    const info =  totalDataTitleUrl.map((titleUrl, index) => {
        return {
          title: titleUrl?.title,
          url: titleUrl?.url,
          author: totalDataAuthorComents[index]?.author,
          comments: totalDataAuthorComents[index]?.comments,
          control:index,
        };
      });


      const previousCachePage = await client.get(`info${pagesNoScrap}`);
      const format = await JSON.parse(previousCachePage)

      let totalInfo =[]
      console.log("pagesNoScrap",pagesNoScrap);
      if (pagesNoScrap !== 0 ) {
        totalInfo= await format.concat(info)
      }else{
        totalInfo= info
      }
      client.set(`info${pages}`, JSON.stringify(totalInfo));
      console.log("info pages",`info${pages}`);
      res.status(200).send({
        data: totalInfo,
      });
    })();

  } catch (error) {
    next(error);
  }
}

module.exports = { scrapOnePage, scrapXPages};
