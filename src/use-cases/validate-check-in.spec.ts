import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let inMemoryCheckInRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInRepository
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const { id } = await inMemoryCheckInRepository.create({
      id: "22",
      gym_id: "gym-02",
      user_id: "user-02",
    });

    const twentyOneMinutesInMs = 21 * 60 * 1000;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(
      validateCheckInUseCase.execute({
        checkInId: id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
