const mongoose = require("mongoose");

const StudyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StudyMaterial", StudyMaterialSchema);
