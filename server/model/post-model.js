const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: [true, "標題不能是空白 "] },
  text: { type: String, required: [true, "內文不能是空白 "] },
  date: Date,
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
