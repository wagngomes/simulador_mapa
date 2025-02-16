import bodyParser from "body-parser";
import { Express } from "express";
import importMap from "./upload";
import queryMap from "./map";

const ApplicationRoutes = (app: Express) => {
  app.use(bodyParser.json());
  app.use(importMap);
  app.use(queryMap)
};

export default ApplicationRoutes;
