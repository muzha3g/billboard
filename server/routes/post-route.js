const express = require("express");
const postRouter = express.Router();

const {
  getAllPosts,
  updateAPost,
  addAPost,
  deleteAPost,
  getAPost,
} = require("../controller/index");

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getAPost);
postRouter.post("/add/", addAPost);
postRouter.put("/updated/:id", updateAPost);
postRouter.delete("/delete/:id", deleteAPost);

module.exports = postRouter;
