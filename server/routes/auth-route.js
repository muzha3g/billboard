const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../model/user-model");

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
  let { name, email, password } = req.body;

  const foundEmail = await Usre.findOne({ email }).exec();

  if (foundEmail) {
    return res.redirect("/auth/signup");
  }

  let hashpassword = await new bcrypt.hash(password, 12);
  let newUser = new User({ name, email, password: hashpassword });
  await newUser.save();
  return res.redirect("/login");
});

authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "auth/login",
  }),
  (req, res) => {
    return res.redirect("/");
  }
);

module.exports = authRouter;
