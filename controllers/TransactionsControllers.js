const Transaction = require("../models/Transaction");
const helpers = require("./helpers");

const validParams = [
  "fecha",
  "prevision",
  "importe",
  "descripcion",
  "partida",
  "cuenta",
  "categoria"
];

function create(req, res) {
  const params = helpers.buildParams(validParams, req.body);
  console.log(req.body)
  console.log(params)
  Transaction.create(params)
    .then((doc) => {
      res.json(doc)
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function index(req, res) {
  // Todos los lugares
  Transaction.paginate({}, { page: req.query.page || 1, limit: 8, sort: { _id: -1 } })
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
