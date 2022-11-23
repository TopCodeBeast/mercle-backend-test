const MemberModel = require("../models").Member;
const UserModel = require("../models").User;
const CommunityModel = require("../models").Community;

exports.getAll = async (_, res) => {
  try {
    const members = await MemberModel.find().populate(["user", "community"]);
    res.send(members);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.create = async (req, res) => {
  const { userId, communityId } = req.body;
  try {
    // check if user and community do exist?
    const foundUser = await UserModel.findById(userId);
    if (!foundUser || foundUser.length === 0) {
      return res
        .status(404)
        .json({ message: `The user with id of ${userId} does not exist.` });
    }
    const foundCommunity = await CommunityModel.findById(communityId);
    if (!foundCommunity || foundCommunity.length === 0) {
      return res.status(404).json({
        message: `The community with id of ${communityId} does not exist.`,
      });
    }

    const foundMember = await MemberModel.find({
      user: userId,
      community: communityId,
    });

    // if no member is found, we can add this member to the database.
    if (!foundMember || foundMember.length === 0) {
      const member = new MemberModel({
        user: userId,
        community: communityId,
        joinDate: Date.now(),
        leaveDate: null,
      });
      const response = await member.save();
      res.send(response);
    } else {
      res.status(409).json({ message: "Member already exists!" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.read = async (req, res) => {
  try {
    const { memberId } = req.params;

    // attempt to retrieve member
    const foundMember = await MemberModel.findById(memberId);

    // return 404 if no member found, return member otherwise.
    if (!foundMember) {
      res.status(404).json({ message: "Member not found!" });
    } else {
      res.send(foundMember);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.delete = async (req, res) => {
  const { memberId } = req.params;

  try {
    const foundMember = await MemberModel.findById(memberId);
    if (!foundMember) {
      res.status(404).json({ message: "Member not found!" });
    } else {
      await MemberModel.findByIdAndDelete(memberId);
      res.send({
        message: `Member with id ${memberId} was deleted successfully.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.join = async (req, res) => {
  const { memberId } = req.params;

  try {
    const foundMember = await MemberModel.findById(memberId);
    if (!foundMember) {
      res.status(404).json({ message: "Member not found!" });
    } else {
      await MemberModel.findByIdAndUpdate(memberId, {
        joinDate: Date.now(),
        leaveDate: null,
      });
      res.send({
        message: `Member with id ${memberId} joined successfully.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.leave = async (req, res) => {
  const { memberId } = req.params;

  try {
    const foundMember = await MemberModel.findById(memberId);
    if (!foundMember) {
      res.status(404).json({ message: "Member not found!" });
    } else {
      await MemberModel.findByIdAndUpdate(memberId, { leaveDate: Date.now() });
      res.send({
        message: `Member with id ${memberId} left successfully.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
