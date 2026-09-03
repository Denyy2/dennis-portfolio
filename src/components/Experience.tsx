import { experience } from "@/data/experience";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <Section id="experience" index="03" title="experience">
      <div className="space-y-6">
        {experience.map((job) => (
          <Reveal key={job.company}>
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-lg font-semibold">{job.company}</h3>
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                  {job.start} – {job.end}
                </span>
              </div>
              <p className="mt-1 font-mono text-sm text-accent-2">
                {job.role}
                {job.location ? ` · ${job.location}` : ""}
              </p>
              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-0.5 text-accent">→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
