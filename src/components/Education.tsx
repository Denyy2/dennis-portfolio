import { education } from "@/data/education";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <Section id="education" index="05" title="education">
      <div className="space-y-4">
        {education.map((entry) => (
          <Reveal key={entry.degree}>
            <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border bg-surface p-6">
              <div>
                <h3 className="font-mono text-base font-semibold">
                  {entry.degree}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {entry.school}
                  {entry.location ? `, ${entry.location}` : ""}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                  {entry.start ? `${entry.start} – ${entry.end}` : entry.end}
                </span>
                {entry.detail && (
                  <span className="font-mono text-xs text-accent-warn">
                    {entry.detail}
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
