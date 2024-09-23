const Teacher = require("../models/teacherModel");
const bcrypt = require("bcrypt");

// Create a new teacher
const createTeacher = async (teacherData) => {
  try {
    console.log("Received teacher data:", teacherData);

    const {
      fullName,
      email,
      phone,
      subjectsTaught,
      gradeAssigned,
      teacherID,
      enrolled,
      qualifications,
      address,
      username,
      password,
      image,
    } = teacherData;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      fullName,
      email,
      phone,
      subjectsTaught,
      gradeAssigned,
      teacherID,
      enrolled,
      qualifications,
      address,
      username,
      password: hashedPassword,
      image, // Use the uploaded image path
    });

    await newTeacher.save();

    return { success: true, teacher: newTeacher };
  } catch (error) {
    console.error("Error creating teacher:", error);
    return { success: false, message: error.message };
  }
};

//get teacher
// Fetch all teachers
const getAllTeachers = async () => {
  try {
    const teachers = await Teacher.find(); // Retrieve all teachers
    return { success: true, teachers };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Update teacher details
const updateTeacher = async (teacherId, updatedData) => {
  try {
    // If password is being updated, hash the new password
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    // Find the teacher by ID and update their details
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updatedData,
      { new: true }
    );

    if (!updatedTeacher) {
      return { success: false, message: "Teacher not found" };
    }

    return { success: true, teacher: updatedTeacher };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Delete a teacher
const deleteTeacher = async (teacherId) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      return { success: false, message: "Teacher not found" };
    }

    return { success: true, message: "Teacher deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Find teacher by ID
const findTeacherById = async (teacherId) => {
  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return { success: false, message: "Teacher not found" };
    }
    return { success: true, teacher };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
  findTeacherById,
};
