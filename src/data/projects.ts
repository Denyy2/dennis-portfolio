import type { Project } from "./types";

// ─────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW PROJECT
//
// Add an object to the array below and redeploy (git push — Vercel rebuilds
// automatically). No other file needs to change.
//
//   {
//     slug: "my-new-project",       // unique, url-safe
//     title: "My New Project",
//     description: "What it does and the interesting part of how, in 1-3 sentences.",
//     stack: ["Java", "Spring Boot", "PostgreSQL"],
//     category: "java",             // "java" | "node" | "ai" | "other"
//     year: "2026",
//     repoUrl: "https://github.com/you/repo",   // omit until the repo is public
//     liveUrl: "https://your-demo.vercel.app",  // omit if there's no hosted demo
//     challengesUrl: "https://github.com/you/repo/blob/main/CHALLENGES.md", // optional
//     featured: true,
//     status: "shipped",            // "shipped" | "in-progress"
//   },
//
// Leaving repoUrl/liveUrl out is intentional and supported — the project
// card shows a muted "Repo coming soon" pill instead of a dead link.
//
// For "challenges faced" write-ups: put them in the project's own repo as
// CHALLENGES.md, not inline here — set challengesUrl to link to it. Keeps
// the card scannable and keeps the full story next to the code it's about.
// ─────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: "order-management-system",
    title: "Order Management System",
    description:
      "Production-grade transactional REST APIs with a layered Controller–Service–Repository architecture. Idempotent endpoints prevent duplicate orders on retries, and Spring's transaction management keeps data consistent under concurrent load.",
    stack: ["Java", "Spring Boot", "MySQL", "Docker", "AWS EC2"],
    category: "java",
    year: "2025",
    featured: true,
    status: "shipped",
  },
  {
    slug: "tc-summarization-app",
    title: "T&C Summarization App",
    description:
      "Web app that turns dense terms & conditions into a plain-English summary using the Gemini API. PDFs are read directly where possible and OCR'd via Tesseract when they're scans; images always go through OCR. Per-visitor and daily rate limits keep it running safely on a free-tier API budget. (Live demo runs on Render's free tier — first load can take ~30-60s to wake up.)",
    stack: ["Flask", "Gemini API", "PyMuPDF", "Tesseract OCR", "Docker"],
    category: "ai",
    year: "2026",
    featured: true,
    status: "shipped",
    repoUrl: "https://github.com/Denyy2/tc-summarizer",
    liveUrl: "https://tc-summarizer.onrender.com/",
    challengesUrl: "https://github.com/Denyy2/tc-summarizer/blob/main/CHALLENGES.md",
  },
  {
    slug: "task-manager-api",
    title: "Task Manager API",
    description:
      "REST API for managing tasks, built with Spring Boot — CRUD endpoints, request validation, centralized error handling, seed data, and automated tests. Containerized with Docker and CI-checked on every push via GitHub Actions, with interactive Swagger docs. (Live demo runs on Render's free tier — first load can take ~30-60s to wake up.)",
    stack: ["Java", "Spring Boot", "Spring Data JPA", "Docker", "GitHub Actions", "Swagger / OpenAPI"],
    category: "java",
    year: "2026",
    repoUrl: "https://github.com/Denyy2/task-manager",
    liveUrl: "https://task-manager-efge.onrender.com/swagger-ui/index.html",
    status: "shipped",
  },
  {
    slug: "ecommerce-backend-microservice",
    title: "E-Commerce Backend Microservice",
    description:
      "Backend services for products, cart, and orders with relational schemas and transaction handling. Streamlines order processing and stock validation to keep data consistent under load.",
    stack: ["Node.js", "Express", "MySQL"],
    category: "node",
    year: "2024",
    status: "shipped",
  },
];
