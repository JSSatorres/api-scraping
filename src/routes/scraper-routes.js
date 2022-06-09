const express = require("express");

const routerScraper = express.Router();

routerScraper.get("/1", (req, res) => {
  res.json({ "api": "scraping" });
});

module.exports = routerScraper;
