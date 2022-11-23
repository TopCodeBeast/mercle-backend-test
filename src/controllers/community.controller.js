const CommunityModel = require("../models").Community;

exports.create = async (req, res) => {
  const { communityName, displayName, admins } = req.body;
  try {
    // check if database already contains this name
    const foundCommunity = await CommunityModel.find({ communityName });

    // if no community is found, we can add this community to the database.
    if (!foundCommunity || foundCommunity.length === 0) {
      const community = new CommunityModel({
        communityName,
        displayName,
        admins,
      });
      const response = await community.save();
      res.send(response);
    } else {
      res.status(409).json({ message: "Community already exists!" });
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
    const { communityName } = req.params;

    // attempt to retrieve community
    const foundCommunity = await CommunityModel.findOne({ communityName });

    // return 404 if no community found, return community otherwise.
    if (!foundCommunity || foundCommunity.length === 0) {
      res.status(404).json({ message: "Community not found!" });
    } else {
      res.send(foundCommunity);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.update = async (req, res) => {
  const { communityName } = req.params;

  try {
    const foundCommunity = await CommunityModel.findOne({ communityName });

    // if no community found
    if (!foundCommunity || foundCommunity.length === 0) {
      res.status(404).json({ message: "Community not found!" });
    } else {
      await CommunityModel.updateOne({ communityName }, { ...req.body });
      res.send({
        message: `Community with name ${communityName} was updated successfully.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.delete = async (req, res) => {
  const { communityName } = req.params;

  try {
    const foundCommunity = await CommunityModel.findOne({ communityName });
    if (!foundCommunity || foundCommunity.length === 0) {
      res.status(404).json({ message: "Community not found!" });
    } else {
      const response = await CommunityModel.deleteOne({ communityName });
      console.log(response);
      res.send({
        message: `Community with name ${communityName} was deleted successfully.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
