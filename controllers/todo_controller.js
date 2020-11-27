const express = require("express");
const lists = express.Router();
const cors = require("cors");

const TodoList = require("../models/todoList.js");

const allowedURLs = ["http://localhost:3000", "https://localhost:3001"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedURLs.indexOf(origin) >= 0) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

lists.use(cors(corsOptions));

//index
lists.get("/", (req, res) => {
  TodoList.find({}, (error, foundList) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).json(foundList);
  });
});

// create
// req.body is your object from your schema, this sends createdList back
lists.post("/", (req, res) => {
  TodoList.create(req.body, (error, createdList) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    // sending it back here!
    res.status(200).json(createdList);
  });
});

//update
lists.put("/:id", (req, res) => {
  //find id and update body}
  TodoList.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).json();
    }
  );
});

// delete
lists.delete('/:id', (req, res) => {
  TodoList.findByIdAndRemove(req.params.id, (error, deletedList) => {
    if (error) {
      res.status(400).json( {error: error.message})
    }
    res.status(200).json(deletedList);
  });
});

module.exports = lists;
