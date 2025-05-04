import express from "express";
import cors from "cors";
import connectDB from "./config/Database.js";
import 'dotenv/config';
import foodRoute from "./routes/foodRoute.js";

//app config
const app = express()
const port = 4000;
//app middleware
app.use(express.json());
app.use(cors())
//db connection
connectDB();
//api endpoints
app.use("/api/food", foodRoute)
app.use("/images", express.static("uploads"))

app.get("/", (req, res) => {
    res.send("Heyy")
})
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})