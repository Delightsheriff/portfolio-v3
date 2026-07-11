"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import type { Project } from "@/interface/sanity";

interface ProjectImpactSectionProps {
  impactMetric: NonNullable<Project["impactMetric"]>;
}

export function ProjectImpactSection({
  impactMetric,
}: ProjectImpactSectionProps) {
  return (
    <section className="px-5 py-16 md:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="mb-2.5 text-xs uppercase tracking-[0.15em] text-muted-foreground font-mono">
                The Impact
              </p>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <AnimatedCounter
                value={impactMetric.value}
                label={impactMetric.label}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
