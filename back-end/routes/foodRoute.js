import multer from "multer";
import { addFood, listFoods, removeFood } from "../controllers/foodController.js";

import express from "express";

const foodRoute = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

foodRoute.post("/add", upload.single("image"), addFood);
foodRoute.get("/list", listFoods)
foodRoute.post("/remove", removeFood)

export default foodRoute;