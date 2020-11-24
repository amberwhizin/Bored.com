const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean },
});

const TodoList = mongoose.model("Product", todoListSchema);

module.exports = TodoList;
