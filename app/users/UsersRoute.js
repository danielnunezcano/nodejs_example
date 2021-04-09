const express = require("express");
const router = express.Router();

const usersController = require("./UsersController");

const sessionsControllers = require("../sessions/SessionsController");

router
  .route("/")
  .post(
    usersController.create,
    sessionsControllers.generateToken,
    sessionsControllers.sendToken
  )
  .get(usersController.myPlaces);
 
module.exports = router;
 