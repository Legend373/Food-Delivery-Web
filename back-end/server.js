import express from "express";
import cors from "cors";
import connectDB from "./config/Database.js";
import 'dotenv/config';
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

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
app.use("/api/user", userRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)

app.get("/", (req, res) => {
    res.send("Heyy")
})
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})