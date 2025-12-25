import { getProductHomePage } from "controllers/client/api/product.controller";
import express from "express";

const productRoute = express.Router();

productRoute.get("/", getProductHomePage);

export default productRoute;
