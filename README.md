# Dennis E Abraham — Portfolio

**Live:** [dennis-portfolio-ten.vercel.app](https://dennis-portfolio-ten.vercel.app/)

A full-stack developer portfolio with a terminal/dev-themed UI — including an actually interactive
terminal in the hero (type `help`).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS 4 · deployed on Vercel

## Adding a new project

All content lives in `src/data/*.ts` — no markup changes needed. To add a project, add an entry to
`src/data/projects.ts`:

```ts
{
  slug: "my-new-project",
  title: "My New Project",
  description: "What it does and the interesting part of how, in 1-3 sentences.",
  stack: ["Java", "Spring Boot", "PostgreSQL"],
  category: "java",       // "java" | "node" | "ai" | "other"
  year: "2026",
  repoUrl: "https://github.com/you/repo",   // omit until the repo is public
  liveUrl: "https://your-demo.vercel.app",  // omit if there's no hosted demo
  status: "shipped",      // "shipped" | "in-progress"
},
```

Commit and push — Vercel redeploys automatically. Leaving `repoUrl`/`liveUrl` out is supported: the
project card shows a "Repo coming soon" pill instead of a dead link. The site shows the first 4
projects in full; a 5th+ project reveals behind a "Show more" toggle.

Other editable data files: `site.ts` (identity/contact), `skills.ts`, `experience.ts`, `education.ts`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
