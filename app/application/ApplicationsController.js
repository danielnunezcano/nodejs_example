const buildParams = require("../utils/helpers").buildParams;

const validParams = ["origin", "name"];

const Application = require("./ApplicationModel");
const User = require("../users/UserModel");

function find(req, res, next) {
  Application.findById(req.params.id)
    .then((application) => {
      req.mainObj = application;
      req.application = application;
      next();
    })
    .catch(next);
}

function create(req, res) {
  let params = buildParams(validParams, req.body);

  Application.create(params)
    .then((application) => {
      res.json(application);
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
}

function index(req, res) {
  
}

function destroy(req, res) {
  req.application
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
