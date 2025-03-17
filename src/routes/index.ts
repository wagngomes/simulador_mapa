import bodyParser from "body-parser";
import { Express } from "express";
import importRouters from "./upload";
import queryMap from "./map";
import queryInventory from "./inventory";

const ApplicationRoutes = (app: Express) => {
  app.use(bodyParser.json());
  app.use(importRouters);
  app.use(queryMap);
  app.use(queryInventory);
};

export default ApplicationRoutes;
