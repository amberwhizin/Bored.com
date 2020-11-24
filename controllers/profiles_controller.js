const express = require("express");
const users = express.Router();
const Profile = require("../models/profiles.js");

console.log("*******profile page");

//index
users.get("/", (req, res) => {
  console.log(req.body);
  Profile.find({ userId: req.body._id }, (error, foundProfiles) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundProfiles);
  });
  //console.log(req.body);
});

//create
users.post("/", (req, res) => {
  console.log(req.body);
  Profile.create(
    {
      username: req.body.username,
      bio: req.body.bio,
      img: req.body.img,
      // userId: req.body._id,
    },
    (error, createdProfiles) => {
      console.log(req.body);
      if (error) {
        res.status(400).json({ error: error.message });
      }
      // sending it back here!
      console.log(createdProfiles);
      res.status(200).json(createdProfiles);
    }
  );
  console.log(req.body);
});

users.get("/seed", async (req, res) => {
  const seedData = [
    {
      username: "Slappy",
      bio: " I enjoy long walks",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSupsRu6CT_BvWl1svSUSEx9n0AWaJGQEx04g&usqp=CAU",
      userId: "",
    },
  ];
  try {
    const seedItems = await Profile.create(seedData);
    res.send(seedItems);
  } catch (error) {
    res.send(error.message);
  }
});

console.log("controller/profiles.js is linked");
module.exports = users;
