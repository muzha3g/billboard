const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: Date,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, //連接到 Post collection 的 ObjectId primary key
  like: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
