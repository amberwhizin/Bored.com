//dependencies
const express = require("express");
const recs = express.Router();

const Recs = require("../models/recs.jsx");

//index
recs.get("/", (req, res) => {
  Recs.find({}, (error, foundRecs) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundRecs);
  });
});

//create
recs.post("/", (req, res) => {
  Recs.create(req.body, (error, createdRecs) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    // sending it back here!
    res.status(200).json(createdRecs);
  });
});

module.exports = recs;
