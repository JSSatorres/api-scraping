const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/user", (req, res) => {
  res.json({ "userId": "scrap" });
});

module.exports = app;