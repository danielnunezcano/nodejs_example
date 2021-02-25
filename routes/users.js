const express = require("express");
const router = express.Router();

const usersController = require("../controllers/UsersController");

const sessionsControllers = require("../controllers/SessionsController");

router
  .route("/")
  .post(
    usersController.create,
    sessionsControllers.generateToken,
    sessionsControllers.sendToken
  );

module.exports = router;
