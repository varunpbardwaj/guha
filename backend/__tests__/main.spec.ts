import server from "../src/server";
import request from "supertest";

describe("GET responds with status 200", () => {
  it("hello world `/`", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.statusCode).not.toEqual(400);
    expect(res.statusCode).not.toEqual(500);
  });
});
