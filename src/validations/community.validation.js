const create = (req, res, next) => {
  const { communityName, displayName, admins } = req.body;
  if (!communityName || communityName.length === 0) {
    return res.status(422).json({ message: "Community Name is not valid." });
  }
  if (!displayName || displayName.length === 0) {
    return res.status(422).json({ message: "Display Name is not valid." });
  }
  next();
};

const update = (req, res, next) => {
  const updatingInfo = {};
  if (req.body.communityName && req.body.communityName.length > 0) {
    updatingInfo.communityName = req.body.communityName;
  }
  if (req.body.displayName && req.body.displayName.length > 0) {
    updatingInfo.displayName = req.body.displayName;
  }
  if (req.body.admins && typeof req.body.admins === "object") {
    updatingInfo.admins = req.body.admins;
  }
  req.body = updatingInfo;
  next();
};

module.exports = {
  create,
  update,
};
