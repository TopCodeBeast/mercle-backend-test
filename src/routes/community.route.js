const express = require("express");
const router = express.Router();

// import validators
const { communityValidation } = require("../validations");

// import controllers
const { communityController } = require("../controllers");

// create new user
router.post("/", communityValidation.create, communityController.create);

// read user by id
router.get("/:communityName", communityController.read);

// update user by name
router.put(
  "/:communityName",
  communityValidation.update,
  communityController.update
);

// delete user by name
router.delete("/:communityName", communityController.delete);

module.exports = router;
