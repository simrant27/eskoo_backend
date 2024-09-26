const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Parent = require("../models/parentModel");
const Teacher = require("../models/teacherModel");
const Admin = require("../models/adminModel");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user is a parent
    let user = await Parent.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password for parent" });
      }

      // Generate JWT token for the parent
      const token = jwt.sign(
        { id: user._id, role: "parent" },
        "your_jwt_secret_key",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ token, redirect: "/parent-dashboard" });
    }

    // Check if the user is a teacher
    user = await Teacher.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid password for teacher" });
      }

      // Generate JWT token for the teacher
      const token = jwt.sign(
        { id: user._id, role: "teacher" },
        "your_jwt_secret_key",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ token, redirect: "/teacher-dashboard" });
    }
    user = await Teacher.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid password for teacher" });
      }

      // Generate JWT token for the teacher
      const token = jwt.sign(
        { id: user._id, role: "teacher" },
        "your_jwt_secret_key",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ token, redirect: "/teacher-dashboard" });
    }

    // Check if the user is a admin
    user = await Admin.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password for Admin" });
      }

      // Generate JWT token for the admin
      const token = jwt.sign(
        { id: user._id, role: "admin" },
        "your_jwt_secret_key",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ token, redirect: "/admin-dashboard" });
    }
    user = await Admin.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password for admin" });
      }

      // Generate JWT token for the admin
      const token = jwt.sign(
        { id: user._id, role: "admin" },
        "your_jwt_secret_key",
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ token, redirect: "/admin-dashboard" });
    }

    // If neither parent nor teacher nor admin was found
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
