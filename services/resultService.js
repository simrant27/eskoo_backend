const Result = require("../models/resultModel");
const Student = require("../models/studentModel"); // Adjust the path if needed

async function assignMarksToStudent(studentId, teacherId, subject, marks) {
  const result = new Result({
    studentId: studentId,
    teacherId: teacherId,
    subject: subject,
    marks: marks,
  });

  const savedMarks = await result.save();
  await Student.findByIdAndUpdate(studentId, {
    $push: { result: savedMarks._id },
  });

  return { message: "Marks assigned successfully" };
}
async function getStudentResults(studentId) {
  const student = await Student.findById(studentId).populate({
    path: "result",
    populate: { path: "teacherId", select: "fullName" },
  });

  return student.result; // Return the student's marks
}

async function getAllResultsForStudent(studentId) {
  const results = await Result.find({ studentId: studentId }).populate(
    "teacherId",
    "fullName"
  );

  console.log(`Results for student ID ${studentId}:`, results);
  return results;
}

// Export the functions for use in routes
module.exports = {
  assignMarksToStudent,
  getStudentResults,
  getAllResultsForStudent,
};
