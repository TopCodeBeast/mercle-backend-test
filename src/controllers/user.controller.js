const UserModel = require("../models").User;

exports.create = async (req, res) => {
  const { userId, userName, email, tokenAddresses } = req.body;
  try {
    // check if database already contains this name
    const foundUser = await UserModel.find({ userId });

    // if no user is found, we can add this user to the database.
    if (!foundUser || foundUser.length === 0) {
      const user = new UserModel({ userId, userName, email, tokenAddresses });
      const response = await user.save();
      res.send(response);
    } else {
      res.status(409).json({ message: "User already exists!" });
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
    const { userId } = req.params;

    // attempt to retrieve user
    const foundUser = await UserModel.findOne({ userId });

    // return 404 if no user found, return user otherwise.
    if (!foundUser || foundUser.length === 0) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.send(foundUser);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.update = async (req, res) => {
  const { userId } = req.params;

  try {
    const foundUser = await UserModel.findOne({ userId });

    // if no user found
    if (!foundUser || foundUser.length === 0) {
      res.status(404).json({ message: "User not found!" });
    } else {
      await UserModel.updateOne({ userId }, { ...req.body });
      res.send({ message: `User with id ${userId} was updated successfully.` });
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
    const foundUser = await UserModel.findOne({ userId });
    if (!foundUser || foundUser.length === 0) {
      res.status(404).json({ message: "User not found!" });
    } else {
      const response = await UserModel.deleteOne({ userId });
      console.log(response);
      res.send({ message: `User with id ${userId} was deleted successfully.` });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};
