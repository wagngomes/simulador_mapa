import fastify from "fastify";

const app = fastify();

app.get("/", () => {
  return "simulador mapa";
});

app
  .listen({
    port: 3006,
  })
  .then(() => {
    console.log("server on air");
  });
