import express, { Express } from "express";
import { checkValidJWT } from "src/middleware/jwt.middleware";
import authRoute from "./auth.route";
import productRoute from "./product.route";

const router = express.Router();

router.use(checkValidJWT);
router.use("/auth", authRoute);
router.use("/products", productRoute);

export default router;
