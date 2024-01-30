const { required } = require("joi");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: Date,
  author: String,
});

module.exports = mongoose.model("Post", PostSchema);
