import { loginAPI, registerAPI } from "controllers/client/api/auth.controller";
import express, { Express } from "express";

const authRoute = express.Router();

authRoute.post("/login", loginAPI);
authRoute.post("/register", registerAPI);

export default authRoute;
