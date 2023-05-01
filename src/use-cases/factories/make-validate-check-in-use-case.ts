import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymUseCase } from "../search-gyms";

export function makeValidateCheckInUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymUseCase(prismaGymsRepository);

  return useCase;
}
