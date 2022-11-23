const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    communityId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "community",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    joinDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    leaveDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("member", MemberSchema);
