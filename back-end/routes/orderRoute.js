import express from "express"
import { orderList, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js"

const orderRoute = express.Router()

orderRoute.post("/place", authMiddleware, placeOrder)
orderRoute.post("/verify", verifyOrder)
orderRoute.post("/userorders", authMiddleware, userOrders)
orderRoute.get("/list", orderList)
orderRoute.post("/status", updateStatus)

export default orderRoute;