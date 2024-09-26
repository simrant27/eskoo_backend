const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel"); // Make sure the path and name are correct

// Service to create a new admin
const createAdmin = async (adminData) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    adminData.password = hashedPassword;

    // Create a new admin document in the database
    const newAdmin = new Admin(adminData);
    await newAdmin.save();

    return { success: true, admin: newAdmin };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Service to get all admins
const getAllAdmins = async () => {
  try {
    // Fetch all admins from the database
    return await Admin.find().populate("children", "fullName"); // Assuming "children" is a reference field
  } catch (error) {
    throw new Error("Error fetching admins");
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
};
