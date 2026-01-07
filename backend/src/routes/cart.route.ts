import {
  addProductToCart,
  deleteCartItem,
  getCartByUser,
  getCartDetailByUser,
  updateCartBeforeCheckout,
  updateCartItem,
} from "controllers/client/api/cart.controller";
import express from "express";

const cartRoute = express.Router();

cartRoute.post("/", addProductToCart);
cartRoute.get("/", getCartByUser);
cartRoute.get("/detail", getCartDetailByUser);
cartRoute.put("/before-checkout", updateCartBeforeCheckout);
cartRoute.put("/items/:cartDetailId", updateCartItem);
cartRoute.delete("/items/:cartDetailId", deleteCartItem);

export default cartRoute;
