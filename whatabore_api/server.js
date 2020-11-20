const express = require("express");
var request = require("request");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const PORT = 3001;
const session = require('express-session')

const mongo_uri = process.env.mongoURI
// const User = require('../models/users.js');

// middleware
app.use(express.json());
app.use('/index/users', require('./controllers/users_controller'));
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

mongoose.connect(mongo_uri, function(err) {
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

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.get('/api/secret', function(req, res) {
  res.send('The password is potato');
});

//LOGIN ROUTE//

// POST route to register a user
// app.post('/api/register', function(req, res) {
//   const { email, password } = req.body;
//   const user = new User({ email, password });
//   user.save(function(err) {
//     if (err) {
//       res.status(500)
//         .send("Error registering new user please try again.");
//     } else {
//       res.status(200).send("Welcome to the club!");
//     }
//   });
// });


app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});


