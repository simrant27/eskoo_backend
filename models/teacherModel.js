const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  subjectsTaught: { type: [String], required: true }, // Array of subjects
  gradeAssigned: { type: [String], required: true }, // Array of grade/classes
  teacherID: { type: String, required: true, unique: true },
  enrolled: { type: Boolean, default: true },
  qualifications: { type: [String], required: true }, // Array of certifications
  address: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false }, // Store hashed password
});

module.exports = mongoose.model("Teacher", teacherSchema);
