import type { ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Backend Developer",
    location: "India",
    start: "Aug 2024",
    end: "Present",
    bullets: [
      "Built and maintained backend services across two stacks — Java/Spring Boot for airline booking & loyalty systems, and Node.js/Express for task-management and e-commerce microservices.",
      "Owned loyalty module features: member profiles, points accrual, tier status management, and eligibility validation.",
      "Designed RESTful APIs and modular middleware, securing endpoints with JWT authentication and role-based access control (RBAC).",
      "Designed and optimized MySQL schemas for passenger, booking, loyalty, user, product, and order data.",
      "Improved API latency by 15–20% in high-traffic workflows through query optimization and caching strategies.",
      "Implemented idempotent integration between booking and loyalty systems to handle retries and partial failures safely.",
      "Built asynchronous services with validation, centralized error handling, and structured logging for reliability.",
      "Collaborated with frontend and QA teams to deliver, test, and deploy functional endpoints across dev and staging environments.",
    ],
  },
];
