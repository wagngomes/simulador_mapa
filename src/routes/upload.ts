import { FastifyInstance } from "fastify";
import { importCSV } from "../controller/uploadController";
import { upload } from "../lib/multerConfig";

export async function csvRoutes(fastify: FastifyInstance) {
  fastify.post("/import", { preHandler: upload.single("file") }, importCSV);
}
