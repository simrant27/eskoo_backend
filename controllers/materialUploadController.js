const StudyMaterial = require("../models/StudyMaterial");

// Controller for handling file upload
exports.uploadStudyMaterial = async (req, res) => {
  const { title, description } = req.body;
  const fileName = req.file.filename;
  const filePath = req.file.path;

  try {
    const newMaterial = new StudyMaterial({
      title,
      description,
      fileName,
      filePath,
    });

    await newMaterial.save();
    res
      .status(201)
      .json({ message: "File uploaded successfully!", file: newMaterial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
