const express = require("express");
const router = express.Router();

const sessionsControllers = require("../controllers/SessionsController");

router
  .route("/")
  .post(
    sessionsControllers.authenticate,
    sessionsControllers.generateToken,
    sessionsControllers.sendToken
  );

module.exports = router;
