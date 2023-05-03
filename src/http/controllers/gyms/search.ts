import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeSearchGymUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, q } = createGymBodySchema.parse(request.query);

  const searchGymUseCase = makeSearchGymUseCase();

  const { gyms } = await searchGymUseCase.execute({
    page,
    query: q,
  });

  return reply.status(201).send({
    gyms,
  });
}
