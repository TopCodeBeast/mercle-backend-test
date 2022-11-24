const express = require("express");
const router = express.Router();

// import validators
const { communityValidation } = require("../validations");

// import controllers
const { communityController } = require("../controllers");

// import middlewares
const { communityTokenGatedMiddleware } = require("../middlewares");

// get all communities
router.get(
  "/",
  (req, res, next) => {
    console.log(req.path, req.route, req.url);
    next();
  },
  communityController.getAll
);

// create new community
router.post("/", communityValidation.create, communityController.create);

// read community by name
router.get("/:communityName", communityController.read);

// update community by name
router.put(
  "/:communityName",
  communityValidation.update,
  communityController.update
);

// delete community by name
router.delete("/:communityName", communityController.delete);

// get community members by community name
router.get(
  "/:communityName/members",
  communityTokenGatedMiddleware,
  communityController.getMembers
);

module.exports = router;
