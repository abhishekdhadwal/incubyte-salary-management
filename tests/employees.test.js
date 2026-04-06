const request = require("supertest");
const { createApp } = require("../src/app");

let app;

beforeAll(() => {
  app = createApp();
});

describe("POST /employees", () => {
  it("should create a new employee", async () => {
    const res = await request(app).post("/employees").send({
      fullName: "John Doe",
      jobTitle: "Engineer",
      country: "India",
      salary: 50000,
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      fullName: "John Doe",
      jobTitle: "Engineer",
      country: "India",
      salary: 50000,
    });
    expect(res.body.id).toBeDefined();
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/employees").send({
      fullName: "John Doe",
    });

    expect(res.status).toBe(400);
  });
});
