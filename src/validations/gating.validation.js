const { isValidObjectId } = require("mongoose");

const create = (req, res, next) => {
  const { tokenAddress, api, communityId } = req.body;
  if (!isValidObjectId(communityId)) {
    return res.status(422).json({ message: "Community Id is not valid." });
  }
  if (!tokenAddress || tokenAddress.length === 0) {
    return res.status(422).json({ message: "Token Address is not valid." });
  }
  if (!api || api.length === 0) {
    return res.status(422).json({ message: "Api is not valid." });
  }
  next();
};

const read = (req, res, next) => {
  const { gatingId } = req.params;
  if (!isValidObjectId(gatingId)) {
    return res.status(422).json({ message: "Not valid gating id." });
  }
  next();
};

const update = (req, res, next) => {
  const { gatingId } = req.params;
  if (!isValidObjectId(gatingId)) {
    return res.status(422).json({ message: "Not valid gating id." });
  }
  if (req.body.communityId && !isValidObjectId(req.body.communityId)) {
    return res.status(422).json({ message: "Not valid community id." });
  }
  const updatingInfo = {};
  if (req.body.communityId && req.body.communityId.length > 0) {
    updatingInfo.community = req.body.communityId;
  }
  if (req.body.tokenAddress && req.body.tokenAddress.length > 0) {
    updatingInfo.tokenAddress = req.body.tokenAddress;
  }
  if (req.body.api && req.body.api.length > 0) {
    updatingInfo.api = req.body.api;
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
