import { ScrollReveal } from "./animations/scroll-reveal";
import { ProjectCard } from "./project-card";
import { ProjectGroupCard } from "./project-group-card";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/sanity";
import type { Project, ProjectGroup } from "@/interface/sanity";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WorkItem =
  | { kind: "project"; data: Project; sortDate: string }
  | { kind: "group"; data: ProjectGroup; sortDate: string };

function buildWorksList(
  projects: Project[],
  groups: ProjectGroup[],
): WorkItem[] {
  // Collect project IDs that are already inside a group so we don't
  // render them again as standalone cards.
  const groupedIds = new Set(
    groups.flatMap((g) => g.parts.map((p) => p.project?._id).filter(Boolean)),
  );

  const standalones: WorkItem[] = projects
    .filter((p) => !groupedIds.has(p._id))
    .map((p) => ({
      kind: "project",
      data: p,
      sortDate: p._createdAt ?? "",
    }));

  const groupItems: WorkItem[] = groups.map((g) => ({
    kind: "group",
    data: g,
    // Use the lead project's date for ordering, fall back to empty string
    sortDate: g.parts[0]?.project?._createdAt ?? "",
  }));

  return [...standalones, ...groupItems].sort((a, b) =>
    b.sortDate.localeCompare(a.sortDate),
  );
}

export default function Works({
  projects,
  allProjects,
  groups = [],
}: {
  projects: Project[];
  allProjects: Project[];
  groups?: ProjectGroup[];
}) {
  const featured = buildWorksList(projects, groups).slice(0, 3);

  return (
    <section
      id="work"
      className="py-20 md:py-28 px-5 md:px-8"
      aria-label="Selected work"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-14 md:mb-20">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/60 mb-3">
              Selected Works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight">
              Projects that define my craft
            </h2>
          </div>
        </ScrollReveal>

        {/* Work items */}
        {featured.length > 0 ? (
          <div className="space-y-0">
            {featured.map((item, index) => (
              <ScrollReveal
                key={item.kind === "project" ? item.data._id : item.data._id}
                delay={0.05 * index}
              >
                <div className="py-12 md:py-16 first:pt-0">
                  {item.kind === "group" ? (
                    <ProjectGroupCard
                      group={item.data}
                      index={index}
                      urlFor={urlFor}
                    />
                  ) : (
                    <ProjectCard
                      project={item.data}
                      index={index}
                      urlFor={urlFor}
                    />
                  )}
                  {index < featured.length - 1 && (
                    <Separator className="mt-12 md:mt-16 opacity-20" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <div className="py-24 text-center">
              <p className="text-muted-foreground mb-4">Featured projects coming soon</p>
              <p className="text-sm text-muted-foreground/70">
                Check back later for updates on my latest work
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* CTA row */}
        <ScrollReveal>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full px-6 py-3",
              )}
            >
              All Projects ({allProjects.length})
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="https://github.com/Delightsheriff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Browse GitHub profile"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full px-5 py-2.5",
              )}
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
