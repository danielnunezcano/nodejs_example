const express = require("express");
const {
  index,
  create,
  show,
  update,
  destroy,
  find,
  multerMiddleware,
  saveImage,
} = require("./PlacesController");

let router = express.Router();

const authenticateOwner = require("../middlewares/authenticateOwner");

router
  .route("/")
  // Crear un registro
  .post(multerMiddleware(), create, saveImage)
  // Obtener todos los registros
  .get(index);

router
  .route("/:id")
  .get(find, show)
  .put(find, authenticateOwner, update)
  .delete(find, authenticateOwner, destroy);

module.exports = router;
