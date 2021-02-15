const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const uploader = require("./Uploader");
const slugify = require("../plugins/slugify");

let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  description: String,
  acceptsCreditCard: {
    type: Boolean,
    default: false,
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number,
});

placeSchema.methods.updateImage = function (path, imageType) {
  return uploader(path).then((secure_url) =>
    this.saveImageUrl(secure_url, imageType)
  );
};

placeSchema.methods.saveImageUrl = function (secureUrl, imageType) {
  this[imageType + "Image"] = secureUrl;
  return this.save();
};

placeSchema.pre("save", function (next) {
  this.slug = slugify(this.title)
  console.log(Place.countDocuments({ slug: this.slug }));
  next();
  //generateSlugAndContinue.call(this, 0, next);
});

placeSchema.statics.validateSlugCount = function (slug) {
  return Place.countDocuments({ slug: slug }).then((count) => {
    if (count > 0) return false;
    return true;
  });
};

placeSchema.plugin(mongoosePaginate);

function generateSlugAndContinue(count, next) {
  count != 0
    ? (this.slug = slugify(this.title) + "-" + count)
    : (this.slug = slugify(this.title));

  Place.validateSlugCount(this.slug).then((isValid) => {
    if (!isValid) return generateSlugAndContinue.call(this, count + 1, next);
  });
  next();
}

let Place = mongoose.model("Place", placeSchema);

module.exports = Place;
