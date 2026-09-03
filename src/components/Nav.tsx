"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const LINKS = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  // Highlights the nav link for whichever section is currently in view.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
        <a href="#about" className="font-mono text-sm font-semibold">
          <span className="text-accent">~/</span>
          <span className="text-foreground">{site.initials.toLowerCase()}</span>
        </a>

        <ul className="hidden items-center gap-6 font-mono text-sm sm:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-colors ${isActive ? "text-accent" : "text-muted hover:text-accent"}`}
                >
                  <span className={isActive ? "text-accent" : "text-accent-2"}>./</span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2 sm:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-border bg-background px-6 py-4 font-mono text-sm sm:hidden">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block py-2 ${isActive ? "text-accent" : "text-muted hover:text-accent"}`}
                >
                  <span className={isActive ? "text-accent" : "text-accent-2"}>./</span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
