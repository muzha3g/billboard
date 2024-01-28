const express = require("express");
const postRouter = express.Router();

const { updateAPost, addAPost, deleteAPost } = require("../controller/index");

postRouter.use((req, res, next) => {
  console.log("post route 正在接收一個 request...");
  next();
});

postRouter.post("/add", addAPost);
postRouter.put("/updated/:id", updateAPost);
postRouter.delete("/delete/:id", deleteAPost);

module.exports = postRouter;
