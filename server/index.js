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

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tournament", tournamentRoute);

app.get("/home", (_,res)=>{
  res.status(200).json({
    success:true,
    message:"Hello i am coming from backend"
  })
})

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})
