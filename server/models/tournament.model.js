const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
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

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Yeh User model ko refer karega
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    registrationDeadline: {
        type: Date,

    },
    prizePool: {
        type: Number,

    },
    tournamentPrice: {
        type: Number,

    },
    tournamentThumbnail: {
        type: String
    },

    category: {
        type: String,
        enum: ["Cricket", "Football", "Basketball", "Tennis", "Badminton", "Hockey", "Volleyball", "Kabaddi", "Table Tennis", "Swimming", "Athletics", "Chess"],
        required: true
    },
    maxTeams: {
        type: Number
    },
    teamSize: {
        type: Number
    },
    matchFormat: {
        type: String,
        enum: ["T20", "One-Day", "Test", "Knockout", "Round-Robin", "Other"],
    },
    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed"],
        default: "Upcoming"
    },

    contactInfo: {
        email: { type: String },
        phone: { type: String }
    },
    matchSchedule: [
        {
            matchDate: { type: Date },
            teamA: { type: String },
            teamB: { type: String },
            time: { type: String }
        }
    ],
    rules: {
        type: String // Detailed tournament rules
    },
    enrolledUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isPublished: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
