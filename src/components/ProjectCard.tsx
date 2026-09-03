"use client";

import { useState } from "react";
import type { Project } from "@/data/types";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  java: "Java / Spring",
  node: "Node / Express",
  ai: "AI / Tooling",
  other: "Other",
};

export default function ProjectCard({ project }: { project: Project }) {
  const [showChallenges, setShowChallenges] = useState(false);
  const hasChallenges = !!project.challenges?.length;

  return (
    <div className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:border-accent-2/50 hover:shadow-xl hover:shadow-black/30">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-accent-2">
          {CATEGORY_LABEL[project.category]}
        </span>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>

      <h3 className="font-mono text-base font-semibold text-foreground">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-foreground/80"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4">
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs font-semibold text-accent-2 hover:underline"
          >
            View repo →
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted"
            title="Repo isn't public yet"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-warn" />
            Repo coming soon
          </span>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs font-semibold text-accent hover:underline"
          >
            Live demo →
          </a>
        )}
        {hasChallenges && (
          <button
            type="button"
            onClick={() => setShowChallenges((v) => !v)}
            aria-expanded={showChallenges}
            className="ml-auto font-mono text-xs font-semibold text-muted transition-colors hover:text-foreground"
          >
            Challenges {showChallenges ? "▴" : "▾"}
          </button>
        )}
      </div>

      {hasChallenges && showChallenges && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          {project.challenges!.map((c, i) => (
            <div key={i} className="text-sm leading-relaxed">
              <p className="text-foreground">
                <span className="font-mono text-xs font-semibold text-accent-warn">Problem: </span>
                {c.problem}
              </p>
              <p className="mt-1 text-muted">
                <span className="font-mono text-xs font-semibold text-accent">Solution: </span>
                {c.solution}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
