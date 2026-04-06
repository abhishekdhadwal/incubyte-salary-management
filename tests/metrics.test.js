const request = require("supertest");
const { createApp } = require("../src/app");

let app;

beforeAll(async () => {
  app = await createApp();

  // seed data
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

describe("GET /metrics/country/:country", () => {
  it("should return min, max and average salary for a country", async () => {
    const res = await request(app).get("/metrics/country/India");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.min).toBe(50000);
    expect(res.body.data.max).toBe(90000);
    expect(res.body.data.average).toBeCloseTo(70000);
  });

  it("should return 404 if no employees found for country", async () => {
    const res = await request(app).get("/metrics/country/Antarctica");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe("GET /metrics/job-title/:jobTitle", () => {
  it("should return average salary for a job title", async () => {
    const res = await request(app).get("/metrics/job-title/Engineer");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.average).toBeCloseTo(80000);
  });

  it("should return 404 if no employees found for job title", async () => {
    const res = await request(app).get("/metrics/job-title/Astronaut");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
