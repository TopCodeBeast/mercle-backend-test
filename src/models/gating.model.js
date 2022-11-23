const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GatingSchema = new Schema(
  {
    community: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "community",
    },
    tokenAddress: {
      type: String,
      required: true,
    },
    api: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("gating", GatingSchema);
