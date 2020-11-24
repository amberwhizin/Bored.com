const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const TodoList = mongoose.model("TodoList", todoListSchema);

module.exports = TodoList;
