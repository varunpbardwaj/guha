import request from "supertest";
import server from "../../../src/server";
import * as utils from "../../../src/utils";
import { mockPasswords } from "../get/getPasswords.spec";

describe("DELETE /api/passwords", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("responds with status 200", async () => {
    jest.spyOn(utils, "writePasswords").mockReturnValue([]);
    jest.spyOn(utils, "resolvePasswords").mockReturnValue(mockPasswords);
    const response = await request(server).delete("/api/passwords/2");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toEqual(1);
    expect(response.body).toEqual([mockPasswords[0]]);
  });

  it("responds with status 400", async () => {
    jest.spyOn(utils, "writePasswords").mockReturnValue([]);
    jest.spyOn(utils, "resolvePasswords").mockReturnValue(mockPasswords);
    const response = await request(server).delete("/api/passwords/a");
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual("id: a not found");
  });

  it("responds with status 400", async () => {
    jest.spyOn(utils, "writePasswords").mockReturnValue([]);
    jest.spyOn(utils, "resolvePasswords").mockReturnValue(mockPasswords);
    const response = await request(server).delete("/api/passwords/3");
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual("id: 3 not found");
  });
});
