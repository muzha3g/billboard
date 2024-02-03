const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const postRouter = require("./routes/post-route");
const authRouter = require("./routes/auth-route");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
require("./config/passport")(passport); //執行時自動套入 passport 這個套件
const { getAllPosts, getAPost } = require("./controller/index");
const path = require("path");

mongoose
  .connect(process.env.MONGODB_LINK)
  .then(console.log("connect to mongoDB..."))
  .catch((e) => console.log(e));

// render 後端佈署
const corsOptions = {
  origin: "https://billboard-five.vercel.app", // 設定允許的來源
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

// 只有登入的人可以增刪查改 post，要被 jwt 保護(request 內部的 header 要有 Authorization 的 token 才行，不然這個 request 就會被當作是 unauthorized)，會使用在 config 的 passport.js 裡的 JwtStrategy
app.use("/post", passport.authenticate("jwt", { session: false }), postRouter);

// 不用登入就可以看到各個 posts + 點進去看的細項
app.get("/", getAllPosts);
app.get("/:id", getAPost);

app.listen(4000, () => {
  console.log("on port 4000...");
});
