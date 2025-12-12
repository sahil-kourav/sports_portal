const express = require("express");
const router = express.Router();
const {
  getAllEnrolledUsers,
  getUserProfile,
} = require("../controllers/enrollment.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");

// Admin routes
router.get("/admin/enrollments", isAuthenticated, getAllEnrolledUsers);
router.get("/admin/users/:userId", isAuthenticated, getUserProfile);

module.exports = router;
