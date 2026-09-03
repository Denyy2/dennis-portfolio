"use client";

import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
        <a href="#about" className="font-mono text-sm font-semibold">
          <span className="text-accent">~/</span>
          <span className="text-foreground">{site.initials.toLowerCase()}</span>
        </a>

        <ul className="hidden items-center gap-6 font-mono text-sm text-muted sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-accent"
              >
                <span className="text-accent-2">./</span>
                {link.label}
              </a>
            </li>
          ))}
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
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-muted hover:text-accent"
              >
                <span className="text-accent-2">./</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
