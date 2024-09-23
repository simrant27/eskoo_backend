const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  tuitionFee: { type: Number, required: false },
  busFee: { type: Number, required: false },
  sportsFee: { type: Number, required: false },
  extra: { type: Number, required: false },
});

module.exports = mongoose.model("Fee", feeSchema);
