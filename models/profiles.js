const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profilesSchema = new Schema({
  username: { type: String, required: true },
  bio: String,
  img: String,
  // userId: { type: Schema.ObjectId, ref: "Profile", required: true },
});

const Profile = mongoose.model("Profile", profilesSchema);
module.exports = Profile;
