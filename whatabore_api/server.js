const express = require("express");
var request = require("request");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const withAuth = require("./middleware");
const methodOverride = require("method-override");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const jwt = require("jsonwebtoken");
const mongo_uri =
  process.env.mongoURI || "mongodb://localhost:27017/" + `snugglehug`;
const User = require("./models/users.js");

const secret = process.env.secret;
// middleware
app.use(express.static("public"));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form
app.use("/index/users", require("./controllers/users_controller"));
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

//mongoose connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);

mongoose.connection.on("disconnected", () =>
  console.log("mongo is disconnected")
);

mongoose.connect(mongo_uri, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to mongo`);
  }
});
// mongoose.connect("mongodb://localhost:27017/recs", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//ROUTES//
//weather api//
// app.get("/index", (req, res) =>{
//   request('http://api.weatherstack.com/current?access_key=1de0c1d768e34c9c3154e1feaedfa5be&query=Toronto', function (error, response, body){
//     if(!error && response.statusCode == 200){
// var parsedBody = JSON.parse(body);
// var temperature = parsedBody['current']['temperature']
//       res.send({temperature}) //print the google web page
//     }
//   })
// });

app.get("/api/home", function (req, res) {
  res.send("Welcome!");
});

app.get("/api/secret", function (req, res) {
  res.send("The password is potato");
});

app.get("/api/secret", withAuth, function (req, res) {
  res.sendStatus(200);
});

app.get("/api/logout", function (req, res) {});

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
  // console.log(req.body)
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
