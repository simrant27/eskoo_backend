const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  children: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false },
  ],
  username: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  image: { type: String, required: false },
});

// Check if the model already exists to avoid overwriting
module.exports =
  mongoose.models.Parent || mongoose.model("Parent", parentSchema);
