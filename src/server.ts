import fastify from "fastify";
import { csvRoutes } from "./routes/upload";

const app = fastify();

app.register(csvRoutes);

app
  .listen({
    port: 3006,
  })
  .then(() => {
    console.log("server on air");
  });
