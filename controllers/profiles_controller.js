const express = require("express");
const users = express.Router();
const Profile = require("../models/profiles.js");

console.log("profile page");

//create
users.post("/", (req, res) => {
  Profile.create(
    {
      username: req.body.username,
      bio: req.body.bio,
      img: req.body.img,
      userId: req.body.userId,
    },
    (error, createdProfiles) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      // sending it back here!
      res.status(200).json(createdProfiles);
    }
  );
});

//index
users.get("/", (req, res) => {
  console.log(req.body);
  Profile.find({ userId: req.body._id }, (error, foundProfiles) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundProfiles);
  });
});

users.get("/seed", async (req, res) => {
  const seedData = [
    {
      username: "Slappy",
      bio: " I enjoy long walks",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSupsRu6CT_BvWl1svSUSEx9n0AWaJGQEx04g&usqp=CAU",
      userId: req.body._id,
    },
  ];
  try {
    const seedItems = await Profile.create(seedData);
    res.send(seedItems);
  } catch (error) {
    res.send(error.message);
  }
});

//console.log("controller/profiles.js is linked");
module.exports = users;
