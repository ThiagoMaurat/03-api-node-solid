import { expect, describe, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Register Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail", async () => {
    const usersRepository = new InMemoryUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    expect(() =>
      authenticateUseCase.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    expect(
      async () =>
        await authenticateUseCase.execute({
          email: "johndoe@example.com",
          password: "12345",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
