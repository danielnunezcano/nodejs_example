var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwtMiddleware = require("express-jwt");

const Transaction = require("./app/transactions/models/Transaction");

const places = require("./app/places/routes/places");
const transactions = require("./app/transactions/routes/transactions");
const users = require("./app/users/routes/users");
const sessions = require("./app/sessions/routes/sessions");
const favorites = require("./app/favorites/routes/favorites");
const visits = require("./app/visit/routes/visits");
const visitPlaces = require("./app/visit/routes/visitPlaces");

const db = require("./app/config/dababase");
const secrets = require("./app/config/secrets");
const FavoritePlace = require("./app/favorites/models/FavoritePlace");

db.connect();
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app
  .use(jwtMiddleware({ secret: secrets.jwtSecret })
  .unless({ path: ["/sessions"]}));

app.use("/places", places);
app.use("/places", visitPlaces);
app.use("/transactions", transactions);
app.use("/users", users);
app.use("/sessions", sessions);
app.use("/favorites", favorites);
app.use("/visits", visits);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
