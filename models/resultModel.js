const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  results: [
    {
      subject: { type: String, required: true },
      grade: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Result", resultSchema);
