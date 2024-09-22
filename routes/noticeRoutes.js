const express = require("express");
const {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} = require("../services/noticeService");
const upload = require("../middlewares/fileNoticeUpload");

const router = express.Router();

// Create a new notice
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file ? req.file.path : null; // Get file path if uploaded
    const noticeData = {
      ...req.body,
      file, // Attach file path to the notice data
    };
    const notice = await createNotice(noticeData);
    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all notices
router.get("/", async (req, res) => {
  try {
    const notices = await getAllNotices();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a notice by ID
router.get("/:id", async (req, res) => {
  try {
    const notice = await getNoticeById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.status(200).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a notice
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const file = req.file ? req.file.path : null; // Get file path if uploaded
    const noticeData = {
      ...req.body,
      file, // Update file path
    };
    const notice = await updateNotice(req.params.id, noticeData);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.status(200).json(notice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a notice
router.delete("/:id", async (req, res) => {
  try {
    const notice = await deleteNotice(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
