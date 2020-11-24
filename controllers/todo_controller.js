const express = require("express");
const lists = express.Router();

const TodoList = require("../models/todoList.js");

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

module.exports = lists;
