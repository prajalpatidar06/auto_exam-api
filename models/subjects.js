const mongoose = require("mongoose");

const examSubjectsSchema = mongoose.Schema({
  code: { type: String },
  name: { type: String },
  marks: { typs: Number },
  date: { type: Date },
  durationInMinutes: { type: Number },
  
});

const Subject = mongoose.model("Subject", examSubjectsSchema);

module.exports = Subject;
