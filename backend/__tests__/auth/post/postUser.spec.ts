import request from "supertest";
import server from "../../../src/server";
import * as utils from "../../../src/utils";

export const users = [
  {
    username: "varunbardwajp",
    password: "$2a$10$ve4POvUXOkZrcU4gUkbJBeIqtGECp9gg4ljC7ssSpvb5EkQWrLs4.",
  },
];

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("responds with status 200", async () => {
    jest.spyOn(utils, "resolveUsers").mockReturnValue(users);
    jest.spyOn(utils, "writeUser").mockReturnValue([]);
    const response = await request(server).post("/api/auth/register").send({
      username: "varunbardwaj",
      password: "Bengaluru@123",
    });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("username");
    expect(response.body).not.toHaveProperty("password");
  });

  it("responds with status 400 on no username", async () => {
    jest.spyOn(utils, "resolveUsers").mockReturnValue(users);
    jest.spyOn(utils, "writeUser").mockReturnValue([]);
    const response = await request(server).post("/api/auth/register").send({
      password: "Bengaluru@123",
    });
    expect(response.status).toEqual(400);
    expect(response.body.errors[0].msg).toEqual(
      "Username should be of 5 or more characters."
    );
  });

  it("responds with status 400 on no password", async () => {
    jest.spyOn(utils, "resolveUsers").mockReturnValue(users);
    jest.spyOn(utils, "writeUser").mockReturnValue([]);
    const response = await request(server).post("/api/auth/register").send({
      username: "varunbardwaj",
    });
    expect(response.status).toEqual(400);
    expect(response.body.errors[0].msg).toEqual(
      "Password should be of length 8 and contain atleast 1 lowercase, uppercase, number and a symbol"
    );
  });

  it("responds with status 400 on existing username", async () => {
    jest.spyOn(utils, "resolveUsers").mockReturnValue(users);
    jest.spyOn(utils, "writeUser").mockReturnValue([]);
    const response = await request(server).post("/api/auth/register").send({
      username: "varunbardwajp",
      password: "Bengaluru@123",
    });
    expect(response.status).toEqual(400);
    expect(response.body.errors[0].msg).toEqual("User already exist.");
  });
});
