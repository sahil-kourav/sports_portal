const mongoose = require ("mongoose");

const tournamentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String
    },
    description: {
        type: String
    },
    organizer: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Yeh User model ko refer karega
        required: true
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
        required: true
    },
    prizePool: {
        type: Number,
        required: true
    },
    entryFee: {
        type: Number,
        required: true
    },
    tournamentThumbnail: {
        type: String
    },

    tournamentType: {
        type: String, 
        enum: ["Cricket", "Football", "Basketball", "Hockey", "Tennis", "Other"],
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
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    matchSchedule: [
        {
            matchDate: { type: Date, required: true },
            teamA: { type: String, required: true },
            teamB: { type: String, required: true },
            time: { type: String, required: true }
        }
    ],
    rules: {
        type: String // Detailed tournament rules
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isPublished:{
        type:Boolean,
        default:false
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
