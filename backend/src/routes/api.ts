import express, { Express } from "express";
import { checkValidJWT } from "src/middleware/jwt.middleware";
import authRoute from "./auth.route";
import productRoute from "./product.route";
import cartRoute from "./cart.route";

const router = express.Router();

router.use(checkValidJWT);
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);

export default router;
