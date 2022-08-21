const Invigilator = require("../models/invigilators");
const Student = require("../models/students");
const Sheet = require("../models/sheets");

module.exports.login_invigilator = async (req, res) => {
  try {
    const user = await Invigilator.findByCredentials(
      req.body.username,
      req.body.password
    );
    if (user) {
      const token = await user.generateAuthToken();
      return res.send({
        success: true,
        message: "User Sign In Successfully",
        token,
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

module.exports.verifyAdmitCard = async (req, res) => {
  try {
    const id = req.body.id;
    const student = await Student.findById(id).populate({ path: "center" });
    if (student) {
      res.send({ success: true, student });
    } else {
      res.status(400).send({ success: false, error: "invalid id params" });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports.assignMainSheet = async (req, res) => {
  try {
    const id = req.body.id;
    const student = req.body.student;
    const sheet = new Sheet({
      code: id,
      student: student,
    });
    await sheet.save();
    res.send({ success: true, message: "sheet successfully asign" });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports.assignExtraSheet = async (req, res) => {
  try {
    const id = req.body.id;
    const student = req.body.student;
    const main_id = req.body.main_id;
    const mainSheet = await Sheet.findById({ code: main_id });
    if (mainSheet) {
      mainSheet.extras = [...id];
      await mainSheet.save();
      const sheet = new Sheet({
        code: id,
        type: "extra",
        student: student,
      });
      await sheet.save();
      res.send({ success: true, message: " extra sheet successfully asign" });
    } else {
      res.status(400).send({ success: false, error: "invalid main sheet id" });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
