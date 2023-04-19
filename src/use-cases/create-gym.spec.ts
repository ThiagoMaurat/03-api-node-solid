import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repoistory";
import { CreateGymUseCase } from "./create-gym";

let inMemoryGymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe("Register Use Case", () => {
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
