import { projects } from "@/data/projects";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <Section id="projects" index="04" title="projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
