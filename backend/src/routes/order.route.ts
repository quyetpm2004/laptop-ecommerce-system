import {
  getAllOrders,
  getDetailOrder,
} from "controllers/admin/api/order.controller";
import {
  getOrderHistory,
  placeOrder,
} from "controllers/client/api/order.controller";
import express from "express";

const orderRoute = express.Router();

orderRoute.post("/place-order", placeOrder);
orderRoute.get("/", getAllOrders);
orderRoute.get("/:id", getDetailOrder);
orderRoute.get("/history", getOrderHistory);

export default orderRoute;
