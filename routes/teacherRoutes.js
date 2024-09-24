const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadPhoto");
const teacherService = require("../services/teacherService");

// Create a new teacher
// Create a new teacher
router.post("/create", upload.single("image"), async (req, res) => {
  const teacherData = req.body;

  if (req.file) {
    teacherData.image = req.file.path; // Add the image path to teacherData
  } else {
    teacherData.image = null; // Handle case where no image is uploaded
  }

  const result = await teacherService.createTeacher(teacherData); // Call service function

  if (result.success) {
    res.status(201).json({
      message: "Teacher created successfully",
      teacher: result.teacher,
    });
  } else {
    res.status(400).json({ message: result.message });
  }
});

//get all teacher
router.get("/", async (req, res) => {
  const result = await teacherService.getAllTeachers();
  if (result.success) {
    res.status(200).json({ teachers: result.teachers });
  } else {
    res.status(400).json({ message: result.message });
  }
});

// Update teacher details
router.put("/update/:id", async (req, res) => {
  const teacherData = req.body;
  if (req.file) {
    teacherData.image = req.file.path; // Add the image path to teacherData
  }
  const result = await teacherService.updateTeacher(req.params.id, teacherData);
  if (result.success) {
    res.status(200).json({
      message: "Teacher updated successfully",
      teacher: result.teacher,
    });
  } else {
    res.status(400).json({ message: result.message });
  }
});

// Delete a teacher
router.delete("/delete/:id", async (req, res) => {
  const result = await teacherService.deleteTeacher(req.params.id);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
});

// Find teacher by ID
router.get("/find/:id", async (req, res) => {
  const result = await teacherService.findTeacherById(req.params.id);
  if (result.success) {
    res.status(200).json({ teacher: result.teacher });
  } else {
    res.status(404).json({ message: result.message });
  }
});

module.exports = router;
