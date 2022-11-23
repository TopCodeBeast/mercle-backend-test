const express = require("express");
const router = express.Router();

// import routes
const userRoute = require("./user.route");
const communityRoute = require("./community.route");

const mainRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/communities",
    route: communityRoute,
  },
];

mainRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
