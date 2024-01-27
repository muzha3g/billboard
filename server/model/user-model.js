const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  googleID: String,
  thumbnail: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/026/266/484/original/default-avatar-profile-icon-social-media-user-photo-image-vector.jpg",
  },
  email: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
