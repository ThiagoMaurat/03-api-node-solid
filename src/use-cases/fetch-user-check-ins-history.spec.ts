import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-check-ins-history";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let fetchUserCheckInHistoryUseCase: FetchUserCheckInHistoryUseCase;

describe("Fetch User Check In Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    fetchUserCheckInHistoryUseCase = new FetchUserCheckInHistoryUseCase(
      inMemoryCheckInsRepository
    );
  });

  it("should be able to fetch Check-In history", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to paginated Check-In history", async () => {
    for (let i = 1; i <= 22; i++)
      await inMemoryCheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });

    const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
