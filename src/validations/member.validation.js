const { isValidObjectId } = require("mongoose");

const create = (req, res, next) => {
  const { userId, communityId } = req.body;
  if (!isValidObjectId(userId)) {
    return res.status(422).json({ message: "User Id is not valid." });
  }
  if (!isValidObjectId(communityId)) {
    return res.status(422).json({ message: "Community Id is not valid." });
  }
  next();
};

const read = (req, res, next) => {
  const { memberId } = req.params;
  if (!isValidObjectId(memberId)) {
    return res.status(422).json({ message: "Not valid member id." });
  }
  next();
};

const remove = (req, res, next) => {
  const { memberId } = req.params;
  if (!isValidObjectId(memberId)) {
    return res.status(422).json({ message: "Not valid member id." });
  }
  next();
};

const joinAndLeave = (req, res, next) => {
  const { memberId } = req.params;
  if (!isValidObjectId(memberId)) {
    return res.status(422).json({ message: "Not valid member id." });
  }
  next();
};

module.exports = {
  create,
  read,
  remove,
  joinAndLeave,
};
