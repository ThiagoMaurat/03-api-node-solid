import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function GymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
}
