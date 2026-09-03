import type { ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Backend Developer",
    location: "India",
    start: "Aug 2024",
    end: "Present",
    bullets: [
      "Developed and maintained microservice-based backend services for airline booking and loyalty workflows using Java and Spring Boot, ensuring transactional consistency under concurrent requests.",
      "Owned loyalty module features: member profiles, points accrual, tier status management, and eligibility validation.",
      "Designed RESTful APIs and modular middleware, securing endpoints with JWT authentication and role-based access control (RBAC).",
      "Designed and optimized MySQL schemas for passenger, booking, loyalty, user, product, and order data.",
      "Improved API latency by 15–20% in high-traffic workflows through query optimization and caching strategies.",
      "Implemented idempotent integration between booking and loyalty systems to handle retries and partial failures safely, reducing duplicate transaction errors by 20%.",
      "Built asynchronous services with validation, centralized error handling, and structured logging for reliability.",
      "Collaborated with frontend and QA teams to deliver, test, and deploy functional endpoints across dev and staging environments.",
    ],
  },
];
