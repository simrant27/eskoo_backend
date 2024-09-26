const mongoose = require("mongoose");
const Student = require("../models/studentModel");
const Fee = require("../models/feeModel");

const assignFeeToStudent = async (feeData) => {
  try {
    const { studentID, feeType, amount, dueDate } = feeData;

    // Check if studentID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentID)) {
      return { success: false, message: "Invalid studentID format" };
    }

    // Check if the student exists
    const student = await Student.findById(studentID);
    if (!student) {
      return { success: false, message: "Student not found" };
    }

    // Create and save the new fee
    const fee = new Fee({
      studentID,
      feeType,
      amount,
      dueDate,
    });
    await fee.save();

    return { success: true, fee };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getFeesByStudentId = async (studentId) => {
  try {
    const fees = await Fee.find({ studentID: studentId }).populate(
      "studentID",
      "name"
    ); // Adjust the population fields as needed
    if (!fees || fees.length === 0) {
      return { success: false, message: "No fees found for the student" };
    }
    return { success: true, fees };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
// Update an existing fee
const updateFee = async (feeId, updatedFeeData) => {
  try {
    // Find and update the fee
    const updatedFee = await Fee.findByIdAndUpdate(feeId, updatedFeeData, {
      new: true,
    });

    if (!updatedFee) {
      return { success: false, message: "Fee not found" };
    }

    return { success: true, fee: updatedFee };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
// Delete a fee by ID
const deleteFee = async (feeId) => {
  try {
    const deletedFee = await Fee.findByIdAndDelete(feeId);
    if (!deletedFee) {
      return { success: false, message: "Fee not found" };
    }
    return { success: true, fee: deletedFee };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  assignFeeToStudent,
  getFeesByStudentId,
  updateFee,
  deleteFee,
};
