const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");

const Place = require("../places/PlaceModel");
const FavoritePlace = require("../favorites/FavoritePlaceModel");

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

userShema.post("save", function (user, next) {
  User.count({}).then((count) => {
    if (count == 1) {
      User.updateOne({ _id: user._id }, { admin: true }).then((result) => {
        next();
      });
    } else {
      next();
    }
  });
});

userShema.virtual("places").get(function () {
  return Place.find({ _user: this._id });
});

userShema.virtual("favorites").get(function () {
  return FavoritePlace.find({ _user: this._id }, { _place: true }).then((favs) => {
    let placeIds = favs.map(fav => fav._place);
    return Place.find({"_id": {$in: placeIds}});
  });
});

userShema.plugin(mongooseBcrypt);

const User = mongoose.model("User", userShema);

module.exports = User;
