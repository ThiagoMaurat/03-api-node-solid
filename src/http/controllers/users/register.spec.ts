import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
  });
});
