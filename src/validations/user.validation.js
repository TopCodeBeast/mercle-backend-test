const { isValidObjectId } = require("mongoose");

const create = (req, res, next) => {
  const { userName, email, tokenAddresses } = req.body;
  if (!userName || userName.length === 0) {
    return res.status(422).json({ message: "User Name is not valid." });
  }
  if (!email || email.length === 0) {
    return res.status(422).json({ message: "Email is not valid." });
  }
  if (!tokenAddresses || !typeof tokenAddresses === "object") {
    return res.status(422).json({ message: "Token Addresses is not valid." });
  }
  next();
};

const read = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    return res.status(422).json({ message: "Not valid user id." });
  }
  next();
};

const update = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    return res.status(422).json({ message: "Not valid user id." });
  }
  const updatingInfo = {};
  if (req.body.userName && req.body.userName.length > 0) {
    updatingInfo.userName = req.body.userName;
  }
  if (req.body.email && req.body.email.length > 0) {
    updatingInfo.email = req.body.email;
  }
  if (req.body.tokenAddresses && typeof req.body.tokenAddresses === "object") {
    updatingInfo.tokenAddresses = req.body.tokenAddresses;
  }
  req.body = updatingInfo;
  next();
};

const remove = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    return res.status(422).json({ message: "Not valid user id." });
  }
  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
};
