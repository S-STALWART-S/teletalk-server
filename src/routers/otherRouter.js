const { Router } = require("express");

const {
  countriesOtherController,
} = require("@/controllers/otherControllers/countriesOtherController");
const {
  welcomeOtherController,
} = require("@/controllers/otherControllers/welcomeOtherController");

const {
  otherRoutes: { countriesRoute, welcomeRoute },
} = require("@/variables/routes/otherRoutes");

const otherRouter = Router();

otherRouter[welcomeRoute.method](welcomeRoute.url, welcomeOtherController);

otherRouter[countriesRoute.method](
  countriesRoute.url,
  countriesOtherController
);

module.exports = { otherRouter };
