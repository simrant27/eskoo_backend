const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  phone: { type: String, required: false },
  subjectsTaught: { type: [String], required: false }, // Array of subjects
  gradeAssigned: { type: [String], required: false }, // Array of grade/classes
  teacherID: { type: String, required: false, unique: true },

  enrolled: { type: Boolean, default: false },
  qualifications: { type: [String], required: false }, // Array of certifications
  address: { type: String, required: false },
  username: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  image: { type: String, required: false }, // Store hashed password
});

module.exports = mongoose.model("Teacher", teacherSchema);
