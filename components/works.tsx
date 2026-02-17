import { ScrollReveal } from "./animations/scroll-reveal";
import { ProjectCard } from "./project-card";
import { MagneticButton } from "./animations/magnetic-button";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/sanity";
import type { Project } from "@/interface/sanity";

export default function Works({
  projects,
  allProjects,
}: {
  projects: Project[];
  allProjects: Project[];
}) {
  return (
    <section id="work" className="py-24 md:py-36 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16 md:mb-24 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-5 block">
              Selected Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6">
              Projects that define my craft
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              A curated collection of projects that showcase my approach to
              solving complex technical challenges while maintaining exceptional
              user experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="space-y-20 md:space-y-32">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              urlFor={urlFor}
            />
          ))}
        </div>

        {/* View All Projects */}
        <ScrollReveal>
          <div className="mt-20 md:mt-28 flex flex-col sm:flex-row gap-6 items-center justify-center">
            <MagneticButton href="/projects" variant="outline">
              View All Projects ({allProjects.length})
            </MagneticButton>

            <a
              href="https://github.com/Delightsheriff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse GitHub
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
