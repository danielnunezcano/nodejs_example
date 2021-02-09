const express = require("express");
const Places = require("../models/Places");
const {
  index,
  create,
  show,
  update,
  destroy,
  find,
  multerMiddleware,
  saveImage
} = require("../controllers/PlacesControllers");

let router = express.Router();

router
  .route("/")
  // Crear un registro
  .post(multerMiddleware(),create,saveImage)
  // Obtener todos los registros
  .get(index);

router
  .route("/:id")
  .get(find,show)
  .put(find,update)
  .delete(find,destroy);

module.exports = router;
