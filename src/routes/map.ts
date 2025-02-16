import express, { Router } from "express";
import MapController from "../controller/mapController";

const queryMap = express.Router();

queryMap.get('/completeMap', MapController.retornaMapaCompleto)
queryMap.post('/limpaBanco', MapController.limpaBanco)

export default queryMap