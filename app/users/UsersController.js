const User = require("./UserModel");
const buildParams = require("../utils/helpers").buildParams;

const Place = require("../places/PlaceModel")

const validParams = ["email", "name", "password"];

function create(req, res, next) {
  let params = buildParams(validParams, req.body);
  User.create(params)
    .then((user) => {
      req.user = user;
      next();
      //res.json(user)
    })
    .catch((err) => {
      console.log(error);
      res.status(422).json({ error });
    });
}

function myPlaces(req, res) {
  User.findOne({ _id: req.user.id })
    .then((user) => {
      console.log(user)
      user.places.then((places) => {
        res.json(places);
      });
    })
    .catch((err) => {
      res.json(err);
    });
}

module.exports = { create, myPlaces };
