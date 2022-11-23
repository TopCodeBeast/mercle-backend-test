const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GatingSchema = new Schema(
  {
    communityId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "community",
    },
    tokenAddress: {
      type: String,
      required: true,
    },
    apis: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("gating", GatingSchema);
