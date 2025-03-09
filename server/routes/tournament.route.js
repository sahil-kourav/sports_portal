const express = require("express");
const isAuthenticated = require ("../middlewares/isAuthenticated");
const { createTournament, editTournament, deleteTournament, getTournamentById, getCreatorTournaments, getPublishedTournament, searchTournament, togglePublishTournament, enrollInTournament } = require ("../controllers/tournament.controller");
const upload = require("../utils/multer");
const router = express.Router();

router.route("/").post(isAuthenticated,createTournament);
router.route("/").get(isAuthenticated, getCreatorTournaments);
router.route("/search").get(isAuthenticated, searchTournament);
router.route("/published-tournaments").get( getPublishedTournament);
router.route("/:tournamentId").put(isAuthenticated, upload.single("tournamentThumbnail"), editTournament).delete(isAuthenticated, deleteTournament);


router.route("/:tournamentId").get(isAuthenticated, getTournamentById);
router.route("/:tournamentId").patch(isAuthenticated, togglePublishTournament);

// router.route("/tournamentId/enroll").post(isAuthenticated, enrollInTournament);
router.route("/:tournamentId/enroll").post(isAuthenticated, enrollInTournament);


module.exports = router;