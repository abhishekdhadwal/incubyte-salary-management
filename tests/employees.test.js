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

describe("GET /employees", () => {
  it("should return all employees", async () => {
    const res = await request(app).get("/employees");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe("GET /employees/:id", () => {
  it("should return a single employee", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Jane Doe",
      jobTitle: "Designer",
      country: "United States",
      salary: 60000,
    });

    const res = await request(app).get(`/employees/${created.body.data.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.fullName).toBe("Jane Doe");
  });

  it("should return 404 if employee not found", async () => {
    const res = await request(app).get("/employees/99999");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe("PUT /employees/:id", () => {
  it("should update an existing employee", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "Bob Smith",
      jobTitle: "Manager",
      country: "India",
      salary: 70000,
    });

    const res = await request(app)
      .put(`/employees/${created.body.data.id}`)
      .send({
        fullName: "Bob Smith",
        jobTitle: "Senior Manager",
        country: "India",
        salary: 80000,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.jobTitle).toBe("Senior Manager");
    expect(res.body.data.salary).toBe(80000);
  });

  it("should return 404 if employee not found", async () => {
    const res = await request(app).put("/employees/99999").send({
      fullName: "Ghost",
      jobTitle: "Nobody",
      country: "India",
      salary: 1000,
    });

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

describe("DELETE /employees/:id", () => {
  it("should delete an existing employee", async () => {
    const created = await request(app).post("/employees").send({
      fullName: "To Delete",
      jobTitle: "Temp",
      country: "India",
      salary: 30000,
    });

    const res = await request(app).delete(`/employees/${created.body.data.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Employee deleted successfully");
  });

  it("should return 404 if employee not found", async () => {
    const res = await request(app).delete("/employees/99999");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
