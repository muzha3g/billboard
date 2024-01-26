const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const {
  getAllPosts,
  updateAPost,
  addAPost,
  deleteAPost,
  getAPost,
} = require("./controller/index");

mongoose
  .connect(
    "mongodb+srv://apple2951:7SnEDwRYWNWLIxNU@cluster0.og2e2vu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("connect to mongoDB..."))
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", getAllPosts);
app.get("/:id", getAPost);
app.post("/add/", addAPost);
app.put("/updated/:id", updateAPost);
app.delete("/delete/:id", deleteAPost);

app.listen(4000, () => {
  console.log("on port 4000...");
});
