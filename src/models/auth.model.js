const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["company", "student"],
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
}, {
  timestamps: true,
});

userSchema.plugin(toJSON);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * @typedef USER
 */
const User = mongoose.model("User", userSchema);

module.exports = User;

