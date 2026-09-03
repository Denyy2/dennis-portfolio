// Site-wide identity & contact info. Edit this file to update anything
// that appears in the nav, hero, or contact section.

export const site = {
  name: "Dennis E Abraham",
  initials: "DA",
  role: "Backend Engineer",
  // Rotates in the hero. Keep it honest — these are titles you can defend in an interview.
  roles: [
    "Backend Engineer",
    "Java / Spring Boot Developer",
    "Node.js / Express Developer",
    "Full-Stack Capable",
  ],
  tagline:
    "I build backend systems that stay correct under concurrency — and this site is built full-stack to prove I can ship the other half too.",
  bio: "Backend engineer at TCS with 1.5+ years shipping production APIs across two stacks — Java/Spring Boot for airline booking & loyalty systems, and Node.js/Express for task-management and e-commerce services. I care about transactional consistency, clean API design, and systems that don't break under retries.",
  location: "Kerala, India",
  email: "dennisabraham651@gmail.com",
  phone: "+91 8178 265 370",
  phoneHref: "+918178265370",
  linkedin: "https://linkedin.com/in/dennis-e-abraham212",
  linkedinLabel: "dennis-e-abraham212",
  // TODO(Dennis): add your GitHub profile URL — the nav/contact links stay hidden until this is set.
  github: "",
  githubLabel: "",
  // TODO(Dennis): drop a resume PDF into /public/resume.pdf and set this to "/resume.pdf".
  resumeUrl: "",
  availability: "Open to new opportunities",
} as const;
