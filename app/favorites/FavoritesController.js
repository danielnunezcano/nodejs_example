const buildParams = require("../utils/helpers").buildParams;

const validParams = ["_place"];

const FavoritePlace = require("./FavoritePlaceModel");
const User = require("../users/UserModel");

function find(req, res, next) {
  FavoritePlace.findById(req.params.id)
    .then((fav) => {
      req.mainObj = fav;
      req.favorite = fav;
      next();
    })
    .catch(next);
}

function create(req, res) {
  let params = buildParams(validParams, req.body);
  params["_user"] = req.user.id;

  FavoritePlace.create(params)
    .then((favorite) => {
      res.json(favorite);
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
}

function index(req, res) {
  User.findOne({ _id: req.user.id })
    .then((user) => {
      user.favorites.then((places) => {
        res.json(places);
      });
    })
    .catch((err) => {
      res.json(err);
    });
}

function destroy(req, res) {
  req.favorite
    .remove()
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

module.exports = {
  create,
  index,
  find,
  destroy,
};
