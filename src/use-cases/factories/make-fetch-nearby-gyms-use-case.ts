import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearByGymUseCase() {
  const prismaUsersRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(prismaUsersRepository);

  return useCase;
}
