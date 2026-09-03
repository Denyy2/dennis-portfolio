// Shared content types. Keeping these in one file means every data file
// (projects, experience, skills…) is type-checked the same way.

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
   * Link to a CHALLENGES.md (or a README section) in the project's repo,
   * documenting real problems hit and how they were solved. Full write-ups
   * live in the repo, not on the card — this is just a pointer. Omit until
   * that file exists; the card just won't show a "Challenges" link.
   */
  challengesUrl?: string;
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
