const mongoose = require("mongoose");

// Define the Fee schema
const feeSchema = new mongoose.Schema({
  feeType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference the Student model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Fee model
const Fee = mongoose.model("Fee", feeSchema);

module.exports = Fee;
