import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import { Request } from "express";

const fileUploadMiddleware = (fieldName: string, dir: string = "images") => {
  return multer({
    storage: multer.diskStorage({
      destination: "public/" + dir,
      filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 3,
    },
    fileFilter: (req: Request, file: any, cb: Function) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG and PNG images are allowed."), false);
      }
    },
  }).single(fieldName);
};

export default fileUploadMiddleware;
