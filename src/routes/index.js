const express = require("express");
const router = express.Router();

// import routes
const userRoute = require("./user.route");
const communityRoute = require("./community.route");
const memberRoute = require("./member.route");

const mainRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/community",
    route: communityRoute,
  },
  {
    path: "/member",
    route: memberRoute,
  },
];

mainRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
