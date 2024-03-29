import request from "supertest";
import server from "../../../src/server";
import * as utils from "../../../src/utils";
import { mockPasswords } from "../../passwords/get/getPasswords.spec";

describe("POST /api/passwords", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("responds with status 201", async () => {
    jest.spyOn(utils, "writePasswords").mockReturnValue([]);
    const postData = {
      username: "example@gmail.com",
      password: "Password@124",
      site_name: "example",
      site_url: "https://www.example.com",
    };
    const response = await request(server)
      .post("/api/passwords")
      .send(postData);
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(201);
    expect(response.body.username).toEqual(postData.username);
    expect(response.body.site_name).toEqual(postData.site_name);
    expect(response.body.site_url).toEqual(postData.site_url);
  });

  it("responds with status 400", async () => {
    jest.spyOn(utils, "writePasswords").mockReturnValue([]);
    const response = await request(server).post("/api/passwords").send({
      username: "example@gmail.com",
      password: "Password@124",
      site_name: "example",
    });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors[0].msg).toEqual(
      "Invalid Request. Please provide valid site url"
    );
  });
});
