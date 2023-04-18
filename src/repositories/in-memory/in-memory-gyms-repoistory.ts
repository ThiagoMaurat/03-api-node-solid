import { Gym } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym> {
    const gym = this.items.find((gym) => gym.id === id);

    if (!gym) {
      throw new Error("Gym not found");
    }

    return gym;
  }
}
