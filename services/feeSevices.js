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

module.exports = {
  assignFeeToStudent,
};
