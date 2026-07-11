"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { ProjectGroup } from "@/interface/sanity";
import { urlFor } from "@/sanity/sanity";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectGroupLinks } from "./project-group-links";
import { CATEGORY_LABELS } from "@/lib/constants";

export function ProjectGroupDetail({ group }: { group: ProjectGroup }) {
  const [activePartIndex, setActivePartIndex] = useState(0);

  const activePart = group.parts[activePartIndex];
  const activeProject = activePart?.project;
  const isMobile = activeProject?.projectType?.category === "mobile";
  const imageUrl = activeProject?.mainImage
    ? urlFor(activeProject.mainImage).url()
    : "/placeholder.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono mb-10"
      >
        &larr; All Projects
      </Link>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-highlight bg-highlight/10 rounded-full px-2.5 py-1">
            <Layers className="w-3 h-3" aria-hidden="true" />
            Project Group · {group.parts.length} parts
          </span>
          {group.year && (
            <span className="text-xs font-mono text-muted-foreground">
              {group.year}
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-5">
          {group.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {group.description}
        </p>
      </div>

      {/* Part selector tabs */}
      <div
        role="tablist"
        aria-label="Project parts"
        className="flex flex-wrap gap-2 mb-10"
      >
        {group.parts.map((part, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={activePartIndex === i}
            onClick={() => setActivePartIndex(i)}
            className={`px-4 py-2 rounded-full text-xs font-mono border transition-all ${
              activePartIndex === i
                ? "border-highlight/60 text-highlight bg-highlight/8"
                : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {part.label}
          </button>
        ))}
      </div>

      {/* Active part content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 mb-16">
        {/* Image */}
        <div className="md:col-span-3">
          {isMobile ? (
            <div className="rounded-[2rem] bg-gradient-to-b from-muted/80 via-muted/60 to-transparent px-6 py-8 md:px-10 md:py-12">
              <div className="mx-auto max-w-[280px] md:max-w-[340px]">
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] border border-border/30 bg-background shadow-[0_40px_80px_-20px_oklch(0_0_0_/_0.6)]">
                  <Image
                    key={activePartIndex}
                    src={imageUrl}
                    alt={activeProject?.title ?? group.title}
                    fill
                    sizes="(max-width: 768px) 280px, 340px"
                    className="object-contain transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card/60 border border-border/30">
              <Image
                key={activePartIndex}
                src={imageUrl}
                alt={activeProject?.title ?? group.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-all duration-500"
              />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-serif leading-snug mb-2">
              {activeProject?.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeProject?.description}
            </p>
          </div>

          {activeProject?.projectType && (
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                Category
              </p>
              <Badge variant="secondary" className="text-xs font-mono">
                {CATEGORY_LABELS[activeProject.projectType.category] ?? activeProject.projectType.category}
              </Badge>
            </div>
          )}

          {activeProject?.stack && activeProject.stack.length > 0 && (
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
                Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.stack.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-xs font-mono text-muted-foreground border-border/40"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {activeProject && (
            <div className="pt-3 space-y-3">
              <Link
                href={`/project/${activeProject.slug.current}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-highlight transition-colors group/link"
              >
                View Case Study
                <ArrowUpRight
                  className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <ProjectGroupLinks project={activeProject} />
            </div>
          )}
        </div>
      </div>

      {/* All parts summary */}
      <Separator className="opacity-20 mb-10" />
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
        All Parts in This Group
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {group.parts.map((part, i) => {
          const proj = part.project;
          if (!proj) return null;
          return (
            <Link
              key={i}
              href={`/project/${proj.slug.current}`}
              className={`p-5 rounded-xl border transition-all ${
                i === activePartIndex
                  ? "border-highlight/40 bg-highlight/5"
                  : "border-border/30 bg-card/30 hover:border-border/60"
              }`}
            >
              <p className="text-sm font-heading font-semibold mb-1">
                {part.label}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {proj.description}
              </p>
              <span className="text-xs text-highlight font-mono">
                View case study &rarr;
              </span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
