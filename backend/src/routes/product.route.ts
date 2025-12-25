import {
  getProductByFilter,
  getProductHomePage,
  getProductDetail,
} from "controllers/client/api/product.controller";
import express from "express";

const productRoute = express.Router();

productRoute.get("/", getProductHomePage);
productRoute.get("/filter", getProductByFilter);
productRoute.get("/:id", getProductDetail);

export default productRoute;
