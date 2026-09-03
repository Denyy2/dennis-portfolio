import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-center font-mono text-xs text-muted sm:px-8">
        <p>
          <span className="text-accent">$</span> built by {site.name} · {new Date().getFullYear()}
        </p>
        <p className="text-muted/70">Next.js · TypeScript · Tailwind CSS</p>
      </div>
    </footer>
  );
}
