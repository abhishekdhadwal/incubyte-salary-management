const request = require("supertest");
const { createApp } = require("../src/app");
const Employee = require("../src/models/Employee");

let app;

beforeAll(async () => {
  app = await createApp();

  await Employee.destroy({ truncate: true });
  await request(app)
    .post("/employees")
    .send({
      fullName: "Alice",
      jobTitle: "Engineer",
      country: "India",
      salary: 50000,
    });
  await request(app)
    .post("/employees")
    .send({
      fullName: "Bob",
      jobTitle: "Engineer",
      country: "India",
      salary: 70000,
    });
  await request(app)
    .post("/employees")
    .send({
      fullName: "Carol",
      jobTitle: "Manager",
      country: "India",
      salary: 90000,
    });
  await request(app)
    .post("/employees")
    .send({
      fullName: "Dave",
      jobTitle: "Engineer",
      country: "United States",
      salary: 120000,
    });
});

describe("GET /metrics", () => {
  it("should return min, max and average salary for a country", async () => {
    const res = await request(app).get("/metrics?country=India");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.min).toBe(50000);
    expect(res.body.data.max).toBe(90000);
    expect(res.body.data.average).toBeCloseTo(70000);
  });

  it("should return average salary for a job title", async () => {
    const res = await request(app).get("/metrics?jobTitle=Engineer");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.average).toBeCloseTo(80000);
  });

  it("should return 400 if neither country nor jobTitle is provided", async () => {
    const res = await request(app).get("/metrics");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 404 if no employees found for country", async () => {
    const res = await request(app).get("/metrics?country=Antarctica");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("should return 404 if no employees found for job title", async () => {
    const res = await request(app).get("/metrics?jobTitle=Astronaut");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
