const express = require("express");
const User = require("../models/user.model");
const Tournament = require("../models/tournament.model");

// Get all users enrolled in tournaments
const getAllEnrolledUsers = async (req, res) => {
    try {
      const tournaments = await Tournament.find({})
        .populate({
          path: "enrolledUsers",
          select: "name email photoUrl dob number address",
        })
        .select("tournamentTitle enrolledUsers");
  
      console.log(tournaments, "tournaments populated");
  
      if (tournaments.length === 0) {
        return res.status(404).json({ success: false, message: "No tournaments found" });
      }
  
      const enrolledData = [];
  
      tournaments.forEach((tournament) => {
          console.log("Tournament:", tournament.tournamentTitle);
        if (tournament.enrolledUsers && tournament.enrolledUsers.length > 0) {
          tournament.enrolledUsers.forEach((user) => {
            enrolledData.push({
              userId: user._id,
              name: user.name,
              email: user.email,
              avatar: user.photoUrl,
              number: user.number || "N/A",
              dob: user.dob || "N/A",
              address: user.address || "N/A",
              tournament: tournament.tournamentTitle,
              tournamentId: tournament._id,
            });
          });
        }
      });
  
      
    if (enrolledData.length === 0) {
        return res.status(404).json({ success: false, message: "No enrolled users found" });
      }
  
      res.status(200).json({ success: true, users: enrolledData });
    } catch (error) {
      console.error("Error fetching enrolled users:", error);
      res.status(500).json({ success: false, message: "Server error while fetching data" });
    }
  };
  

// Show single user profile by ID
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "name email photoUrl dob number address enrolledTournaments"
    ).populate("enrolledTournaments", "tournamentTitle");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getAllEnrolledUsers,
  getUserProfile,
};
