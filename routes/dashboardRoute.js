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

// Protected route for admin dashboard
// router.get("/admin-dashboard", (req, res) => {
//   // Logic to render or return admin dashboard data
//   res.json({ message: "Welcome to the Admin Dashboard!" });
// });
router.get("/admin-dashboard", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.status(200).send("Welcome to the Admin Dashboard");
});

module.exports = router;
