const express = require("express");
const app = express();

app.get("/api", (req, res)=>{
    res.send("Hello Backend is running");
})

app.listen(5000, ()=>{
    console.log("server is running at port 5000");
})