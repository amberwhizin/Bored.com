const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recsSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Recs", recsSchema);
