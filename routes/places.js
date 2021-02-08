const express = require("express");
const Places = require("../models/Places");
const {
  index,
  create,
  show,
  update,
  destroy,
} = require("../controllers/PlacesControllers");

let router = express.Router();

router
  .route("/")
  // Crear un registro
  .post(create)
  // Obtener todos los registros
  .get(index);

router
  .route("/:id")
  .get(show)
  .put(update)
  .delete(destroy);

module.exports = router;
