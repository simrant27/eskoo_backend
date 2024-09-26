const Student = require("../models/studentModel");
const mongoose = require("mongoose");

const createStudent = async (studentData) => {
  try {
    if (
      studentData.parentID &&
      !mongoose.Types.ObjectId.isValid(studentData.parentID)
    ) {
      return { success: false, message: "Invalid parentID format" };
    }
    const student = new Student(studentData);
    await student.save();
    return { success: true, student };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getAllStudents = async () => {
  try {
    const students = await Student.find().populate(
      "parentID",
      "fullName email"
    );
    return students;
  } catch (error) {
    throw new Error("Error fetching students");
  }
};

const findStudentById = async (studentId) => {
  try {
    const student = await Student.findById(studentId).populate(
      "parentID",
      "fullName email"
    );
    if (!student) {
      return { success: false, message: "Student not found" };
    }
    return { success: true, student };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const updateStudent = async (studentId, updatedData) => {
  try {
    const student = await Student.findByIdAndUpdate(studentId, updatedData, {
      new: true,
    });
    if (!student) {
      return { success: false, message: "Student not found" };
    }
    return { success: true, student };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const deleteStudent = async (studentId) => {
  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return { success: false, message: "Student not found" };
    }
    return { success: true, student };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getStudentsByClass = async (classAssigned) => {
  try {
    const students = await Student.find({ classAssigned: classAssigned });
    if (students.length === 0) {
      return { success: false, message: "No students found for this class" };
    }
    return { success: true, students };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  findStudentById,
  updateStudent,
  deleteStudent,
  getStudentsByClass,
};
