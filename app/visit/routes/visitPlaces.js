const express = require("express");
let router = express.Router();
const visitsController = require("../controllers/VisitsController");
const authenticateOwner = require("../../middlewares/authenticateOwner");
const placesController = require("../../places/controllers/PlacesController");

router
  .route("/:id/visits")
  .get(placesController.find, visitsController.index)
  .post(placesController.find, visitsController.create);

router
  .route("/:id/visits/:visit_id")
  .delete(visitsController.find, authenticateOwner, visitsController.destroy);

module.exports = router;
