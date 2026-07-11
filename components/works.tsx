import { ScrollReveal } from "./animations/scroll-reveal";
import { ProjectCard } from "./project-card";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/sanity";
import type { Project } from "@/interface/sanity";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Works({
  projects,
  allProjects,
}: {
  projects: Project[];
  allProjects: Project[];
}) {
  return (
    <section id="work" className="py-20 md:py-28 px-5 md:px-8" aria-label="Selected work">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-14 md:mb-20">
            <div className="max-w-xl">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/60 mb-3">
                Selected Works
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight">
                Projects that define my craft
              </h2>
            </div>
            <Link
              href="/projects"
              aria-label={`View all ${allProjects.length} projects`}
              className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group shrink-0"
            >
              All projects ({allProjects.length})
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </ScrollReveal>

        {/* Projects */}
        <div className="space-y-0">
          {projects.slice(0, 3).map((project, index) => (
            <ScrollReveal key={project._id} delay={0.05 * index}>
              <div className="py-12 md:py-16 first:pt-0">
                <ProjectCard
                  project={project}
                  index={index}
                  urlFor={urlFor}
                />
                {index < projects.length - 1 && (
                  <Separator className="mt-12 md:mt-16 opacity-20" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile — see all link */}
        <ScrollReveal>
          <div className="mt-10 flex md:hidden justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/50 text-sm hover:bg-muted/40 transition-colors"
            >
              All Projects ({allProjects.length})
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        {/* GitHub CTA */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <a
              href="https://github.com/Delightsheriff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Browse GitHub profile"
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border/40 rounded-full text-sm font-medium text-muted-foreground hover:border-foreground hover:text-foreground transition-all"
            >
              Open-source on GitHub
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
