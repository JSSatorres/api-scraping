const express = require("express");
const {scrap} = require("../controllers/scraper-controllers")

const routerScraper = express.Router();

routerScraper.get("/1", scrap);
 routerScraper.get("/:pages", scrap);

module.exports = routerScraper;
