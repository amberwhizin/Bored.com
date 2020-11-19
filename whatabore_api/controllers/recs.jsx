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

// recs.get("/seed", async (req, res) => {
//   const seedImage = [
//     {
//       title: "Fifth Element",
//       image: "",
//       description:
//         "An ancient alien species is in charge of protecting earth, but are destroyed before they can...except for one. This is an action packed comedy, typical Bruce Willis style film with a touch of romance. ",
//     },
//   ];
//   try {
//     const seedItems = await Recs.create(seedImage);
//     res.send(seedItems);
//   } catch (err) {
//     res.send(err.message);
//   }
// });

module.exports = recs;
