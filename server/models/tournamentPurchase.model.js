const mongoose = require("mongoose");

const tournamentPurchaseSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament", // ✅ Correct reference
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Correct Model Export
const TournamentPurchase = mongoose.model("TournamentPurchase", tournamentPurchaseSchema);
module.exports = TournamentPurchase;
