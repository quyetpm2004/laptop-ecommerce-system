import {
  getProductByFilter,
  getProductHomePage,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} from "controllers/client/api/product.controller";
import express from "express";
import fileUploadMiddleware from "src/middleware/fileUploadMiddleware";

const productRoute = express.Router();

productRoute.get("/", getProductHomePage);
productRoute.get("/filter", getProductByFilter);
productRoute.get("/:id", getProductDetail);

productRoute.post(
  "/",
  fileUploadMiddleware("image", "images/product"),
  createProduct
);
productRoute.put(
  "/:id",
  fileUploadMiddleware("image", "images/product"),
  updateProduct
);
productRoute.delete("/:id", deleteProduct);

export default productRoute;
