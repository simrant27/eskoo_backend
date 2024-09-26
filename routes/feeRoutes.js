const express = require("express");
const router = express.Router();
const feeService = require("../services/feeSevices");

// Assign a fee to a student
router.post("/assign", async (req, res) => {
  try {
    const { studentID, feeType, amount, dueDate } = req.body;

    // Call the service to add the fee
    const result = await feeService.assignFeeToStudent({
      studentID,
      feeType,
      amount,
      dueDate,
    });

    if (result.success) {
      res.status(201).json({
        message: "Fee assigned successfully",
        fee: result.fee,
      });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error assigning fee",
      error: error.message,
    });
  }
});

module.exports = router;
