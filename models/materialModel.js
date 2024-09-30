const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  file: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
