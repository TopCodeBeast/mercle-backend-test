const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tokenAddresses: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
