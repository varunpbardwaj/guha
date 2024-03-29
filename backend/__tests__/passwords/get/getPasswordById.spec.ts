import request from "supertest";
import server from "../../../src/server";
import * as utils from "../../../src/utils";
import { mockPasswords } from "./getPasswords.spec";

describe("GET /api/passwords", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("responds with JSON containing passwords", async () => {
    jest.spyOn(utils, "resolvePasswords").mockReturnValue(mockPasswords);

    const response = await request(server).get("/api/passwords/1");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual([mockPasswords[0]]);
  });

  it("responds with 500 status if an error occurs", async () => {
    jest.spyOn(utils, "resolvePasswords").mockImplementation(() => {
      throw new Error();
    });

    const response = await request(server).get("/api/passwords");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ errors: {} });
  });
});
