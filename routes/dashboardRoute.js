const express = require("express");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

// Protected route for parent dashboard
router.get("/parent-dashboard", authenticate, (req, res) => {
  if (req.user.role !== "parent") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.status(200).send("Welcome to the Parent Dashboard");
});

// Protected route for teacher dashboard
router.get("/teacher-dashboard", authenticate, (req, res) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.status(200).send("Welcome to the Teacher Dashboard");
});

module.exports = router;
