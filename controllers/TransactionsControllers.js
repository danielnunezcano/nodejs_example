const Transactions = require("../models/Transactions");
const helpers = require("./helpers");

function create(req, res) {
  const params = helpers.buildParams(validParams, req.body);
  Transactions.create(params)
    .then((doc) => {
      res.json(doc)
      next();
    })
    .catch((err) => {
      next(err);
    });
}

function index(req, res) {
  // Todos los lugares
  Transactions.paginate({}, { page: req.query.page || 1, limit: 8, sort: { _id: -1 } })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}


module.exports = {
  create,
  index,
};
