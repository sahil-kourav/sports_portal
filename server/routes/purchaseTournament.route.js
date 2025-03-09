const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  createOrder,
  razorpayWebhook,
  getTournamentDetailWithPurchaseStatus,
  getAllPurchasedTournaments,
} = require("../controllers/tournamentPurchase.controller");

const router = express.Router();
router.post("/checkout/create-order", isAuthenticated, createOrder);
router.post("/webhook", express.raw({ type: "application/json" }), razorpayWebhook);
router.get("/tournament/:tournamentId/detail-with-status", isAuthenticated, getTournamentDetailWithPurchaseStatus);
router.get("/", isAuthenticated, getAllPurchasedTournaments);

module.exports = router;

