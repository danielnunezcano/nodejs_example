const Places = require("../models/Places");

function index(req, res) {
  // Todos los lugares
  Places.paginate({}, { page: req.query.page || 1, limit: 1, sort: {'_id': -1} })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function create(req, res) {
  Places.create(req.body)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function show(req, res) {
  //Busqueda individual
  Places.findById(req.params.id)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function update(req, res) {
  //Actualizar un recurso
  Places.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

function destroy(req, res) {
  //Eliminar recurso
  Places.findByIdAndRemove(req.params.id)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};
