const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");

let userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  admin: {
    type: Boolean,
    default: false,
  },
});

userShema.plugin(mongooseBcrypt);

const User = mongoose.model("User", userShema);

module.exports = User;
