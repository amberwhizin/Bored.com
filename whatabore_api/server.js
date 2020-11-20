const express = require("express");
var request = require("request");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;
const session = require('express-session')

const User = require("/Users/nicholaspretel/Documents/GA_Projects/Bored.com/whatabore_api/models/users");

require('dotenv').config();
const mongo_uri = process.env.mongoURI

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
app.post('/api/register', function(req, res) {
  const { username, password } = req.body;
  const user = new User({ username, password });
  console.log(user)
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
  // console.log(req.body)
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