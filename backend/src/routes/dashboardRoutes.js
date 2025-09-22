const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const dashboardController = require("../controllers/dashboardController.js");

const router = express.Router();

// All dashboard routes require authentication
router.use(authMiddleware);

// Get dashboard overview data
router.get("/overview", dashboardController.getDashboardOverview);

// Get dashboard statistics
router.get("/stats", dashboardController.getDashboardStats);

// Get recent activity
router.get("/activity", dashboardController.getRecentActivity);

module.exports = router;
