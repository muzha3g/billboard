const Post = require("../model/post-model");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).send(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Cannot find any posts");
  }
};

const addAPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const currentDate = new Date();
    let newPost = new Post({
      title,
      text,
      date: currentDate,
    });
    await newPost.save();
    return res.status(200).send(newPost);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const updateAPost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, text } = req.body;
    let currentPostToUpdate = await Post.findOneAndUpdate(
      { _id: id },
      { title, text },
      { new: false }
    ).exec();

    if (!currentPostToUpdate) {
      return res.status(500).send("Unable to update");
    }

    return res.status(200).send(currentPostToUpdate);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Something went wrong while updating" });
  }
};

const deleteAPost = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrentPost = await Post.findOneAndDelete({ _id: id });
    if (!findCurrentPost) {
      return res.status(400).send("Post not found");
    }
    return res.status(200).send(findCurrentPost);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Unable to delete");
  }
};

module.exports = { getAllPosts, updateAPost, addAPost, deleteAPost };
