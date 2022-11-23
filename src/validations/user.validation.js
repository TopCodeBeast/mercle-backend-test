const create = (req, res, next) => {
  const { userId, userName, email, tokenAddresses } = req.body;
  if (!userId || userId.length === 0) {
    res.status(422).json({ message: "User Id is not valid." });
  }
  if (!userName || userName.length === 0) {
    res.status(422).json({ message: "User Name is not valid." });
  }
  if (!email || email.length === 0) {
    res.status(422).json({ message: "Email is not valid." });
  }
  if (!tokenAddresses || !typeof tokenAddresses === "object") {
    res.status(422).json({ message: "Token Addresses is not valid." });
  }
  next();
};

const update = (req, res, next) => {
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

module.exports = {
  create,
  update,
};
