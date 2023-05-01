import { expect, describe, it, beforeEach } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryCheckInRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInRepository
    );
  });

  it("should be able to validate check-in", async () => {
    const checkIn = await inMemoryCheckInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn: validatedCheckIn } = await validateCheckInUseCase.execute({
      checkInId: checkIn.id,
    });

    expect(validatedCheckIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInRepository.items[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able able to validate an existent check-in", async () => {
    await expect(async () => {
      await validateCheckInUseCase.execute({
        checkInId: "inexistent-check-in-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
