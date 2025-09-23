const request = require("supertest");
const app = require("../src/app");

describe("Simple API Test", () => {
  it("GET /items should return empty array", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /items should add item", async () => {
    const res = await request(app).post("/items").send({ name: "Coffee" });
    expect(res.statusCode).toBe(201);
    expect(res.body.items).toContain("Coffee");
  });
});
