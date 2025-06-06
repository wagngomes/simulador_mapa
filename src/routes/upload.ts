import express, { Router } from "express";
import MapUpLoadController from "../controller/mapUploadController";
import storage from "../lib/multerConfig";
import multer from "multer";
import productUpLoadController from "../controller/productUploadController";
import ProductController from "../controller/productController";
import SaldosUpLoadController from "../controller/uploadInventoryController";
import HistoricUpLoadController from "../controller/uploadHistoricController";
import { GetForecastApi } from "../controller/getForecastApiController";
import MapController from "../controller/mapController";
import { ForecastingDbPersistController } from "../controller/forecastingDbPersistController";
import ExportForecastController from "../controller/exportController";

const importRouters = express.Router();
const upload: multer.Multer = multer({ storage: storage });

importRouters.post(
  "/import",
  upload.single("file"),
  MapUpLoadController.uploadMap
);
importRouters.post(
  "/importProducts",
  upload.single("file"),
  productUpLoadController.uploadProducts
);

importRouters.post(
  "/importInventory",
  upload.single("file"),
  SaldosUpLoadController.uploadInventory
);
importRouters.post(
  "/importHistoric",
  upload.single("file"),
  HistoricUpLoadController.uploadHistoric
 
);

importRouters.post("/limpaProdutos", ProductController.limpaBanco);

importRouters.post("/limpaHistoric", ProductController.limpaBancoHistoric);

importRouters.get('/getforecast', GetForecastApi.getForecasting)

importRouters.post("/limpaMap", MapController.limpaMapa);

importRouters.post('/salvaPrevisoes', ForecastingDbPersistController.ForecastingDbPersist)

importRouters.get('/export', ExportForecastController.ExportForecast)


export default importRouters;
