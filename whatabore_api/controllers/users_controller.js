const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const users = express.Router();

const User = require("../models/users.js");

router.post("/", (req, res) => {
  res.send("register");
});

//   currentUser: req.session.currentUser //give access to the user
// })
//   });
//   users.post('/', (req, res) => {
//     //overwrite the user password with the hashed password, then pass that in to our database
//    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//    User.create(req.body, (err, createdUser) => {
//      console.log('user is created', createdUser)
//    });
//  });
module.exports = users;
