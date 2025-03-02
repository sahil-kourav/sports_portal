const express = require("express");
const isAuthenticated = require ("../middlewares/isAuthenticated");
const { createTournament, editTournament, getTournamentById, getCreatorTournaments, getPublishedTournament, searchTournament, togglePublishTournament } = require ("../controllers/tournament.controller");
const upload = require("../utils/multer");
const router = express.Router();

// Debugging: Check if function is properly imported 



router.route("/").post(isAuthenticated,createTournament);
router.route("/search").get(isAuthenticated, searchTournament);
router.route("/published-tournaments").get( getPublishedTournament);
router.route("/").get(isAuthenticated, getCreatorTournaments);
router.route("/:tournamentId").put(isAuthenticated,upload.single("tournamentThumbnail"),editTournament);
router.route("/:tournamentId").get(isAuthenticated, getTournamentById);
router.route("/:tournamentId").patch(isAuthenticated, togglePublishTournament);

module.exports = router;