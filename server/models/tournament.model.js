const mongoose = require("mongoose");
const tournamentSchema = new mongoose.Schema(
  {
    tournamentTitle: {
      type: String,
      required: true
    },
    subTitle: {
      type: String
    },
    description: {
      type: String
    },

    category: {
      type: String,
      enum: [
        "Cricket", "Football", "Basketball", "Tennis", "Badminton", "Hockey", "Volleyball", "Kabaddi", "Kho Kho", "Chess",
        "Kushti", "Archery", "Wrestling", "Online Gaming", "Other"
      ],
      required: true
    },

    location: {
      type: String
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    registrationDeadline: {
      type: Date
    },
    registrationFee: {
      type: Number,
      default: 999
    },
    tournamentThumbnail: {
      type: String
    },
    maxTeams: {
      type: Number,
      default: 10
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },

    minAge: {
      type: Number,
      default: 10
    },

    maxAge: {
      type: Number,
      default: 40
    },

    enrolledUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true });

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
