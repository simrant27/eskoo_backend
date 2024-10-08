// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/studentPhoto");
const Student = require("../models/studentModel");
const Parent = require("../models/parentModel");

const studentService = require("../services/studentService");
const studentController = require("../controllers/studentController");

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
    res.status(200).json({ students });
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
router.get("/:classAssigned", async (req, res) => {
  try {
    const classAssigned = req.params.classAssigned; // Extract the class name from the URL
    const students = await Student.find({ classAssigned: classAssigned }); // Use the correct MongoDB query
    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this class" });
    }
    res.json({ success: true, students }); // Return the students in JSON format
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); // Handle errors
  }
});

router.get("/by-parent/:parentId", async (req, res) => {
  try {
    const parentId = req.params.parentId; // Get parent_id from route parameters

    const students = await Student.find({ parentID: parentId }); // Use the correct MongoDB query

    // Check if the parent was found
    if (!students) {
      return res
        .status(404)
        .json({ message: "no stud with this parent id not found." });
    }
    res.json({ success: true, students }); // Return the students in JSON format

    // Return the populated children (students)
    // res.status(200).json({ students: parent.children });
  } catch (error) {
    console.error("Error fetching students by parent_id:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch students by class name
router.get("/class", studentController.getStudentsByClass);

// Route to get students by parentId
router.get("/parent/:parentId", studentController.getStudentsByParentId);

module.exports = router;
