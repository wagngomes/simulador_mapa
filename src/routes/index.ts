import bodyParser from "body-parser";
import { Express } from "express";
import importRouters from "./upload";

const ApplicationRoutes = (app: Express) => {
  app.use(bodyParser.json());
  app.use(importRouters);

};

export default ApplicationRoutes;
