// Shared content types. Keeping these in one file means every data file
// (projects, experience, skills…) is type-checked the same way.

export interface Challenge {
  /** The real problem you hit — specific enough to defend in an interview. */
  problem: string;
  /** What you actually did about it, and the result (numbers/timings help). */
  solution: string;
}

export interface Project {
  /** Unique, url-safe id. Used as the React key and for future /projects/[slug] pages. */
  slug: string;
  title: string;
  /** 1-3 sentence description. Written for a recruiter skimming, not a teammate. */
  description: string;
  /** Tech tags shown as pills on the card, e.g. ["Java", "Spring Boot", "MySQL"]. */
  stack: string[];
  category: "java" | "node" | "ai" | "other";
  year: string;
  /** Leave undefined until the repo is public — the card shows "Repo coming soon" instead of a dead link. */
  repoUrl?: string;
  /** Leave undefined if there's no hosted demo. */
  liveUrl?: string;
  featured?: boolean;
  status?: "shipped" | "in-progress";
  /**
   * Real problems you hit building this and how you solved them — only add
   * ones you actually lived through, since this is exactly what an
   * interviewer will ask you to expand on. Omit entirely if none are
   * written up yet; the card just won't show a "Challenges" toggle.
   */
  challenges?: Challenge[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string; // "Present" is fine
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  location?: string;
  start: string;
  end: string;
  detail?: string; // e.g. "CGPA 8.9 / 10"
}

export interface SkillGroup {
  label: string;
  items: string[];
}
