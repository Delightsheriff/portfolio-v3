"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/interface/sanity";

interface ProjectNextSectionProps {
  nextProject: NonNullable<Project["nextProject"]>;
}

export function ProjectNextSection({
  nextProject,
}: ProjectNextSectionProps) {
  return (
    <section className="bg-muted px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                Next Project
              </span>
              <h3 className="text-3xl font-serif transition-colors hover:text-highlight md:text-4xl lg:text-5xl">
                {nextProject.title}
              </h3>
            </div>
            <Link
              href={`/project/${nextProject.slug}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full px-6 py-3 h-auto group",
              )}
              aria-label={`View next project: ${nextProject.title}`}
            >
              View Project
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
