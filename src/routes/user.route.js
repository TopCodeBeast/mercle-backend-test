const express = require("express");
const router = express.Router();

// import validators
const { userValidation } = require("../validations");

// import controllers
const { userController } = require("../controllers");

// create new user
router.post("/", userValidation.create, userController.create);

// read user by id
router.get("/:userId", userController.read);

// update user by id
router.put("/:userId", userValidation.update, userController.update);

// delete user by id
router.delete("/:userId", userController.delete);

module.exports = router;
