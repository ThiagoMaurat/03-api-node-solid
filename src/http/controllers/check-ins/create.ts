import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createScheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createScheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const registerUseCase = makeCheckInUseCase();

  const { checkIn } = await registerUseCase.execute({
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    userId: request.user.sub.id.toString(),
  });

  return reply.status(201).send({ checkIn });
}
