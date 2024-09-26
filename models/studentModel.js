const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  classAssigned: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Student", studentSchema);
