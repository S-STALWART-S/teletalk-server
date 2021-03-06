const { Router } = require("express");

const {
  getAllUsersTestController,
} = require("@/controllers/testControllers/getAllUsersTestController");

const {
  testRoutes: { getAllUsersRoute },
} = require("@/variables/routes/testRoutes");

const testRouter = Router();

testRouter[getAllUsersRoute.method](
  getAllUsersRoute.url,
  getAllUsersTestController
);

module.exports = { testRouter };
