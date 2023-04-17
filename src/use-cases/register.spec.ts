import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashes = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashes).toBe(true);
  });

  it("should throw an error if user already exists", async () => {
    const usersRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({
      name: "John Doe",
      email: "XXXXXXXXXXXXXXXXXXX",
      password: "XXXXXX",
    });

    await expect(
      registerUseCase.execute({
        name: "John Doe",
        email: "XXXXXXXXXXXXXXXXXXX",
        password: "XXXXXX",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
