const express = require("express");
const router = express.Router();

// import validators
const { memberValidation } = require("../validations");

// import controllers
const { memberController } = require("../controllers");

// get all members
router.get("/", memberController.getAll);

// create new member
router.post("/", memberValidation.create, memberController.create);

// read member by id
router.get("/:memberId", memberValidation.read, memberController.read);

// delete member by id
router.delete("/:memberId", memberValidation.remove, memberController.delete);

// read member by id
router.get(
  "/join/:memberId",
  memberValidation.joinAndLeave,
  memberController.join
);

// read member by id
router.get(
  "/leave/:memberId",
  memberValidation.joinAndLeave,
  memberController.leave
);

module.exports = router;
