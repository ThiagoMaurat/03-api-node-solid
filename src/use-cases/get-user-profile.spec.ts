import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let userRepository: InMemoryUserRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
  });

  it("should be able to get user profile", async () => {
    const user = await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await getUserProfileUseCase.execute({
      userId: user.id,
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to get user profile with wrong id", async () => {
    expect(async () => {
      await getUserProfileUseCase.execute({
        userId: "Not-found",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
