import bodyParser from "body-parser";
import { Express } from "express";
import importRouters from "./upload";
import queryMap from "./map";

const ApplicationRoutes = (app: Express) => {
  app.use(bodyParser.json());
  app.use(importRouters);
  app.use(queryMap);
};

export default ApplicationRoutes;
