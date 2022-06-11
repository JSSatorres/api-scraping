const express = require("express");
const {scrapOnePage, scrapXPages} = require("../controllers/scraper-controllers");
const { redisFun } = require("../redis/redis");

const routerScraper = express.Router();

routerScraper.get("/1", scrapOnePage);
routerScraper.get("/Hola/2", redisFun)
routerScraper.get("/:pages", scrapXPages);


module.exports = routerScraper;
