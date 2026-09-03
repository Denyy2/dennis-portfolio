import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string; // "01", "02", …
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28 scroll-mt-20">
      <Reveal>
        <div className="mb-10 flex items-center gap-3 sm:mb-12">
          <span className="font-mono text-sm text-accent">{index}.</span>
          <h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <span className="h-px flex-1 bg-border" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}
