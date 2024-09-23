const Student = require("../models/studentModel");

//create new student
const createStudent = async (studentData) => {
  try {
    const student = new Student(studentData);
    await student.save();
    return student;
  } catch (error) {
    console.error("Error creating teacher:", error);
    return { success: false, message: error.message };
  }
};

//get all students
const getAllStudents = async () => {
  try {
    console.log("here");
    const students = await Student.find();
    return { success: true, students };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//get student by id
const findStudentByid = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return { success: false, message: "student not found" };
    }

    return { success: true, student };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//update
const updateStudent = async (studentId, updatedData) => {
  try {
    const student = await Student.findByIdAndUpdate(studentId, updatedData, {
      new: true, // This ensures we return the updated student
    });

    if (!student) {
      return { success: false, message: "Student not found" };
    }

    return { success: true, student };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//delete
const deleteStudent = async (studentId) => {
  try {
    const deletedstudent = await Student.findByIdAndDelete(studentId);
    if (!deletedstudent) {
      return { success: false, message: "Student not found" };
    }

    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  findStudentByid,
  updateStudent,
  deleteStudent,
};
