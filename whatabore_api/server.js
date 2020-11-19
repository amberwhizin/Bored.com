const express = require("express");
var request = require("request");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;
const session = require('express-session')

// middleware
app.use(express.json());

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

mongoose.connect("mongodb://localhost:27017/recs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});


//ROUTES//
app.get("/index", (req, res) =>{
  request('http://api.weatherstack.com/current?access_key=1de0c1d768e34c9c3154e1feaedfa5be&query=Toronto', function (error, response, body){
    if(!error && response.statusCode == 200){
var parsedBody = JSON.parse(body);
var temperature = parsedBody['current']['temperature']
      res.send({temperature}) //print the google web page
    }
  })
});

//MUSIC ROUTE//


app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});


