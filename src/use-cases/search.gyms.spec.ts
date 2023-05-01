import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repoistory";

let inMemoryGymsRepository: InMemoryGymsRepository;
let searchGymUseCase: SearchGymUseCase;

describe("Gyms Use Case", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    searchGymUseCase = new SearchGymUseCase(inMemoryGymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await inMemoryGymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const { gyms } = await searchGymUseCase.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++)
      await inMemoryGymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    const { gyms } = await searchGymUseCase.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
