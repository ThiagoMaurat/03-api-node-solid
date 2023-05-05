import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repoistory";
import { CreateGymUseCase } from "./create-gym";

let inMemoryGymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(inMemoryGymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await createGymUseCase.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym).toHaveProperty("id");
  });
});
