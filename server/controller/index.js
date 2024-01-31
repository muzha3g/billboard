const Post = require("../model/post-model");
const postValidation = require("../validation").postValidation;

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author", ["name"]).exec(); //populate 會讓 author 的值變成括號裡指定的 key-value 物件，這樣就能抓到是誰寫這個 Post 了
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

  if (!req.user) {
    return res.status(400).send("登入之後才可以發文ㄡ");
  }
  try {
    const { title, text, authorID } = req.body;
    const currentDate = new Date();
    let newPost = new Post({
      title,
      text,
      date: currentDate,
      authorID,
    });
    await newPost.save();
    return res.status(200).send("新貼文已保存");
  } catch (e) {
    console.log(e);
    return res.status(500).send("無法創建課程");
  }
};

const updateAPost = async (req, res) => {
  // 確認數據是否符合規範
  let { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const id = req.params.id;
    const { title, text, authorID } = req.body;

    let foundPost = await Post.findOne({ _id: id }).exec();

    if (!foundPost) {
      return res.status(404).send("Post not found");
    }

    // 發佈人才能編輯 post
    if (foundPost.authorID.equals(req.user._id)) {
      let updatedPost = await Post.findOneAndUpdate(
        { _id: id },
        { title, text },
        { new: true },
        { runValidators: true }
      );
      return res.status(200).json(updatedPost);
    } else {
      return res.status(403).send("只有發佈者才可以修改貼文");
    }
  } catch (e) {
    console.error("Error updating post:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAPost = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrentPost = await Post.findOne({ _id: id });
    if (!findCurrentPost) {
      return res.status(400).send("Post not found");
    }
    return res.status(200).send("成功刪除");
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
