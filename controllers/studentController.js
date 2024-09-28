// controllers/studentController.js
const Student = require("../models/studentModel");

exports.getStudentsByClass = async (req, res) => {
  const className = req.query.class;

  try {
    // Find students by classAssigned and populate the parent details
    const students = await Student.find({ classAssigned: className }).populate(
      "parentID"
    );

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students" });
  }
};
