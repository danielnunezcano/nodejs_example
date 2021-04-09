const buildParams = require("../utils/helpers").buildParams;

const validParams = ["_place", "reaction", "observation"];

const Visit = require("./VisitModel");
const User = require("../users/UserModel");

function find(req, res, next) {
  Visit.findById(req.params.visit_id)
    .then((visit) => {
      req.mainObj = visit;
      req.favorite = visit;
      next();
    })
    .catch(next);
}

function create(req, res) {
  let params = buildParams(validParams, req.body);
  params["_user"] = req.user.id;

  Visit.create(params)
    .then((visit) => {
      res.json(visit);
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
}

function index(req, res) {
  let promise = null;

  if (req.place) {
    promise = req.place.visits;
  } else if (req.user) {
    promise = Visit.forUser(req.user.id, req.query.page || 1);
  }

  if (promise) {
    promise
      .then((visits) => {
        res.json(visits);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    res.status(404).json({});
  }
}

function destroy(req, res) {
  req.visit
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
