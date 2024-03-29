const express = require("express");
let router = express.Router();
const favoritesController = require("./FavoritesController");
const authenticateOwner = require("../middlewares/authenticateOwner");

const jwtMiddleware = require("express-jwt");
const secrets = require("../config/secrets");

router.route("/")
    .get(jwtMiddleware({secret: secrets.jwtSecret}),favoritesController.index)
    .post(favoritesController.create)

router.route("/:id")
    .delete(favoritesController.find,authenticateOwner,favoritesController.destroy)

module.exports = router;

