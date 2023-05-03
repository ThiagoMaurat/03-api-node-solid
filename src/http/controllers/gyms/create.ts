import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateGymInUseCase } from "@/use-cases/factories/make-create-gym-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { description, latitude, phone, title, longitude } =
    createGymBodySchema.parse(request.body);

  const registerUseCase = makeCreateGymInUseCase();

  await registerUseCase.execute({
    title,
    description,
    latitude,

    longitude,
    phone,
  });

  return reply.status(201).send();
}
