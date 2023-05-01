import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const GymsRepository = new PrismaGymsRepository();
  const checkInUseCase = new CheckInUseCase(checkInsRepository, GymsRepository);

  return checkInUseCase;
}
