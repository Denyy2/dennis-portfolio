"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

const VISIBLE_COUNT = 4;

export default function Projects() {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? projects : projects.slice(0, VISIBLE_COUNT);
  const hiddenCount = projects.length - VISIBLE_COUNT;

  return (
    <Section id="projects" index="04" title="projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-sm font-semibold text-foreground transition-colors hover:border-accent-2"
          >
            {expanded ? "Show less ▲" : `Show ${hiddenCount} more project${hiddenCount === 1 ? "" : "s"} ▾`}
          </button>
        </div>
      )}
    </Section>
  );
}
