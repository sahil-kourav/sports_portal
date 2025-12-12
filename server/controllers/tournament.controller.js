const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();
const User = require("../models/user.model");
const Tournament = require("../models/tournament.model");

const {
  deleteMediaFromCloudinary,
  uploadMedia,
} = require("../utils/cloudinary");

const createTournament = async (req, res) => {
    try {
        const { tournamentTitle, category } = req.body;
        if (!tournamentTitle || !category) {
            return res.status(400).json({
                success: false,
                message: "Tournament title and category is required."
            });
        }
        const tournament = await Tournament.create({
            tournamentTitle,
            category,
            creator: req.id,
        });

        return res.status(201).json({
            success: true,
            message: "Tournament created successfully!",
            tournament,
        });

    } catch (error) {
        console.error("Error creating tournament:", error);
        return res.status(500).json({
            message: "Failed to create tournament.",
        });
    }
};


const searchTournament = async (req, res) => {
  try {
    const { query = "" } = req.query;

    // create search query
    const searchCriteria = {
      isPublished: true,
      $or: [
        { tournamentTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    let tournaments = await Tournament.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tournaments: tournaments || [],
    });
  } catch (error) {
    console.log(error);
  }
};

const getPublishedTournament = async (_, res) => {
  try {
    const tournaments = await Tournament.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate({ path: "creator", select: "name photoUrl" });

    if (!tournaments) {
      return res.status(404).json({
        message: "tournament not found",
      });
    }
    return res.status(200).json({
      tournaments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get published tournaments",
    });
  }
};

const getCreatorTournaments = async (req, res) => {
  try {
    const userId = req.id;
    const tournaments = await Tournament.find({ creator: userId }).sort({
      createdAt: -1,
    });
    if (!tournaments) {
      return res.status(404).json({
        tournaments: [],
        message: "tournament not found",
      });
    }
    return res.status(200).json({
      tournaments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create tournament",
    });
  }
};

const editTournament = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const {
      tournamentTitle,
      subTitle,
      description,
      category,
      location,
      registrationDeadline,
      registrationFee,
      startDate,
      endDate,
      maxTeams,
      maxAge,
      minAge
    } = req.body;

    const thumbnail = req.file;

    // Find tournament
    let tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found!" });
    }


    let tournamentThumbnail = tournament.tournamentThumbnail; // Preserve old thumbnail if no new one is uploaded

    if (thumbnail) {
      // Delete old image from Cloudinary if it exists
      if (tournament.tournamentThumbnail) {
        const publicId = tournament.tournamentThumbnail
          .split("/")
          .pop()
          .split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      // Upload new thumbnail
      const uploadedImage = await uploadMedia(thumbnail.path);
      tournamentThumbnail = uploadedImage.secure_url;
    }

    // Update tournament data

    const updateData = {
      tournamentTitle,
      subTitle,
      description,
      category,
      location,
      registrationDeadline,
      registrationFee,
      startDate,
      endDate,
      maxTeams,
      maxAge,
      minAge,
      tournamentThumbnail,
    };

    const updatedTournament = await Tournament.findByIdAndUpdate(
      tournamentId,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      tournament: updatedTournament,
      message: "Tournament updated successfully.",
    });
  } catch (error) {
    console.error("Error updating tournament:", error);
    return res.status(500).json({
      message: "Failed to update tournament",
      error: error.message,
    });
  }
};

const deleteTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Find the tournament
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found!",
      });
    }

    // Delete thumbnail from Cloudinary (if exists)
    if (tournament.tournamentThumbnail) {
      const publicId = tournament.tournamentThumbnail
        .split("/")
        .pop()
        .split(".")[0];
      await deleteMediaFromCloudinary(publicId);
    }

    // Delete the tournament from the database
    await Tournament.findByIdAndDelete(tournamentId);

    return res.status(200).json({
      success: true,
      message: "Tournament deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete tournament. Please try again later.",
    });
  }
};

const getTournamentById = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
      return res.status(400).json({
        message: "Invalid tournament ID",
      });
    }

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({
        message: "tournament not found!",
      });
    }
    return res.status(200).json({
      tournament,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get tournament by id",
    });
  }
};

const togglePublishTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { publish } = req.query; // true, false
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({
        message: "tournament not found!",
      });
    }
    // publish status based on the query paramter
    tournament.isPublished = publish === "true";
    await tournament.save();

    const statusMessage = tournament.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `tournament is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
    });
  }
};

const getAge = (dob) => {
  const birthDate = new Date(dob);
  const ageDiff = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate age
};

const enrollInTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.user._id; // Authenticated User ID

    // Validate Tournament ID
    if (!tournamentId || tournamentId.length !== 24) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Tournament ID" });
    }

    // Check if Tournament Exists
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res
        .status(404)
        .json({ success: false, message: "Tournament not found" });
    }

    // Check if User Already Enrolled
    if (tournament.enrolledUsers.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already enrolled" });
    }

    // Check Age Eligibility
    const user = await User.findById(userId);
    const userAge = getAge(user.dob); // Assuming getAge is a function to calculate age based on dob

    if (userAge < tournament.minAge || userAge > tournament.maxAge) {
      return res.status(403).json({
        success: false,
        message: `You must be between ${tournament.minAge} and ${tournament.maxAge} years old to enroll in this tournament.`,
      });
    }

    // Enroll User
    tournament.enrolledUsers.push(userId);
    await tournament.save();

    // Update User's Enrolled Tournaments
    await User.findByIdAndUpdate(userId, {
      $push: { enrolledTournaments: tournamentId },
    });

    return res.status(200).json({
      success: true,
      message: "Enrolled successfully!",
      redirectUrl: "/tournament-progress",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getEnrolledTournaments = async (req, res) => {
  try {
    const userId = req.id;

    // Find User and Populate Enrolled Tournaments
    const user = await User.findById(userId)
      .populate("enrolledTournaments")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tournaments: user.enrolledTournaments || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTournamentDetailWithStatus = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Validate Tournament ID
    if (!tournamentId || tournamentId.length !== 24) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Tournament ID" });
    }

    const tournament = await Tournament.findById(tournamentId).populate(
      "creator"
    );

    if (!tournament) {
      return res
        .status(404)
        .json({ success: false, message: "Tournament not found" });
    }

    // Check if user is enrolled
    const enrolled = tournament.enrolledUsers.includes(req.user._id);

    return res.status(200).json({ success: true, tournament, enrolled });
  } catch (error) {
    console.error("Error in getTournamentDetailWithStatus:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createTournament,
  searchTournament,
  getPublishedTournament,
  getCreatorTournaments,
  editTournament,
  deleteTournament,
  getTournamentById,
  togglePublishTournament,
  enrollInTournament,
  getEnrolledTournaments,
  getTournamentDetailWithStatus,
};
