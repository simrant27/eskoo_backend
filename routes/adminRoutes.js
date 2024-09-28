const express = require("express");
const router = express.Router();
const adminService = require("../services/adminService.js");

// Create a new admin
router.post("/create", async (req, res) => {
  try {
    const adminData = req.body; // Assuming data is sent in the body
    const result = await adminService.createAdmin(adminData);
    if (result.success) {
      res.status(201).json({
        message: "admin created successfully",
        admin: result.admin,
      });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating admin", error: error.message });
  }
});

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching admins", error: error.message });
  }
});
module.exports = router;
