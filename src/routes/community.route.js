const express = require("express");
const router = express.Router();

// import validators
const { communityValidation } = require("../validations");

// import controllers
const { communityController } = require("../controllers");

// get all communities
router.get("/", communityController.getAll);

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

module.exports = router;
