const mongoose = require("mongoose");

const SheetsSchema = mongoose.Schema({
  code: { type: String, required: true, unique: true },
  marks: { type: Number, default: 0 },
  type: { type: String, default: "main", enum: ["main", "extra"] },
  extras: [{ type: String, unique: true }],
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

const Sheet = mongoose.model("Sheet", SheetsSchema);

module.exports = Sheet;
