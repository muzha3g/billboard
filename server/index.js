const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
const postRouter = require("./routes/post-route");
const authRouter = require("./routes/auth-route");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
require("./config/passport");
const passport = require("passport");

mongoose
  .connect(
    "mongodb+srv://apple2951:7SnEDwRYWNWLIxNU@cluster0.og2e2vu.mongodb.net/?retryWrites=true&w=majority"
  )
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

app.use("/", postRouter);
app.use("/auth", authRouter);

app.listen(4000, () => {
  console.log("on port 4000...");
});
