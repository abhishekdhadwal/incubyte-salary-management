const request = require("supertest");
const { createApp } = require("../src/app");

let app;

beforeAll(async () => {
  app = await createApp();
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
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Employee created successfully");
    expect(res.body.data).toMatchObject({
      fullName: "John Doe",
      jobTitle: "Engineer",
      country: "India",
      salary: 50000,
    });
    expect(res.body.data.id).toBeDefined();
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/employees").send({
      fullName: "John Doe",
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation failed");
  });
});
