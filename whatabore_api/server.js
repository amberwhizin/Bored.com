const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;

// middleware
app.use(express.json());

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

//controllers
const recsController = require("./controllers/recs.jsx");
app.use("/recs", recsController);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
