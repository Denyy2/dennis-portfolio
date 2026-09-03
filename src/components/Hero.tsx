import { site } from "@/data/site";
import TerminalWindow from "./TerminalWindow";
import TerminalScript, { type ScriptLine } from "./TerminalScript";
import TypedRole from "./TypedRole";

const terminalScript: ScriptLine[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: `${site.name} — ${site.role}`, tone: "accent" },
  { kind: "blank" },
  { kind: "cmd", text: "cat focus.txt" },
  { kind: "out", text: "Transactional APIs · Auth & RBAC · Query & schema design" },
  { kind: "blank" },
  { kind: "cmd", text: "location --current" },
  { kind: "out", text: site.location },
];

const terminalSrSummary = `${site.name} — ${site.role}. Focus areas: transactional APIs, auth and RBAC, query and schema design. Location: ${site.location}.`;

export default function Hero() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 pb-16 pt-14 sm:px-8 sm:pt-24 scroll-mt-20">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        {site.availability}
      </div>

      <h1 className="max-w-3xl font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-3 h-8 font-mono text-lg sm:text-xl">
        <TypedRole roles={site.roles} />
      </p>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {site.bio}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-[#05130a] transition-transform hover:-translate-y-0.5"
        >
          View projects
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-sm font-semibold text-foreground transition-colors hover:border-accent-2"
        >
          Get in touch
        </a>
        {site.resumeUrl && (
          <a
            href={site.resumeUrl}
            download
            className="rounded-lg border border-border px-5 py-2.5 font-mono text-sm font-semibold text-muted transition-colors hover:border-accent-2 hover:text-foreground"
          >
            Download résumé ↓
          </a>
        )}
      </div>

      <TerminalWindow title="whoami.sh" className="mt-14 shadow-2xl shadow-black/40">
        <TerminalScript lines={terminalScript} srSummary={terminalSrSummary} />
      </TerminalWindow>
    </section>
  );
}
