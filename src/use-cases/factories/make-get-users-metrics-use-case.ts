import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const registerUseCase = new GetUserMetricsUseCase(prismaCheckInsRepository);

  return registerUseCase;
}
