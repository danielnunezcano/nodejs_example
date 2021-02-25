const express = require("express");
const {
  index,
  create,
  show,
  update,
  destroy,
  find,
  multerMiddleware,
  saveImage
} = require("../controllers/PlacesController");

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
