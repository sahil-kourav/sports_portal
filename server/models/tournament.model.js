const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
    tournamentTitle: {
        type: String,
        required: true
    },
    subTitle: { type: String },
    description: { type: String },

    location: { type: String },


    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    registrationDeadline: { type: Date },
    registrationFee: { type: Number, default: 0 },

    prizePoolFirst: { type: Number, default: 0 },
    prizePoolSecond: { type: Number, default: 0 },
    prizePoolThird: { type: Number, default: 0 },

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

    maxTeams: { type: Number, default: 30 },

    status: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed"],
        default: "Upcoming"
    },

    contactInfo: {
        phone: { type: String },
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
