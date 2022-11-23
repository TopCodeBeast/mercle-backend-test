const express = require("express");
const router = express.Router();

// import validators
const { userValidation } = require("../validations");

// import controllers
const { userController } = require("../controllers");

// get all users
router.get("/", userController.getAll);

// create new user
router.post("/", userValidation.create, userController.create);

// read user by id
router.get("/:userId", userValidation.read, userController.read);

// update user by id
router.put("/:userId", userValidation.update, userController.update);

// delete user by id
router.delete("/:userId", userValidation.remove, userController.delete);

module.exports = router;
