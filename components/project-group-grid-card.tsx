"use client";

import { ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./animations/scroll-reveal";
import type { ProjectGroup } from "@/interface/sanity";
import { urlFor } from "@/sanity/sanity";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectGroupGridCardProps {
  group: ProjectGroup;
  index: number;
}

export function ProjectGroupGridCard({ group, index }: ProjectGroupGridCardProps) {
  const leadPart = group.parts[0];
  const leadProject = leadPart?.project;
  const isMobile = leadProject?.projectType?.category === "mobile";
  const imageUrl = leadProject?.mainImage
    ? urlFor(leadProject.mainImage).url()
    : "/placeholder.svg";

  return (
    <ScrollReveal key={group._id} delay={index * 0.05}>
      <article className="group flex flex-col h-full">
        <Link
          href={leadProject?.slug?.current ? `/project/${leadProject.slug.current}` : "#"}
          aria-label={`View ${group.title} case study`}
          className="block mb-4 relative"
        >
          {isMobile ? (
            <div className="rounded-[1.75rem] bg-gradient-to-b from-muted/80 via-muted/60 to-transparent px-5 py-7 sm:px-6">
              <div className="mx-auto max-w-[220px]">
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.75rem] border border-border/40 bg-background shadow-[0_28px_60px_-28px_rgba(0,0,0,0.55)]">
                  <Image
                    src={imageUrl}
                    alt={`${group.title} app screenshot`}
                    fill
                    sizes="(max-width: 640px) 220px, 220px"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-muted/60 aspect-[4/3] rounded-xl">
              <Image
                src={imageUrl}
                alt={`${group.title} preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
            </div>
          )}

          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-highlight/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
            <Layers className="w-3 h-3 text-highlight-foreground" aria-hidden="true" />
            <span className="text-[10px] font-mono text-highlight-foreground uppercase tracking-wider font-semibold">
              Group · {group.parts.length} {group.parts.length === 1 ? "part" : "parts"}
            </span>
          </div>
        </Link>

        <div className="flex flex-col flex-1 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-muted-foreground">
              {group.year || leadProject?.year}
            </span>
          </div>

          <h2 className="text-lg md:text-xl font-serif leading-snug group-hover:text-highlight transition-colors">
            <Link href={leadProject?.slug?.current ? `/project/${leadProject.slug.current}` : "#"}>
              {group.title}
            </Link>
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
            {group.description}
          </p>

          <div className="flex flex-wrap gap-1.5" aria-label="Project parts">
            {group.parts.map((part, i) => (
              <Link
                key={i}
                href={`/project/${part.project?.slug?.current}`}
                className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-mono border transition-colors",
                  i === 0
                    ? "border-highlight/40 text-highlight bg-highlight/5"
                    : "border-border/40 text-muted-foreground hover:border-highlight/30 hover:text-foreground",
                )}
              >
                {part.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <Link
              href={leadProject?.slug?.current ? `/project/${leadProject.slug.current}` : "#"}
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-highlight transition-colors group/link"
            >
              View Projects
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
