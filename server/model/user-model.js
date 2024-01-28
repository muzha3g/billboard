const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  googleID: String,
  thumbnail: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/026/266/484/original/default-avatar-profile-icon-social-media-user-photo-image-vector.jpg",
  },
  email: {
    type: String,
    minLength: 6,
    maxLength: 50,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 50,
  },
});

//mongoose middlewares
// 若使用者為新用戶，或是正在更改密碼，即將密碼進行雜湊處理
UserSchema.pre("save", async function (next) {
  // this 是 mongoDB 內的 document
  if (this.isNew || this.isModified("password")) {
    const hashValue = await bcrypt.hash(this.password, 12);
    this.password = hashValue;
  }
  next();
});

// instance method
UserSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

module.exports = mongoose.model("User", UserSchema);
