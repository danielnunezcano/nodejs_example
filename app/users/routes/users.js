const express = require("express");
const router = express.Router();

const usersController = require("../controllers/UsersController");

const sessionsControllers = require("../../sessions/controllers/SessionsController");

router
  .route("/")
  .post(
    usersController.create,
    sessionsControllers.generateToken,
    sessionsControllers.sendToken
  )
  .get(usersController.myPlaces);
 
module.exports = router;
 