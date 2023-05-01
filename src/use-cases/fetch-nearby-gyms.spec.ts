import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repoistory";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let inMemoryGymsRepository: InMemoryGymsRepository;
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms UseCase", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(inMemoryGymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await inMemoryGymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    console.log(gyms);

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
