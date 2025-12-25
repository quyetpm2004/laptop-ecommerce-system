import {
  addProductToCart,
  getCartByUser,
  getCartDetailByUser,
} from "controllers/client/api/cart.controller";
import express from "express";

const cartRoute = express.Router();

cartRoute.post("/", addProductToCart);
cartRoute.get("/", getCartByUser);
cartRoute.get("/detail", getCartDetailByUser);

export default cartRoute;
