const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommunitySchema = new Schema(
  {
    communityName: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    admins: {
      type: [{ type: Schema.Types.ObjectId, required: true, ref: "user" }],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("community", CommunitySchema);
