const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true // ✅ Ensures uniqueness but allows null values
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    },
    dob: {
        type: Date
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    sportsInterest: {
        type: [String], // ✅ Example: ["Cricket", "Football"]
        default: []
    },
    enrolledTournaments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament"
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    },
    photoUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
