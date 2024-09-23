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

    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  fees: {
    tutionfee: { type: Number, required: false },
    busfee: { type: Number, required: false },
    sportsfee: { type: Number, required: false },
    extra: { type: Number, required: false },
  },
  results: [
    {
      subject: { type: String, required: true },
      grade: { type: String, required: true },
    },
  ],
  parentID: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },

  image: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

studentSchema.pre("save", function (next) {
  if (!this.studentId) {
    this.studentId = this._id.toString();
  }
  next();
});
module.exports = mongoose.model("Student", studentSchema);
