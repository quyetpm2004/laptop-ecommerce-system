import {
  createUser,
  deleteUser,
  fetchAccountAPI,
  getUserByIdAPI,
  getUsersAPI,
  postAddProductToCartAPI,
  updateUser,
} from "controllers/client/api.controller";
import { loginAPI, registerAPI } from "controllers/client/auth.controller";
import express, { Express } from "express";
import { checkValidJWT } from "src/middleware/jwt.middleware";

const router = express.Router();

const apiRoutes = (app: Express) => {
  router.post("/add-product-to-cart", postAddProductToCartAPI);
  router.get("/users", getUsersAPI);
  router.get("/users/:id", getUserByIdAPI);
  router.post("/users", createUser);
  router.put("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);

  router.post("/login", loginAPI);
  router.post("/register", registerAPI);

  router.get("/account", fetchAccountAPI);

  app.use("/api", checkValidJWT, router);
};

export default apiRoutes;
