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
  subjectCodes: [
    {
      type: String,
    },
  ],
  attendance: [{ type: String }],
  center: { type:String  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
