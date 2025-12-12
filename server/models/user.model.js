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

    number: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        default: "Other"
    },

    dob: {
        type: Date,
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
