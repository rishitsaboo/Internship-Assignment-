const express = require("express");

const router = express.Router();

// Placeholder favorites routes. Replace with real handlers later.
router.get("/", (req, res) => {
  res.json({ favorites: [] });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Favorite added" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Favorite removed", id: req.params.id });
});

module.exports = router;


