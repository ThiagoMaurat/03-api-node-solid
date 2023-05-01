import { SearchGymUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymUseCase() {
  const prismaUsersRepository = new PrismaGymsRepository();
  const registerUseCase = new SearchGymUseCase(prismaUsersRepository);

  return registerUseCase;
}
