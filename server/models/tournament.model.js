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
    tournamentRules: {
        type: String
    },

    location: {
        type: String
    },


    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    registrationDeadline: {
        type: Date
    },
    registrationFee: {
        type: Number,
        default: 0
    },

    tournamentThumbnail: {
        type: String,
        default: "default-thumbnail.jpg"
    },

    category: {
        type: String,
        enum: [
            "Cricket", "Football", "Basketball", "Tennis", "Badminton",
            "Hockey", "Volleyball", "Kabaddi", "Kho Kho",
            "Kushti", "Archery", "Wrestling", "Online Gaming", "Other"
        ],
        required: true
    },

    maxTeams: {
        type: Number,
        default: 20
    },

    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed"],
        default: "Upcoming"
    },

    enrolledUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    createdAt: {
        type: String,
    },

    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
