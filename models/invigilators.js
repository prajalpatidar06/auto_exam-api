const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const InvigilatorSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  centerId: { type: String },
});

InvigilatorSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  await user.save();
  return token;
};

InvigilatorSchema.statics.findByCredentials = async function (
  username,
  password
) {
  const user = await Invigilator.findOne({ username });
  if (!user) {
    throw new Error("Unable to find user");
  }
  // const isMatch = await bcrypt.compare(password, user.password);
  const isMatch = password == user.password;
  if (!isMatch) {
    throw new Error("Incorrect Password");
  }
  return user;
};

const Invigilator = mongoose.model("Invigilator", InvigilatorSchema);
module.exports = Invigilator;
