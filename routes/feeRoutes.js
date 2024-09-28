const express = require("express");

const router = express.Router();
const feeService = require("../services/feeSevices");
const Student = require("../models/studentModel");

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
// Get fees for a specific student
router.get("/student/:studentId", async (req, res) => {
  try {
    const result = await feeService.getFeesByStudentId(req.params.studentId);
    if (result.success) {
      res.status(200).json({ fees: result.fees });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching fees", error: error.message });
  }
});

// Update a fee
router.put("/update/:id", async (req, res) => {
  try {
    const feeData = req.body;
    const result = await feeService.updateFee(req.params.id, feeData);
    if (result.success) {
      res.status(200).json({ fee: result.fee });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating fee", error: error.message });
  }
});
// Delete a fee
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await feeService.deleteFee(req.params.id);
    if (result.success) {
      res
        .status(200)
        .json({ message: "Fee deleted successfully", fee: result.fee });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting fee", error: error.message });
  }
});

// Update assigned fee for a student
router.put("/update/:studentID/:feeType", async (req, res) => {
  const { studentID, feeType } = req.params;
  const { amount, dueDate } = req.body;

  try {
    const updatedFee = await Fee.findOneAndUpdate(
      { studentID, feeType },
      { $set: { amount, dueDate } },
      { new: true }
    );

    if (!updatedFee) {
      return res.status(404).send("Fee not found");
    }

    res.status(200).json(updatedFee);
  } catch (err) {
    res.status(500).send("Error updating fee");
  }
});

// Delete assigned fee for a student
router.delete("/delete/:studentID/:feeType", async (req, res) => {
  const { studentID, feeType } = req.params;

  try {
    const deletedFee = await Fee.findOneAndDelete({ studentID, feeType });

    if (!deletedFee) {
      return res.status(404).send("Fee not found");
    }

    res.status(200).send("Fee deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting fee");
  }
});

module.exports = router;
