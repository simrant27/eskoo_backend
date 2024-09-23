const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadPhoto");
const studentService = require("../services/studentService");

// Create a new student
router.post("/create", upload.single("image"), async (req, res) => {
  console.log("Base URL:", req.baseUrl);
  try {
    const studentData = req.body;

    // Add the image path to studentData if available
    if (req.file) {
      studentData.image = req.file.path; // Correctly add the image path to studentData
    } else {
      studentData.image = null; // Handle case where no image is uploaded
    }

    // Call the service function to create a new student
    const student = await studentService.createStudent(studentData);
    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating student", error: error.message });
  }
});

//get all students
router.get("/", async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: "Error fetching students", error });
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const result = await studentService.findStudentByid(req.params.id);
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
//update
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const studentData = req.body;

    // Add the image path to studentData if a file is uploaded
    if (req.file) {
      studentData.image = req.file.path;
    }

    // Call the update service
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

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);
    if (result.success) {
      res
        .status(200)
        .json({ message: "student deleted", student: result.student });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching student", error: error.message });
  }
});

module.exports = router;
