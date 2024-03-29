import request from "supertest";
import server from "../../../src/server";
import * as utils from "../../../src/utils";
import { mockPasswords } from "../get/getPasswords.spec";

describe("PUT /api/passwords", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("responds with status 200", async () => {
    jest.spyOn(utils, "writePasswords").mockReturnValue([]);
    const putData = {
      username: "example2@gmail.com",
      password: "Password2@124",
      site_name: "example2",
      site_url: "https://www.example2.com",
    };
    jest.spyOn(utils, "resolvePasswords").mockReturnValue(mockPasswords);
    const response = await request(server)
      .put("/api/passwords/1")
      .send(putData);
    expect(response.status).toBe(200);
    expect(typeof response.body === "object").toBe(true);
    expect(response.body.username).toEqual(putData.username);
    expect(response.body.site_name).toEqual(putData.site_name);
    expect(response.body.site_url).toEqual(putData.site_url);
  });

  it("responds with status 400", async () => {
    jest.spyOn(utils, "writePasswords").mockReturnValue([]);
    const response = await request(server).put("/api/passwords/1").send({
      username: "example@gmail.com",
      password: "Password@124",
      site_url: "https://example.com",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors[0].msg).toEqual(
      "Invalid Request. Please provide valid site name"
    );
  });

  it("responds with status 400", async () => {
    jest.spyOn(utils, "writePasswords").mockReturnValue([]);
    jest.spyOn(utils, "resolvePasswords").mockReturnValue(mockPasswords);
    const response = await request(server).put("/api/passwords/-1").send({
      username: "example@gmail.com",
      password: "Password@124",
      site_name: "example",
      site_url: "https://example.com",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toEqual("Bad Request. Invalid id: -1");
  });
});
