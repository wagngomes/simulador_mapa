import express, { Router } from "express";
import UpLoadController from "../controller/uploadController";
import storage from "../lib/multerConfig";
import multer from "multer";
import productUpLoadController from "../controller/productUploadController";

const importRouters = express.Router();
const upload: multer.Multer = multer({ storage: storage });

importRouters.post(
  "/import",
  upload.single("file"),
  UpLoadController.uploadMap
);
importRouters.post(
  "/importProducts",
  upload.single("file"),
  productUpLoadController.uploadProducts
);

export default importRouters;
