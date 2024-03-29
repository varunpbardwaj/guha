import request from "supertest";
import server from "../../../src/server";
import * as utils from "../../../src/utils";

export const users = [
  {
    username: "varunbardwajp",
    password: "$2a$10$ve4POvUXOkZrcU4gUkbJBeIqtGECp9gg4ljC7ssSpvb5EkQWrLs4.",
  },
];

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("responds with status 200", async () => {
    jest.spyOn(utils, "resolveUsers").mockReturnValue(users);
    const response = await request(server).post("/api/auth/login").send({
      username: "varunbardwajp",
      password: "Bengaluru@123",
    });
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual(users[0].username);
    expect(response.body).toHaveProperty("access_token");
  });

  it("responds with status 400 on invalid username", async () => {
    jest.spyOn(utils, "resolveUsers").mockReturnValue(users);
    const response = await request(server).post("/api/auth/login").send({
      username: "varunbardwaj",
      password: "Bengaluru@123",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("User not found");
  });

  it("responds with status 400 on invalid password", async () => {
    jest.spyOn(utils, "resolveUsers").mockReturnValue(users);
    const response = await request(server).post("/api/auth/login").send({
      username: "varunbardwajp",
      password: "Bengaluru@124",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual("Invalid credentials");
  });
});
