const express = require("express");
const isAuthenticated = require ("../middlewares/isAuthenticated");
const { createTournament, editTournament, deleteTournament, getTournamentById, getCreatorTournaments, getPublishedTournament, togglePublishTournament, enrollInTournament, getEnrolledTournaments, getTournamentDetailWithStatus } = require ("../controllers/tournament.controller");
const upload = require("../utils/multer");
const router = express.Router();

router.route("/").post(isAuthenticated,createTournament);
router.route("/").get(isAuthenticated, getCreatorTournaments);
router.route("/published-tournaments").get( getPublishedTournament);
router.route("/:tournamentId").put(isAuthenticated, upload.single("tournamentThumbnail"), editTournament).delete(isAuthenticated, deleteTournament);

router.route("/:tournamentId").get(isAuthenticated, getTournamentById);
router.route("/:tournamentId").patch(isAuthenticated, togglePublishTournament);

router.route("/:tournamentId/enroll").post(isAuthenticated, enrollInTournament);
router.route("/enrolled-tournaments").get(isAuthenticated, getEnrolledTournaments);

router.route("/:tournamentId/detail-with-status").get(isAuthenticated, getTournamentDetailWithStatus);


module.exports = router;