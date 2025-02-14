import express, { Router } from "express";
import UpLoadController from "../controller/uploadController";
import storage from "../lib/multerConfig";
import multer from "multer";

const importMap = express.Router();
const upload: multer.Multer = multer({ storage: storage });

importMap.post("/import", upload.single("file"), UpLoadController.uploadMap);

export default importMap;
