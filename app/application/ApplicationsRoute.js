const express = require("express");
let router = express.Router();
const applicationsController = require("./ApplicationsController.js");
const authenticateOwner = require("../middlewares/authenticateOwner");

const jwtMiddleware = require("express-jwt");
const secrets = require("../config/secrets");

router.route("/")
    .get(jwtMiddleware({secret: secrets.jwtSecret}),applicationsController.index)
    .post(applicationsController.create)

router.route("/:id")
    .delete(applicationsController.find,applicationsController.destroy)

module.exports = router;

