const express = require("express");
const {
  createMaterial,
  getAllMaterials,
  deleteMaterial,
} = require("../services/materialService");
const upload = require("../middlewares/materialUploads");

const router = express.Router();

// Create a new material
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file; // Get file information if uploaded
    if (!file) {
      return res.status(400).json({ message: "File is required." });
    }

    const materialData = {
      ...req.body,
      file: file.filename, // Store the filename in DB
    };

    const material = await createMaterial(materialData);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all materials
router.get("/", async (req, res) => {
  try {
    const materials = await getAllMaterials();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a material
router.delete("/:id", async (req, res) => {
  const materialId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(materialId)) {
    return res.status(400).json({ message: "Invalid material ID" });
  }

  try {
    const material = await deleteMaterial(materialId);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
