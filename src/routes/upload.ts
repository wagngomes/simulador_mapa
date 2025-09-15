import express, { Router } from "express";
import storage from "../lib/multerConfig";
import multer from "multer";
import productUpLoadController from "../controller/productUploadController";
import ProductController from "../controller/productController";
import HistoricUpLoadController from "../controller/uploadHistoricController";
import { GetForecastApi } from "../controller/getForecastApiController";
import { ForecastingDbPersistController } from "../controller/forecastingDbPersistController";
import ExportForecastController from "../controller/exportController";
import { fecthScenariosController } from "../controller/fetchScenariosController";
import { CreateUserController } from "../controller/createUserController";
import { AuthenticateController } from "../controller/authenticateController";

const importRouters = express.Router();
const upload: multer.Multer = multer({ storage: storage });

importRouters.post(
  "/importProducts",
  upload.single("file"),
  productUpLoadController.uploadProducts
);

importRouters.post(
  "/importHistoric",
  upload.single("file"),
  HistoricUpLoadController.uploadHistoric
 
);

importRouters.post("/limpaProdutos", ProductController.limpaBanco);

importRouters.post("/limpaHistoric", ProductController.limpaBancoHistoric);

importRouters.post('/getforecast', GetForecastApi.getForecasting)

importRouters.post('/salvaPrevisoes', ForecastingDbPersistController.ForecastingDbPersist)

importRouters.get('/export', ExportForecastController.exportForecast)

importRouters.get('/scenarios', fecthScenariosController.fetchScenarios)


importRouters.post('/createUser', CreateUserController.createUser)

importRouters.post('/authenticate', AuthenticateController.AuthenticateUser)


export default importRouters;
