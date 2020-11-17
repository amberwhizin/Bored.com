const express = require("express");
const recs = express.Router();


//index
recs.get("/", (req, res) => {
  res.send("helloooooo everyone");
});

module.exports = recs;
