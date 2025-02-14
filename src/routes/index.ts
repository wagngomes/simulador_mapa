import bodyParser from "body-parser";
import { Express } from "express";
import importMap from "./upload";

const ApplicationRoutes = (app: Express) => {
  app.use(bodyParser.json());
  app.use(importMap);
};

export default ApplicationRoutes;
