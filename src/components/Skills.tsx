import { skills } from "@/data/skills";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Section id="skills" index="02" title="skills">
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={i * 60}>
            <div className="rounded-xl border border-border bg-surface p-5">
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-2">
                {group.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
