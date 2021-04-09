var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwtMiddleware = require("express-jwt");

const places = require("./app/places/PlacesRoute");
const users = require("./app/users/UsersRoute");
const visits = require("./app/visit/VisitsRoute");
const sessions = require("./app/sessions/SessionsRoute");
const favorites = require("./app/favorites/FavoritesRoute");
const visitPlaces = require("./app/visit/VisitPlacesRoute");
const FavoritePlace = require("./app/favorites/FavoritesRoute");
const applications = require("./app/application/ApplicationsRoute");

const db = require("./app/config/dababase");
const secrets = require("./app/config/secrets");


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
app.use("/users", users);
app.use("/sessions", sessions);
app.use("/favorites", favorites);
app.use("/visits", visits);
app.use("/applications", applications);

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
