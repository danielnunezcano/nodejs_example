const express = require("express");
const {
  create,
  index,
} = require("../controllers/TransactionsControllers");

let router = express.Router();

router
  .route("/")
  // Crear un registro
  .post(create)
  // Obtener todos los registros
  .get(index);


module.exports = router;
