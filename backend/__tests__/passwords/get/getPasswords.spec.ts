import request from "supertest";
import server from "../../../src/server";
import * as utils from "../../../src/utils";

export const mockPasswords = [
  {
    id: 1,
    username: "example1@gmail.com",
    password: "U2FsdGVkX195/edtHvX7WHOR3Kl24ljHRBsqO732eUU=",
    site_name: "example1",
    site_url: "https://www.example1.com",
  },
  {
    id: 2,
    username: "example2@gmail.com",
    password: "U2FsdGVkX195/edtHvX7WHOR3Kl24ljHRBsqO732eUU=",
    site_name: "example2",
    site_url: "https://www.example2.com",
  },
];

describe("GET /api/passwords", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("responds with JSON containing passwords", async () => {
    jest.spyOn(utils, "resolvePasswords").mockReturnValue(mockPasswords);

    const response = await request(server).get("/api/passwords");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(mockPasswords);
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
