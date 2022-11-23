const express = require("express");
const router = express.Router();

// import routes
const userRoute = require("./user.route");

const mainRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
];

mainRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
