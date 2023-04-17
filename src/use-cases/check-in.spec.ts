import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInUseCase } from "./checkin";

let checkInRepository: InMemoryCheckInsRepository;
let checkInUseCase: CheckInUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    checkInUseCase = new CheckInUseCase(checkInRepository);
  });

  it("should not be able to get user profile with wrong id", async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
