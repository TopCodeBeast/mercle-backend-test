const { isValidObjectId } = require("mongoose");

// import models
const UserModel = require("../models").User;
const CommunityModel = require("../models").Community;
const GatingModel = require("../models").Gating;

const communityTokenGatedMiddleware = async (req, res, next) => {
  const path = req.route?.path;
  const userId = req.header("userId");
  const communityName = req.params?.communityName;
  if (
    !(path != undefined && userId != undefined && communityName != undefined)
  ) {
    return res.status(404).json({ message: "Not found that url." });
  }
  if (!isValidObjectId(userId)) {
    return res.status(404).json({ message: "Not found that url." });
  }
  const foundCommunity = await CommunityModel.findOne({ communityName });
  if (!foundCommunity) {
    return res.status(422).json({ message: "Invalid community name." });
  }
  const foundUser = await UserModel.findById(userId);
  if (!foundUser) {
    return res.status(422).json({ message: "Invalid user id." });
  }

  const foundGating = await GatingModel.findOne({
    community: foundCommunity.id,
    api: path,
  });
  if (foundGating) {
    const { tokenAddress } = foundGating;
    if (foundUser.tokenAddresses.includes(tokenAddress)) {
      next();
    } else {
      return res.status(404).json({ message: "Not found that url" });
    }
  } else {
    next();
  }
};

module.exports = communityTokenGatedMiddleware;
