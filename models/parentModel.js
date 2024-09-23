const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
});

// Check if the model already exists to avoid overwriting
module.exports =
  mongoose.models.Parent || mongoose.model("Parent", parentSchema);
