const express = require("express");
const router = express.Router();

const sessionsControllers = require("./SessionsController");

router
  .route("/")
  .post(
    sessionsControllers.authenticate,
    sessionsControllers.generateToken,
    sessionsControllers.sendToken
  );

module.exports = router;
