const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local");
const User = require("../model/user-model");
const bcrypt = require("bcrypt");
// ======================
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt; //把 token 的 jwt 部分拉出來

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log(jwt_payload); //有之前存入的資料，id 跟 email
      try {
        let foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
        if (foundUser) {
          return done(null, foundUser); //讓 req.user 等於 foundUser
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};

// =====================

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
      let result = bcrypt.compare(password, foundUser.password);
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
