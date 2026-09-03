import type { SkillGroup } from "./types";

// Grouped as tags rather than arbitrary "92%" bars — those numbers aren't
// verifiable and read as filler to most reviewers. A recruiter/hiring
// manager can scan a tag list just as fast, and it doesn't overclaim.
export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Java", "JavaScript (Node.js)", "Python", "SQL", "C++"],
  },
  {
    label: "Backend",
    items: ["Spring Boot", "Express.js", "Node.js", "Hibernate / JPA"],
  },
  {
    label: "Databases",
    items: ["MySQL"],
  },
  {
    label: "API & Security",
    items: ["REST API Design", "JWT Authentication", "RBAC", "Middleware"],
  },
  {
    label: "DevOps & Tools",
    items: ["Docker", "AWS EC2", "AWS S3", "Git", "Linux", "Postman", "Maven"],
  },
  {
    label: "Testing",
    items: ["JUnit"],
  },
];
