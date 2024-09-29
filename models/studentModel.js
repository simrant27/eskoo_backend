const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
  },
  classAssigned: {
    type: String,
    required: false,
  },
  studentId: {
    type: String,
    required: false,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  parentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  fees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fee", // Reference the Fee model
    },
  ],
  result: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result", // Reference the Marks model
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
