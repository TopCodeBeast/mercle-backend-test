const GatingModel = require("../models").Gating;
const CommunityModel = require("../models").Community;

exports.getAll = async (_, res) => {
  try {
    const gatings = await GatingModel.find();
    res.send(gatings);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.create = async (req, res) => {
  const { communityId, tokenAddress, api } = req.body;
  try {
    const foundCommunity = await CommunityModel.findById(communityId);
    if (!foundCommunity || foundCommunity.length === 0) {
      return res.status(404).json({
        message: `The community with id of ${communityId} does not exist.`,
      });
    }

    // check if database already contains this api
    const foundGating = await GatingModel.find({ community: communityId, api });

    // if no gating is found, we can add this gating to the database.
    if (!foundGating || foundGating.length === 0) {
      const gating = new GatingModel({
        community: communityId,
        tokenAddress,
        api,
      });
      const response = await gating.save();
      res.send(response);
    } else {
      res
        .status(409)
        .json({ message: "Gating for that community's api already exists!" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.read = async (req, res) => {
  try {
    // Best request is GET, we can get the ID from the request
    // parameters.
    const { gatingId } = req.params;

    // attempt to retrieve gating
    const foundGating = await GatingModel.findById(gatingId);

    // return 404 if no gating found, return gating otherwise.
    if (!foundGating || foundGating.length === 0) {
      res.status(404).json({ message: "Gating not found!" });
    } else {
      res.send(foundGating);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.update = async (req, res) => {
  const { gatingId } = req.params;
  try {
    if (req.body.community) {
      const foundCommunity = await CommunityModel.findById(req.body.community);
      if (!foundCommunity || foundCommunity.length === 0) {
        return res.status(404).json({
          message: `The community with id of ${req.body.community} does not exist.`,
        });
      }
    }
    const foundGating = await GatingModel.findById(gatingId);

    // if no gating found
    if (!foundGating || foundGating.length === 0) {
      res.status(404).json({ message: "Gating not found!" });
    } else {
      if (Object.keys(req.body).length === 0) {
        return res.send({
          message: `Gating with id ${gatingId} was updated successfully.`,
        });
      }
      if (Object.keys(req.body).length === 1 && req.body.tokenAddress) {
        await GatingModel.findByIdAndUpdate(gatingId, {
          tokenAddress: req.body.tokenAddress,
        });
        return res.send({
          message: `Gating with id ${gatingId} was updated successfully.`,
        });
      }
      const checkingInfo = Object.assign(
        {},
        {
          community: foundGating.community,
          api: foundGating.api,
          ...req.body,
        }
      );
      delete checkingInfo.tokenAddress;

      const checkGating = await GatingModel.find({
        ...checkingInfo,
      });
      if (checkGating[0]?._id?.toString() === gatingId) {
        await GatingModel.findByIdAndUpdate(gatingId, { ...req.body });
        return res.send({
          message: `Gating with id ${gatingId} was updated successfully.`,
        });
      }
      if (!checkGating || checkGating.length === 0) {
        await GatingModel.findByIdAndUpdate(gatingId, { ...req.body });
        res.send({
          message: `Gating with id ${gatingId} was updated successfully.`,
        });
      } else {
        res.status(409).json({ message: "That updated info will be conflit." });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.delete = async (req, res) => {
  const { userId } = req.params;

  try {
    const foundGating = await GatingModel.findById(userId);
    if (!foundGating || foundGating.length === 0) {
      res.status(404).json({ message: "User not found!" });
    } else {
      const response = await GatingModel.findByIdAndDelete(userId);
      console.log(response);
      res.send({ message: `User with id ${userId} was deleted successfully.` });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
