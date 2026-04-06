const request = require("supertest");
const { createApp } = require("../src/app");

let app;

beforeAll(async () => {
  app = await createApp();
});

describe("GET /salary/:id", () => {
  it("should calculate 10% TDS for India", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Raj Kumar",
      jobTitle: "Developer",
      country: "India",
      salary: 100000,
    });

    const res = await request(app).get(`/salary/${created.body.data.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.gross).toBe(100000);
    expect(res.body.data.tds).toBe(10000);
    expect(res.body.data.net).toBe(90000);
  });

  it("should calculate 12% TDS for United States", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "John Smith",
      jobTitle: "Manager",
      country: "United States",
      salary: 100000,
    });

    const res = await request(app).get(`/salary/${created.body.data.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.gross).toBe(100000);
    expect(res.body.data.tds).toBe(12000);
    expect(res.body.data.net).toBe(88000);
  });

  it("should have no deductions for other countries", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Hans Müller",
      jobTitle: "Engineer",
      country: "Germany",
      salary: 100000,
    });

    const res = await request(app).get(`/salary/${created.body.data.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.gross).toBe(100000);
    expect(res.body.data.tds).toBe(0);
    expect(res.body.data.net).toBe(100000);
  });

  it("should return 404 if employee not found", async () => {
    const res = await request(app).get("/salary/99999");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Employee not found");
  });
});
