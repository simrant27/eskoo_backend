const express = require("express");
const { login } = require("../controllers/authContrioller");
const router = express.Router();

// Login route for both parent and teacher
router.post("/", login);

module.exports = router;
