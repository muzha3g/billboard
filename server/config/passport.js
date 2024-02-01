let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt; //把 token 的 jwt 部分拉出來
const User = require("../model/user-model");

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      // console.log(jwt_payload)-->有之前在 auth-route 裡存入的 tokenObject 資料(？)，id 跟 email
      /*
      {
  id: '65b652a716b80fbc6a20b63c',
  email: 'apple2951@gmail.com',  
  name: 'senji',
  iat: 1706530602
}
      */
      try {
        let foundUser = await User.findOne({ _id: jwt_payload.id }).exec();
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
