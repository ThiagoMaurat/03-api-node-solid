import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";
import { FastifyRequest, FastifyReply } from "fastify";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userWithSameEmail) {
    return reply.status(409).send();
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  });

  return reply.status(201).send();
}
