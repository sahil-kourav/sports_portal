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

    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    },
    
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
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
