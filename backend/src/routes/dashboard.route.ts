import { getDashboard } from "controllers/admin/api/dashboard.controller";
import express from "express";

const dashboardRoute = express.Router();

dashboardRoute.get("/", getDashboard);

export default dashboardRoute;
