# Incubyte Salary Management API

A RESTful API for managing employee records and salary calculations, built with Node.js, Express, and SQLite.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Sequelize
- **Database:** SQLite
- **Validation:** express-validator
- **Testing:** Jest + Supertest

## Project Structure

```
src/
├── config/
│   ├── db.js           # Sequelize connection
│   └── constants.js    # TDS rates
├── controllers/        # Request/response handling
├── middleware/         # validate.js
├── models/             # Sequelize models
├── routes/             # Route definitions
├── services/           # Business logic
├── utils/              # Response handler
└── validators/         # express-validator rules
tests/                  # Jest test suites
index.js                # Entry point
```

## Getting Started

```bash
# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

**.env variables:**

```
PORT=3000
DB_PATH=./salary.db
```

```bash
# Start server
npm start
```

Server runs on `http://localhost:3000` by default.

## Running Tests

```bash
npm test
```

## API Endpoints

### Employees

| Method | Endpoint                       | Description                |
| ------ | ------------------------------ | -------------------------- |
| GET    | `/employees?limit=10&offset=0` | List employees (paginated) |
| GET    | `/employees/:id`               | Get employee by ID         |
| POST   | `/employees`                   | Create employee            |
| PUT    | `/employees/:id`               | Update employee            |
| DELETE | `/employees/:id`               | Delete employee            |

**Employee payload:**

```json
{
  "fullName": "John Doe",
  "jobTitle": "Engineer",
  "country": "India",
  "salary": 50000
}
```

### Salary Calculation

| Method | Endpoint      | Description                       |
| ------ | ------------- | --------------------------------- |
| GET    | `/salary/:id` | Calculate net salary for employee |

**Response:**

```json
{
  "success": true,
  "data": {
    "gross": 100000,
    "tds": 10000,
    "net": 90000,
    "country": "India"
  }
}
```

**Deduction Rules:**

- India: 10% TDS
- United States: 12% TDS
- All other countries: No deductions

### Salary Metrics

| Method | Endpoint                     | Description                         |
| ------ | ---------------------------- | ----------------------------------- |
| GET    | `/metrics?country=India`     | Min, max, average salary by country |
| GET    | `/metrics?jobTitle=Engineer` | Average salary by job title         |

## Implementation Details

### AI Usage

Tool used: Kiro AI

How it was used:

- Scaffolding the initial project structure (Express app, Sequelize config, folder layout)
- Generating failing test cases for each TDD cycle (red phase)
- Implementing service, controller, and route code to make tests pass (green phase)
- Suggesting patterns like `express-validator`, centralized response handler, and separation of concerns across routes/controllers/services/validators

Rationale: The goal was to move fast without sacrificing quality. AI helped eliminate boilerplate and kept the focus on design decisions — like using a single `/metrics` endpoint with optional query params instead of two separate routes, moving validation logic into dedicated validator files, and keeping controllers thin. Every suggestion was reviewed, questioned, and adjusted before committing.
