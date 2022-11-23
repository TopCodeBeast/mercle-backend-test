const express = require("express");
const router = express.Router();

// import validators
const { gatingValidation } = require("../validations");

// import controllers
const { gatingController } = require("../controllers");

// get all gatings
router.get("/", gatingController.getAll);

// create new gating
router.post("/", gatingValidation.create, gatingController.create);

// read gating by id
router.get("/:gatingId", gatingValidation.read, gatingController.read);

// update user by id
router.put("/:gatingId", gatingValidation.update, gatingController.update);

// delete gating by id
router.delete("/:gatingId", gatingValidation.remove, gatingController.delete);

module.exports = router;
