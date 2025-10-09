import mongoose, { Schema } from "mongoose";

const followersSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    profile: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", followersSchema);
