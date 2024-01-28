const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../model/user-model");
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");

// google auth
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    return res.redirect("/");
  }
);

// local auth
authRouter.post("/signup", async (req, res) => {
  // 確認數據是否符合規範
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否被註冊過
  let { name, email, password } = req.body;
  const foundEmail = await User.findOne({ email }).exec();
  if (foundEmail) {
    return res.status(400).send("此信箱已被註冊");
  }

  // 製作新用戶
  let newUser = new User({ name, email, password });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "成功儲存使用者",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存使用者");
  }
});

authRouter.post("/login", async (req, res) => {
  // 確認數據是否符合規範
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否被註冊過
  let { email, password } = req.body;
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).send("這個信箱沒有被註冊過ㄛ");
  }

  // 確認密碼是否正確
  foundUser.comparePassword(password, (err, isMatch) => {
    if (err) return res.status(500).send(err);

    if (isMatch) {
      // 製作 jwt
      const tokenObject = {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
      };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "成功登入！",
        token: "JWT " + token, //JWT 後面要加一個空格，不然會錯
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤 T-T");
    }
  });
});

module.exports = authRouter;
