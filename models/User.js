const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
    },
    roles: {
      type: String,
      enum: ["Creator", "Brand", "Agency", "admin"],
      default: "Creator",
    },
    handle: { type: String, required: true, unique: true },
    links: [
      {
        url: { type: String },
        title: { type: String },
        icon: { type: String },
      },
    ],
    socialMedia: {
      instagram: { type: String },
      youtube: { type: String },
      linkedin: { type: String },
      github: { type: String },
      facebook: { type: String },
      twitter: { type: String },
    },
  },
  { timestamps: true },
  { collection: "user-data-linktree" }
);

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj._id;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
