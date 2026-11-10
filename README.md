# GCP End-to-End Counter Application

Full-stack cloud-native counter application built with **Spring Boot (Java 17)** and **React 18 + Redux Toolkit**, designed for containerization and automated CI/CD deployment to **Google Cloud Run** via **GitHub Actions**.

## Repository Structure

```text
.
├── backend/          # M1: Spring Boot REST API
├── frontend/         # M2: React 18 + Redux Toolkit Dashboard
├── .gitignore
└── README.md
```

## Milestone Progress

- **M1 – Backend Foundation**: Spring Boot 3.2 REST API (`GET /api/counter`, `POST /api/counter/increment`, `POST /api/counter/decrement`, `POST /api/counter/reset`) with in-memory `AtomicInteger` state and automated tests.
- **M2 – Frontend Dashboard**: React 18 + Redux Toolkit + Axios dashboard consuming `REACT_APP_API_URL` (defaulting to `http://localhost:8080/api/counter`).

## Local Development

### Backend (M1)

```bash
cd backend
mvn clean verify
mvn spring-boot:run
```

The API runs on `http://localhost:8080` by default (configurable via `PORT`).

#### Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/counter` | Get current counter value |
| `POST` | `/api/counter/increment` | Increment counter by 1 |
| `POST` | `/api/counter/decrement` | Decrement counter by 1 |
| `POST` | `/api/counter/reset` | Reset counter to 0 |

### Frontend (M2)

```bash
cd frontend
npm install
npm start
```

The UI runs on `http://localhost:3000`. Configure `REACT_APP_API_URL` in a local `.env` file (never committed) to point to a non-default API endpoint.

