const express = require("express");
const router = express.Router();
const parentService = require("../services/parentService");

// Create a new parent
router.post("/create", async (req, res) => {
  try {
    const parentData = req.body; // Assuming data is sent in the body
    const result = await parentService.createParent(parentData);
    if (result.success) {
      res.status(201).json({
        message: "Parent created successfully",
        parent: result.parent,
      });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating parent", error: error.message });
  }
});

// Get all parents
router.get("/", async (req, res) => {
  try {
    const parents = await parentService.getAllParents();
    res.status(200).json(parents);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching parents", error: error.message });
  }
});

// Find a parent by ID
router.get("/find/:id", async (req, res) => {
  try {
    const result = await parentService.findParentById(req.params.id);
    if (result.success) {
      res.status(200).json({ parent: result.parent });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching parent", error: error.message });
  }
});

// Update a parent
router.put("/update/:id", async (req, res) => {
  try {
    const result = await parentService.updateParent(req.params.id, req.body);
    if (result.success) {
      res.status(200).json({ parent: result.parent });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating parent", error: error.message });
  }
});

// Delete a parent
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await parentService.deleteParent(req.params.id);
    if (result.success) {
      res
        .status(200)
        .json({ message: "Parent deleted", parent: result.parent });
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting parent", error: error.message });
  }
});

module.exports = router;
