const Parent = require("../models/parentModel");
const Teacher = require("../models/teacherModel");
const Admin = require("../models/adminModel");

// Controller to fetch user details by role and userId
exports.fetchUserDetails = async (req, res) => {
  const { role, userId } = req.params;

  try {
    let user;

    // Determine which model to query based on the role
    if (role === "parent") {
      user = await Parent.findById(userId);
    } else if (role === "teacher") {
      user = await Teacher.findById(userId);
    } else if (role === "admin") {
      user = await Admin.findById(userId);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user was found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data as a response (excluding sensitive information)
    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        // Add more fields if needed
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
