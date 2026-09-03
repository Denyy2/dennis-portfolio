import { site } from "@/data/site";
import Section from "./Section";
import Reveal from "./Reveal";

const contacts = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
  },
  {
    label: "LinkedIn",
    value: site.linkedinLabel,
    href: site.linkedin,
  },
  // Only rendered once site.github is set in src/data/site.ts
  ...(site.github
    ? [{ label: "GitHub", value: site.githubLabel || site.github, href: site.github }]
    : []),
];

export default function Contact() {
  return (
    <Section id="contact" index="06" title="contact">
      <Reveal>
        <p className="mb-8 max-w-xl text-muted">
          Open to backend and full-stack roles. The fastest way to reach me is email —
          happy to walk through any of the projects above in more depth.
        </p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map((c, i) => (
          <Reveal key={c.label} delay={i * 60}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent-2/50"
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-accent-2">
                  {c.label}
                </div>
                <div className="mt-1 text-sm text-foreground">{c.value}</div>
              </div>
              <span className="font-mono text-accent">→</span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
