// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadPhoto");
const studentService = require("../services/studentService");

// Create a new student
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const studentData = req.body;

    // Add the image path to studentData if available
    if (req.file) {
      studentData.image = req.file.path;
    }

    const result = await studentService.createStudent(studentData);
    if (result.success) {
      res.status(201).json({
        message: "Student created successfully",
        student: result.student,
      });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating student", error: error.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching students", error: error.message });
  }
});

// Find a student by ID
router.get("/find/:id", async (req, res) => {
  try {
    const result = await studentService.findStudentById(req.params.id);
    if (result.success) {
      res.status(200).json({ student: result.student });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching student", error: error.message });
  }
});

// Update a student
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const studentData = req.body;

    if (req.file) {
      studentData.image = req.file.path;
    }

    const result = await studentService.updateStudent(
      req.params.id,
      studentData
    );
    if (result.success) {
      res.status(200).json({ student: result.student });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating student", error: error.message });
  }
});

// Delete a student
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);
    if (result.success) {
      res
        .status(200)
        .json({ message: "Student deleted", student: result.student });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting student", error: error.message });
  }
});

module.exports = router;
