"use client";

import { useEffect, useRef, useState } from "react";

export type ScriptLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "accent" | "muted" }
  | { kind: "blank" };

const CHAR_DELAY = 28; // ms per typed character
const CMD_END_PAUSE = 220; // pause after a command finishes typing
const LINE_PAUSE = 420; // pause after an output line reveals

/** Plays a scripted terminal session: commands type themselves out, output appears after. */
export default function TerminalScript({
  lines,
  srSummary,
}: {
  lines: ScriptLine[];
  srSummary: string;
}) {
  const [revealed, setRevealed] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [finished, setFinished] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const t = setTimeout(() => {
        setRevealed(lines.length);
        setFinished(true);
      }, 0);
      return () => clearTimeout(t);
    }

    let cancelled = false;
    let lineIndex = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(() => !cancelled && fn(), ms);
      timers.push(t);
    };

    function runLine() {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setFinished(true);
        return;
      }
      const line = lines[lineIndex];

      if (line.kind === "cmd") {
        let char = 0;
        const typeTick = () => {
          char++;
          setTypedChars(char);
          if (char < line.text.length) {
            schedule(typeTick, CHAR_DELAY);
          } else {
            schedule(() => {
              setRevealed((r) => r + 1);
              setTypedChars(0);
              lineIndex++;
              schedule(runLine, CMD_END_PAUSE);
            }, 120);
          }
        };
        schedule(typeTick, CHAR_DELAY);
      } else {
        schedule(() => {
          setRevealed((r) => r + 1);
          lineIndex++;
          schedule(runLine, LINE_PAUSE);
        }, 60);
      }
    }

    schedule(runLine, 300);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [lines]);

  const activeLine = lines[revealed];

  return (
    <div>
      {/* Screen-reader users get the final content immediately, without waiting on the animation. */}
      <span className="sr-only">{srSummary}</span>
      <pre
        aria-hidden="true"
        className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm leading-relaxed"
      >
        <code>
          {lines.slice(0, revealed).map((line, i) => (
            <LineOut key={i} line={line} />
          ))}
          {!finished && activeLine?.kind === "cmd" && (
            <>
              <span className="text-accent">$</span>{" "}
              {activeLine.text.slice(0, typedChars)}
              <span className="text-accent animate-pulse">▍</span>
              {"\n"}
            </>
          )}
          {finished && (
            <>
              <span className="text-accent">$</span>{" "}
              <span className="text-accent animate-pulse">▍</span>
            </>
          )}
        </code>
      </pre>
    </div>
  );
}

function LineOut({ line }: { line: ScriptLine }) {
  if (line.kind === "blank") return <>{"\n"}</>;
  if (line.kind === "cmd") {
    return (
      <>
        <span className="text-accent">$</span> {line.text}
        {"\n"}
      </>
    );
  }
  return (
    <>
      <span className={line.tone === "accent" ? "text-accent-2" : "text-muted"}>
        {line.text}
      </span>
      {"\n"}
    </>
  );
}
