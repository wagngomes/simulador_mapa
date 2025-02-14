import express, { Request, Response } from "express";
import { Express } from "express";
import ApplicationRoutes from "./routes";

const app: Express = express();

app.use("/files", express.static("uploads"));
ApplicationRoutes(app);

app.listen(3002, () => {
  console.log("Server on port 3002");
});

export default app;
