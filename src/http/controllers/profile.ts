import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  request.jwtVerify();
  console.log(request.user);

  return reply.status(200).send();
}