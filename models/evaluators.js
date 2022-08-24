const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EvaluatorSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  evcode: { type: String, unique: true },
  sheetschecked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sheet" }],
});

EvaluatorSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  await user.save();
  return token;
};

EvaluatorSchema.statics.findByCredentials = async function (
  username,
  password
) {
  const user = await Evaluator.findOne({ username });
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
const Evaluator = mongoose.model("Evaluator", EvaluatorSchema);
module.exports = Evaluator;
