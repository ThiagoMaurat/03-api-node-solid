import { Gym, Prisma } from "@prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<Gym>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
}
