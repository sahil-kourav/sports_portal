const express = require("express");
const isAuthenticated = require ("../middlewares/isAuthenticated");
const { createTournament, editTournament, getTournamentById, getCreatorTournament, getPublishedTournament, searchTournament, togglePublishTournament } = require ("../controllers/tournament.controller");
const upload = require("../utils/multer");
const router = express.Router();

router.route("/").post(isAuthenticated,createTournament);
router.route("/search").get(isAuthenticated, searchTournament);
router.route("/published-courses").get( getPublishedTournament);
router.route("/").get(isAuthenticated,getCreatorTournament);
router.route("/:tournamentId").put(isAuthenticated,upload.single("tournamentThumbnail"),editTournament);
router.route("/:tournamentId").get(isAuthenticated, getTournamentById);
router.route("/:tournamentId").patch(isAuthenticated, togglePublishTournament);

module.exports = router;