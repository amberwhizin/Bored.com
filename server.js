const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // build in module from node
const cookieParser = require("cookie-parser");
const withAuth = require("./middleware");
//const methodOverride = require("method-override");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const jwt = require("jsonwebtoken");
//const cors = require("cors");

const secret = process.env.secret;
// middleware
app.use(express.static("public"));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
//app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

app.use(cookieParser());
//secret middelware
// app.use(
//   session({
//     clientSecret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
//     clientID: process.env.SECRET,
//     resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
//     saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
//   })
// )


const mongo_uri =
  process.env.mongoURI || "mongodb://localhost:27017/" + `snugglehug`;

const User = require("./models/users.js");

//mongoose connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);

mongoose.connection.on("disconnected", () =>
  console.log("mongo is disconnected")
);

mongoose.connect(
  mongo_uri,
  { useNewUrlParser: true },
  { useUnifiedTopology: true },
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to mongo`);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//index
app.get("/api/home", function (req, res) {
  res.send("Welcome!");
});

app.get("/api/secret", function (req, res) {
  res.send("The password is potato");
});

app.get("/api/secret", withAuth, function (req, res) {
  res.sendStatus(200);
});

app.delete("/api/logout", function (req, res) {
  req.app.destroy(() => {
    res.redirect("/api/register");
  });
});

// POST route to register a user
app.post("/api/register", function (req, res) {
  const { username, password } = req.body;
  const user = new User({ username, password });
  console.log(user);
  user.save(function (err) {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post("/api/authenticate", function (req, res) {
  const { username, password } = req.body;
  User.findOne({ username }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect username or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect username or password",
          });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h",
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

//whenever our app is in heroku, where going to serve the build folder
if (process.env.NODE_ENV === "production") {
  //set static folder
  //all the JS and CSS files will be read and served from this folder
  app.use(express.static("whatabore_client/build"));

  // any other route that the iuse goes to that is NOT willing to go to one that we previously configured the we want to keep sending them a page they can see
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "whatabore_client", "build", "index.html")
    );
  });
}
//profile controller
const profileController = require("./controllers/profiles_controller.js");
app.use("/profiles", profileController);
app.use("/index/users", require("./controllers/users_controller"));

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});

// curl -X POST \
//   http://localhost:3001/api/register \
//   -H 'Content-Type: application/json' \
//   -d '{
//  "username": "me@example.com",
//  "password": "mypassword"
// }'
