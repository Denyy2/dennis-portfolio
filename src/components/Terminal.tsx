"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { site } from "@/data/site";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { projects } from "@/data/projects";

type Line = { kind: "cmd" | "out" | "blank"; text?: string; tone?: "accent" | "muted" };

const CHAR_DELAY = 26;
const CMD_END_PAUSE = 200;
const LINE_PAUSE = 320;

const introScript: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: `${site.name} — ${site.role}`, tone: "accent" },
  { kind: "blank" },
  { kind: "cmd", text: "cat focus.txt" },
  { kind: "out", text: "Transactional APIs · Auth & RBAC · Query & schema design" },
  { kind: "blank" },
  { kind: "cmd", text: "location --current" },
  { kind: "out", text: site.location },
  { kind: "blank" },
  { kind: "out", text: "Type 'help' to see what this terminal can do.", tone: "accent" },
];

const srSummary = `${site.name} — ${site.role}. Focus areas: transactional APIs, auth and RBAC, query and schema design. Location: ${site.location}. This is an interactive terminal — type help for a list of commands.`;

const COMMAND_LIST = [
  "help",
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
  "resume",
  "github",
  "linkedin",
  "clear",
  "whoami",
  "ls",
];

function out(text: string, tone?: "accent" | "muted"): Line {
  return { kind: "out", text, tone };
}
const blank: Line = { kind: "blank" };

function runCommand(raw: string): { lines: Line[]; clear?: boolean } {
  const cmd = raw.trim().toLowerCase();
  if (cmd === "") return { lines: [] };

  switch (cmd) {
    case "help":
      return {
        lines: [
          out("Available commands:", "accent"),
          out("  help        show this list"),
          out("  about       who I am"),
          out("  skills      technical skills"),
          out("  experience  work history"),
          out("  projects    things I've built"),
          out("  education   academic background"),
          out("  contact     how to reach me"),
          out("  resume      open résumé PDF"),
          out("  github      open GitHub profile"),
          out("  linkedin    open LinkedIn profile"),
          out("  clear       clear the terminal"),
        ],
      };

    case "about":
      return { lines: [out(site.bio)] };

    case "whoami":
      return { lines: [out(`${site.name} — ${site.role}`, "accent")] };

    case "skills":
      return {
        lines: skills.flatMap((group) => [out(`${group.label}:`, "accent"), out(`  ${group.items.join(", ")}`), blank]),
      };

    case "experience":
      return {
        lines: experience.flatMap((job) => [
          out(`${job.company} — ${job.role}`, "accent"),
          out(`  ${job.start} – ${job.end}${job.location ? ` · ${job.location}` : ""}`),
          ...job.bullets.map((b) => out(`  → ${b}`)),
          blank,
        ]),
      };

    case "projects":
      return {
        lines: projects.flatMap((p, i) => [
          out(`${i + 1}. ${p.title} — ${p.stack.join(", ")}`, "accent"),
          out(`   ${p.description}`),
          out(`   repo: ${p.repoUrl ?? "coming soon"}`),
          ...(p.liveUrl ? [out(`   live: ${p.liveUrl}`)] : []),
          blank,
        ]),
      };

    case "education":
      return {
        lines: education.flatMap((e) => [
          out(e.degree, "accent"),
          out(`  ${e.school}${e.location ? `, ${e.location}` : ""}`),
          out(`  ${e.start ? `${e.start} – ${e.end}` : e.end}${e.detail ? ` · ${e.detail}` : ""}`),
          blank,
        ]),
      };

    case "contact":
      return {
        lines: [
          out(`email     ${site.email}`),
          out(`phone     ${site.phone}`),
          out(`linkedin  ${site.linkedin}`),
          ...(site.github ? [out(`github    ${site.github}`)] : []),
        ],
      };

    case "resume":
      if (!site.resumeUrl) return { lines: [out("No résumé linked yet.", "muted")] };
      if (typeof window !== "undefined") window.open(site.resumeUrl, "_blank", "noopener,noreferrer");
      return { lines: [out("Opening résumé in a new tab…", "accent")] };

    case "github":
      if (!site.github) return { lines: [out("GitHub link isn't set yet.", "muted")] };
      if (typeof window !== "undefined") window.open(site.github, "_blank", "noopener,noreferrer");
      return { lines: [out("Opening GitHub profile in a new tab…", "accent")] };

    case "linkedin":
      if (typeof window !== "undefined") window.open(site.linkedin, "_blank", "noopener,noreferrer");
      return { lines: [out("Opening LinkedIn profile in a new tab…", "accent")] };

    case "ls":
      return { lines: [out("about  skills  experience  projects  education  contact")] };

    case "clear":
      return { lines: [], clear: true };

    case "sudo":
      return { lines: [out("Nice try — you don't have root here. Try 'contact' to reach me instead.", "muted")] };

    default:
      return { lines: [out(`command not found: ${cmd}. Type 'help' for a list of commands.`, "muted")] };
  }
}

