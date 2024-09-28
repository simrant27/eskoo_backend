const express = require("express");
const router = express.Router();
const resultService = require("../services/resultService");
const Student = require("../models/studentModel"); // Adjust the path if needed

// Route to assign a grade to a student
router.post("/assign-marks/:studentId", async (req, res) => {
  try {
    console.log(req.body);
    const { teacherId, subject, marks } = req.body;
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (!teacherId || !subject || !marks) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Add marks to the student's marks array
    const message = await resultService.assignMarksToStudent(
      studentId,
      teacherId,
      subject,
      marks
    );
    res.status(200).json(message);

    // res.status(200).json({ message: "Marks assigned successfully" });
  } catch (error) {
    console.error("Error assigning marks:", error);
    res.status(500).json({ message: error.message });
  }
});

// Route to get results for a specific student
router.get("/student-results/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const results = await resultService.getStudentResults(studentId);
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching student results:", error);
    return res.status(500).json({ message: "Error fetching results" });
  }
});

// Route to get all results for a specific student (can be used by admin)
router.get("/all-results/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const results = await resultService.getAllResultsForStudent(studentId);
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching all results for student:", error);
    return res.status(500).json({ message: "Error fetching results" });
  }
});

module.exports = router;
