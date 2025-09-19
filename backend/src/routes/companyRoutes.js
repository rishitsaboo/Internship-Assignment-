const express = require("express");
const authMiddleware = require("../middleware/authmiddleware.js");

const router = express.Router();

// Protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to your company profile",
    user: req.user   // comes from middleware
  });
});

module.exports = router;
