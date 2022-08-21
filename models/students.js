const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: false },
  },
  enrollment: { type: String, required: true, unique: true },
  photoId: {
    type: String,
    required: true,
  },
  subjects: [
    {
      subjectCode:{type: String}
    },
  ],
  center: { type: mongoose.Schema.Types.ObjectId, ref: "Center" },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
