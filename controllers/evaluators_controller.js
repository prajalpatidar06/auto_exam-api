const Evaluator = require("../models/evaluators");
const Sheet = require("../models/sheets");
const Student = require("../models/students");

module.exports.login_evaluator = async (req, res) => {
  try {
    const user = await Evaluator.findByCredentials(
      req.body.username,
      req.body.password
    );
    if (user) {
      const token = await user.generateAuthToken();
      return res.send({
        success: true,
        message: "User Sign In Successfully",
        username: req.body.username,
        token,
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

module.exports.assign_marks = async (req, res) => {
  try {
    const marks = req.body.marks;
    const code = req.body.code;
    const sheet = await Sheet.findOne({ code });
    if (sheet) {
      if (typeof marks == "number") {
        sheet.marks = marks;
        sheet.evaluator = req.user._id;
        await sheet.save();
        res.send({ success: true, message: "marks allotted successfully" });
      } else {
        res
          .status(400)
          .send({ success: false, error: "Invalid Marks Allotted to Sheet" });
      }
    } else {
      res.status(400).send({ success: false, error: "Invalid Sheet Id" });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports.checked_sheets = async (req, res) => {
  try {
    const students = await Sheet.find({ evaluator: req.user._id }).populate(
      "student"
    );
    res.send({ success: true, students });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
