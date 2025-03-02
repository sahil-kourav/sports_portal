const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const tournamentRoute = require("./routes/tournament.route");




dotenv.config({});
// call database connection here 
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true })); // ✅ Allows form data

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.post("/tournament", (req, res) => {
    console.log(req.body); // Yeh check karega ki data sahi aa raha hai ya nahi
 });
 
//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tournament", tournamentRoute);

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})
