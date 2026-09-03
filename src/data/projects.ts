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
//     featured: true,
//     status: "shipped",            // "shipped" | "in-progress"
//   },
//
// Leaving repoUrl/liveUrl out is intentional and supported — the project
// card shows a muted "Repo coming soon" pill instead of a dead link.
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
      "Web app that distills dense terms & conditions using the OpenAI API. An OCR pipeline extracts text from PDFs and images, and a clean REST API handles upload and summary generation.",
    stack: ["Python", "OpenAI API", "OCR", "REST APIs"],
    category: "ai",
    year: "2025",
    featured: true,
    status: "shipped",
  },
  {
    slug: "secure-task-management-api",
    title: "Secure Task Management API",
    description:
      "RESTful backend with JWT authentication and role-based access control for secure task management. Built for efficient task tracking and filtering, with modularity for frontend integration.",
    stack: ["Node.js", "Express", "MySQL", "JWT"],
    category: "node",
    year: "2024",
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
