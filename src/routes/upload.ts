import express, { Router } from "express";
import UpLoadController from "../controller/uploadController";
import storage from "../lib/multerConfig";
import multer from "multer";
import productUpLoadController from "../controller/productUploadController";
import ProductController from "../controller/productController";
import SaldosUpLoadController from "../controller/saldosUploadController";

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

importRouters.post('/importInventory', upload.single('file'),SaldosUpLoadController.uploadInventory)

importRouters.post("/limpaProdutos", ProductController.limpaBanco);

export default importRouters;
