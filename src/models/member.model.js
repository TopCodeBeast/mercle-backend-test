const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    community: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "community",
    },
    user: {
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
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("member", MemberSchema);
