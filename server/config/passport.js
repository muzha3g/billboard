const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local");
const User = require("../model/user-model");
const bcrypt = rrequire("bcrypt");

//user 會套 done()裡面的第二個參數，done 跟下面的 done() 無關係
passport.serializeUser((user, done) => {
  console.log("serialize 中。。。");
  done(null, user._id); //將 monogoDB 的 ._id 存到 session 裡，並將 id 簽名後，以 cookie 的形式給使用者
});

passport.deserializeUser(async (_id, done) => {
  //_id 會帶入上面 serializeUser 儲存的 user._id
  console.log(
    "deserializeUser 中。。。使用 serializeUser 儲存的 id，去找到資料庫內的資料 "
  );
  let foundUser = await User.findOne({ _id });
  done(null, foundUser); //將 req.user 的屬性設定為 foundUser
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      let foundUser = await User.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        console.log("舊用戶，無須重存資料到資料庫");
        done(null, foundUser);
      } else {
        console.log("新用戶，需要將資料存進資料庫");
        let newUser = new User({
          name: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        let savedUser = await newUser.save();
        console.log("成功創建新用戶" + savedUser.name);
        done(null, savedUser);
      }
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let foundUser = await User.findOne({ email: username });
    if (foundUser) {
      let result = await bcrypt.compare(password, foundUser.password);
      if (result) {
        done(null, foundUser);
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  })
);
