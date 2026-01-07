import {
  createNewUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "controllers/admin/api/user.controller";
import express from "express";
import fileUploadMiddleware from "src/middleware/fileUploadMiddleware";

const userRoute = express.Router();

userRoute.get("/", getAllUser);
userRoute.post("/", fileUploadMiddleware("avatar"), createNewUser);
userRoute.put("/:id", fileUploadMiddleware("avatar"), updateUser);
userRoute.delete("/:id", deleteUser);

export default userRoute;
