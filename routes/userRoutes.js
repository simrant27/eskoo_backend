const express = require("express");
const { fetchUserDetails } = require("../controllers/userController");
const router = express.Router();

router.get("/:role/:userId", fetchUserDetails);

module.exports = router;
