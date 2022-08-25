const mongoose = require("mongoose");

const SheetsSchema = mongoose.Schema({
  code: { type: String, required: true, unique: true },
  marks: { type: Number, default: 0 },
  subjectCode: { type: String },
  type: { type: String, default: "main", enum: ["main", "extra"] },
  extras: [{ type: String }],
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluator" },
  testPaperSet: { type: String },
});

const Sheet = mongoose.model("Sheet", SheetsSchema);

module.exports = Sheet;
