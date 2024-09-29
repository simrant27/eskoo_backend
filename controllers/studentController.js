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

// Function to get students by parentId
exports.getStudentsByParentId = async (req, res) => {
  try {
    const parentId = req.params.parentId; // Extract parentId from the URL

    // Find students where the parentID matches the one in the request
    const students = await Student.find({ parentID: parentId })
      .populate("fees") // Populate the fees field if needed
      .exec();

    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this parent." });
    }

    // Send the list of students as a response
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
