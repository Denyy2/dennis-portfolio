"use client";

import { useEffect, useState } from "react";

/** Small typewriter effect cycling through a list of role titles. */
export default function TypedRole({ roles }: { roles: readonly string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = deleting ? 35 : 65;
    const pauseAtFull = 1400;
    const pauseAtEmpty = 300;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseAtFull);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, pauseAtEmpty);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
    }, typingSpeed);
    return () => clearTimeout(t);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className="text-accent-2">
      {text}
      <span className="animate-pulse text-accent">▍</span>
    </span>
  );
}
