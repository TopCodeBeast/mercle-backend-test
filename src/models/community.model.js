const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommunitySchema = new Schema(
  {
    communityId: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
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
    admins: [{ type: Schema.Types.ObjectId, required: true, ref: "user" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("community", CommunitySchema);
