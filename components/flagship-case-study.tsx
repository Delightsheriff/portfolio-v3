"use client";

import { ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ProjectGroup, SanityImage } from "@/interface/sanity";
import type { ImageBuilder } from "@/sanity/sanity";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "./animations/scroll-reveal";

interface FlagshipCaseStudyProps {
  groups: ProjectGroup[];
  urlFor: (source: SanityImage | string | null | undefined) => ImageBuilder;
}

export function FlagshipCaseStudy({ groups, urlFor }: FlagshipCaseStudyProps) {
  const group = groups.find((g) => g.flagship === true);
  if (!group) return null;

  const stack = Array.from(
    new Set(group.parts.flatMap((p) => p.project?.stack ?? [])),
  );

  return (
    <section
      id="flagship"
      className="py-20 md:py-28 px-5 md:px-8"
      aria-label="Flagship case study"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-highlight bg-highlight/10 rounded-full px-2.5 py-1 mb-5">
              <Layers className="w-3 h-3" aria-hidden="true" />
              Flagship Case Study
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
              {group.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {group.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Both parts, shown together — a flagship deserves to show the
            whole system, not just one screen at a time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {group.parts.map((part, i) => {
            const project = part.project;
            if (!project) return null;
            const isMobile = project.projectType?.category === "mobile";
            const imageUrl = project.mainImage
              ? urlFor(project.mainImage).url()
              : "/placeholder.svg";

            return (
              <ScrollReveal key={project._id} delay={0.1 * i}>
                <Link
                  href={`/project/${project.slug.current}`}
                  className="group block"
                  aria-label={`${part.label} case study`}
                >
                  {isMobile ? (
                    <div className="relative overflow-hidden rounded-2xl bg-card/60 border border-border/30 px-6 py-8 md:px-8 md:py-10">
                      <div className="mx-auto max-w-[220px]">
                        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.75rem] border border-border/30 bg-background shadow-[0_30px_60px_-15px_oklch(0_0_0_/_0.6)]">
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            sizes="220px"
                            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card/60 border border-border/30">
                      <Image
                        src={imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                    </div>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium font-heading">
                      {part.label}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-highlight"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-6">
            {stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tech stack">
                {stack.slice(0, 8).map((tech, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-xs font-mono text-muted-foreground border-border/40"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
            <Link
              href={`/project-group/${group.slug.current}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-highlight transition-colors group/link shrink-0"
            >
              Read the full case study
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