export default function Terminal() {
  const [history, setHistory] = useState<(Line & { id: number })[]>([]);
  const [phase, setPhase] = useState<"intro" | "ready">("intro");
  const [typing, setTyping] = useState<{ text: string; chars: number } | null>(null);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);

  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const skippedRef = useRef(false);

  const push = (lines: Line[]) => {
    setHistory((h) => [...h, ...lines.map((l) => ({ ...l, id: idRef.current++ }))]);
  };

  // Plays the intro script once, then hands off to the interactive prompt.
  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const t = setTimeout(() => {
        push(introScript);
        setPhase("ready");
      }, 0);
      return () => clearTimeout(t);
    }

    let cancelled = false;
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(() => !cancelled && fn(), ms);
      timers.push(t);
    };

    function step() {
      if (cancelled || skippedRef.current || i >= introScript.length) {
        if (!cancelled) setPhase("ready");
        return;
      }
      const line = introScript[i];
      if (line.kind === "cmd") {
        let c = 0;
        const tick = () => {
          c++;
          setTyping({ text: line.text!, chars: c });
          if (c < line.text!.length) {
            schedule(tick, CHAR_DELAY);
          } else {
            schedule(() => {
              setTyping(null);
              push([line]);
              i++;
              schedule(step, CMD_END_PAUSE);
            }, 100);
          }
        };
        schedule(tick, CHAR_DELAY);
      } else {
        schedule(() => {
          push([line]);
          i++;
          schedule(step, LINE_PAUSE);
        }, 40);
      }
    }

    schedule(step, 300);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  // Auto-scroll to the latest line.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, typing]);

  useEffect(() => {
    if (phase === "ready") inputRef.current?.focus();
  }, [phase]);

  function skipIntro() {
    if (phase === "ready" || skippedRef.current) return;
    skippedRef.current = true;
    setTyping(null);
    setHistory((h) => {
      const shown = h.length;
      const remaining = introScript.slice(shown).map((l) => ({ ...l, id: idRef.current++ }));
      return [...h, ...remaining];
    });
    setPhase("ready");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const raw = input;
    setInput("");
    setLogIndex(null);
    if (raw.trim() !== "") setCmdLog((log) => [...log, raw]);

    push([{ kind: "cmd", text: raw }]);
    const { lines, clear } = runCommand(raw);
    if (clear) {
      setHistory([]);
      return;
    }
    if (lines.length) push(lines);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const nextIndex = logIndex === null ? cmdLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(nextIndex);
      setInput(cmdLog[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (logIndex === null) return;
      const nextIndex = logIndex + 1;
      if (nextIndex >= cmdLog.length) {
        setLogIndex(null);
        setInput("");
      } else {
        setLogIndex(nextIndex);
        setInput(cmdLog[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMAND_LIST.find((c) => c.startsWith(input.toLowerCase()) && input.length > 0);
      if (match) setInput(match);
    }
  }

  return (
    <div>
      <span className="sr-only">{srSummary}</span>
      <div
        onClick={() => (phase === "intro" ? skipIntro() : inputRef.current?.focus())}
        className="cursor-text"
      >
        <div
          ref={scrollRef}
          aria-live="polite"
          className="max-h-80 overflow-y-auto whitespace-pre-wrap break-words font-mono text-sm leading-relaxed sm:max-h-96"
        >
          {history.map((line) => (
            <LineOut key={line.id} line={line} />
          ))}
          {typing && (
            <div>
              <span className="text-accent">$</span> {typing.text.slice(0, typing.chars)}
              <span className="animate-pulse text-accent">▍</span>
            </div>
          )}
        </div>

        {phase === "intro" && (
          <p className="mt-1 font-mono text-[11px] text-muted/70">(click to skip)</p>
        )}

        {phase === "ready" && (
          <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-2">
            <span className="text-accent">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Terminal command input — type help for a list of commands"
              className="caret-accent flex-1 bg-transparent font-mono text-sm text-foreground outline-none"
            />
          </form>
        )}
      </div>
    </div>
  );
}

function LineOut({ line }: { line: Line }) {
  if (line.kind === "blank") return <div>&nbsp;</div>;
  if (line.kind === "cmd") {
    return (
      <div>
        <span className="text-accent">$</span> {line.text}
      </div>
    );
  }
  return <div className={line.tone === "accent" ? "text-accent-2" : "text-muted"}>{line.text}</div>;
}
