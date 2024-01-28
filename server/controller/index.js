const Post = require("../model/post-model");
const postValidation = require("../validation").postValidation;

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
  // 確認數據是否符合規範
  let { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { title, text } = req.body;
    const currentDate = new Date();
    let newPost = new Post({
      title,
      text,
      date: currentDate,
      author: req.user.name,
    });
    await newPost.save();
    return res.status(200).send(newPost);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

const updateAPost = async (req, res) => {
  // 確認數據是否符合規範
  let { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const id = req.params.id;
    const { title, text } = req.body;

    let updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { title, text },
      { new: true }
    ).exec();

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    return res.status(200).json(updatedPost);
  } catch (e) {
    console.error("Error updating post:", e);
    return res.status(500).json({ message: "Internal Server Error" });
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

const getAPost = async (req, res) => {
  try {
    const id = req.params.id;
    const findPost = await Post.find({ _id: id }).exec();
    return res.status(200).send(findPost);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Post not found");
  }
};

module.exports = { getAllPosts, updateAPost, addAPost, deleteAPost, getAPost };
