const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const postRouter = require("./routes/post-route");
const authRouter = require("./routes/auth-route");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
require("./config/passport")(passport); //執行時自動套入 passport 這個套件
const { getAllPosts, getAPost } = require("./controller/index");

mongoose
  .connect(process.env.MONGODB_LINK)
  .then(console.log("connect to mongoDB..."))
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize()); //讓 passport 開始運行他的驗證功能
app.use(passport.session()); //讓 passport 可以用上面設置的 session

app.use("/auth", authRouter);

// 只有登入的人可以增刪查改 post，要被 jwt 保護，會使用在 config 的 passport.js 裡的 JwtStrategy
app.use("/post", passport.authenticate("jwt", { session: false }), postRouter);

// 不用登入就可以看到各個 posts + 點進去看的細項
app.get("/", getAllPosts);
app.get("/:id", getAPost);

app.listen(4000, () => {
  console.log("on port 4000...");
});
