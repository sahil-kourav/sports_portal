const express = require("express");
const connectDB = require("./database/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const tournamentRoute = require("./routes/tournament.route");
const enrollmentRoute = require("./routes/enrollment.route");
require("dotenv").config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5175"],
    credentials:true
}))

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tournament", tournamentRoute);
app.use("/api/v1/enrollment", enrollmentRoute);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
