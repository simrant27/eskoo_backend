const bcrypt = require("bcrypt");
const Parent = require("../models/parentModel");

const createParent = async (parentData) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(parentData.password, 10);
    parentData.password = hashedPassword;

    const parent = new Parent(parentData);
    await parent.save();
    return { success: true, parent };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getAllParents = async () => {
  try {
    return await Parent.find().populate("children", "fullName"); // Populate student details
  } catch (error) {
    throw new Error("Error fetching parents");
  }
};

const findParentById = async (parentId) => {
  try {
    const parent = await Parent.findById(parentId).populate(
      "children",
      "fullName"
    );
    if (!parent) {
      return { success: false, message: "Parent not found" };
    }
    return { success: true, parent };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const updateParent = async (parentId, updatedData) => {
  try {
    const parent = await Parent.findByIdAndUpdate(parentId, updatedData, {
      new: true,
    });
    if (!parent) {
      return { success: false, message: "Parent not found" };
    }
    return { success: true, parent };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const deleteParent = async (parentId) => {
  try {
    const parent = await Parent.findByIdAndDelete(parentId);
    if (!parent) {
      return { success: false, message: "Parent not found" };
    }
    return { success: true, parent };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  createParent,
  getAllParents,
  findParentById,
  updateParent,
  deleteParent,
};
