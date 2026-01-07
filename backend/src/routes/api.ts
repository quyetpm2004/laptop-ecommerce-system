import express, { Express } from "express";
import { checkValidJWT } from "src/middleware/jwt.middleware";
import authRoute from "./auth.route";
import productRoute from "./product.route";
import cartRoute from "./cart.route";
import orderRoute from "./order.route";
import userRoute from "./user.route";
import dashboardRoute from "./dashboard.route";

const router = express.Router();

router.use(checkValidJWT);
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute);
router.use("/orders", orderRoute);
router.use("/dashboard", dashboardRoute);

export default router;
