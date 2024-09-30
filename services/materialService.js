const Material = require("../models/materialModel");

// Create a new material
const createMaterial = async (materialData) => {
  const material = new Material(materialData);
  await material.save();
  return material;
};

// Get all materials
const getAllMaterials = async () => {
  return await Material.find();
};

// Delete a material
const deleteMaterial = async (id) => {
  return await Material.findByIdAndDelete(id);
};

module.exports = {
  createMaterial,
  getAllMaterials,
  deleteMaterial,
};
