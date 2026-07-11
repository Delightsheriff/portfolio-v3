/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Smartphone,
  FileText,
  Play,
  GitBranch,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext } from "react";
import type { ProjectGroup } from "@/interface/sanity";
import type { Project } from "@/interface/sanity";
import { Badge } from "@/components/ui/badge";
import { ClickSparkContext } from "./animations/spark-button";

interface ProjectGroupCardProps {
  group: ProjectGroup;
  index: number;
  urlFor: (source: any) => any;
}

const CATEGORY_LABELS: Record<string, string> = {
  fullstack: "Full-Stack",
  frontend: "Frontend",
  mobile: "Mobile App",
  backend: "Backend API",
  static: "Static Site",
  ai: "AI / ML",
  dataviz: "Data Viz",
  devtool: "Dev Tool",
};

function PartLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          Live
        </a>
      )}
      {project.apiDocsUrl && (
        <a
          href={project.apiDocsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} API docs`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <FileText className="w-3 h-3" aria-hidden="true" />
          API Docs
        </a>
      )}
      {project.demoVideoUrl && (
        <a
          href={project.demoVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} demo video`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Play className="w-3 h-3" aria-hidden="true" />
          Demo
        </a>
      )}
      {project.iosUrl && (
        <a
          href={project.iosUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on App Store`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Smartphone className="w-3 h-3" aria-hidden="true" />
          iOS
        </a>
      )}
      {project.androidUrl && (
        <a
          href={project.androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on Play Store`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Smartphone className="w-3 h-3" aria-hidden="true" />
          Android
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="w-3 h-3" aria-hidden="true" />
          Code
        </a>
      )}
      {project.repoUrls?.map((repo, i) => (
        <a
          key={i}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${repo.label} repository`}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <GitBranch className="w-3 h-3" aria-hidden="true" />
          {repo.label}
        </a>
      ))}
    </div>
  );
}

export function ProjectGroupCard({
  group,
  index,
  urlFor,
}: ProjectGroupCardProps) {
  const [activePartIndex, setActivePartIndex] = useState(0);
  const sparkContext = useContext(ClickSparkContext);

  const handlePartClick = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    if (sparkContext?.addSpark) {
      sparkContext.addSpark(e.clientX, e.clientY);
    }
    setActivePartIndex(i);
  };

  const leadPart = group.parts[0];
  const activePart = group.parts[activePartIndex];
  const isEven = index % 2 === 0;

  const leadImageUrl = leadPart?.project?.mainImage
    ? urlFor(leadPart.project.mainImage).url()
    : "/placeholder.svg";

  const activeImageUrl = activePart?.project?.mainImage
    ? urlFor(activePart.project.mainImage).url()
    : leadImageUrl;

  const isMobileActive =
    activePart?.project?.projectType?.category === "mobile";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      aria-label={`Project group: ${group.title}`}
    >
      {/* Main layout — mirrors ProjectCard alternating pattern */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center group/card">
        {/* Image panel — switches to active part image */}
        <div
          className={`${
            isEven
              ? "md:col-span-7"
              : "md:col-span-7 md:col-start-6 md:order-2"
          }`}
        >
          {isMobileActive ? (
            <div className="relative overflow-hidden rounded-2xl bg-card/60 border border-border/30 px-8 py-10 md:px-12 md:py-14">
              <div className="mx-auto max-w-[260px] md:max-w-[320px]">
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] border border-border/30 bg-background shadow-[0_40px_80px_-20px_oklch(0_0_0_/_0.6)]">
                  <Image
                    key={activePartIndex}
                    src={activeImageUrl}
                    alt={activePart?.project?.title ?? group.title}
                    fill
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-contain transition-all duration-500"
                  />
                </div>
              </div>
              {/* Group badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-highlight/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                <Layers className="w-3 h-3 text-highlight-foreground" aria-hidden="true" />
                <span className="text-[10px] font-mono text-highlight-foreground uppercase tracking-wider">
                  {group.parts.length} parts
                </span>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card/60 border border-border/30">
              <Image
                key={activePartIndex}
                src={activeImageUrl}
                alt={activePart?.project?.title ?? group.title}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover/card:bg-foreground/5 transition-colors duration-500" />
              {/* Group badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-highlight/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                <Layers className="w-3 h-3 text-highlight-foreground" aria-hidden="true" />
                <span className="text-[10px] font-mono text-highlight-foreground uppercase tracking-wider">
                  {group.parts.length} parts
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content panel */}
        <div
          className={`${
            isEven
              ? "md:col-span-4 md:col-start-9"
              : "md:col-span-4 md:order-1"
          } space-y-4`}
        >
          {/* Year */}
          {group.year && (
            <span className="text-xs font-mono text-muted-foreground/60">
              {group.year}
            </span>
          )}

          {/* Group title */}
          <h3 className="text-2xl md:text-3xl font-heading font-bold leading-tight tracking-tight">
            {group.title}
          </h3>

          {/* Group description */}
          <p className="text-muted-foreground leading-relaxed text-sm">
            {group.description}
          </p>

          {/* Part selector tabs */}
          <div
            role="tablist"
            aria-label="Project parts"
            className="flex flex-wrap gap-2 pt-1"
          >
            {group.parts.map((part, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activePartIndex === i}
                onClick={(e) => handlePartClick(e, i)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${
                  activePartIndex === i
                    ? "border-highlight/60 text-highlight bg-highlight/8"
                    : "border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {part.label}
              </button>
            ))}
          </div>

          {/* Active part details */}
          <div
            role="tabpanel"
            aria-label={`Details for ${activePart?.label}`}
            className="space-y-3 pt-1"
          >
            {/* Active part stack */}
            {activePart?.project?.stack &&
              activePart.project.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {activePart.project.stack.slice(0, 5).map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs font-mono text-muted-foreground border-border/40 px-2 py-0.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {activePart.project.stack.length > 5 && (
                    <Badge
                      variant="outline"
                      className="text-xs font-mono text-muted-foreground border-border/40 px-2 py-0.5"
                    >
                      +{activePart.project.stack.length - 5}
                    </Badge>
                  )}
                </div>
              )}

            {/* Active part impact metric */}
            {activePart?.project?.impactMetric && (
                <div className="py-2 px-3 rounded-lg border border-highlight/20 bg-highlight/5" aria-label="Impact metric">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-heading font-bold text-highlight">
                      {activePart.project.impactMetric.value}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {activePart.project.impactMetric.label}
                    </span>
                  </div>
                </div>
              )}

            {/* Active part links */}
            <div className="flex flex-wrap items-center gap-4 pt-0.5">
              {activePart?.project && (
                <Link
                  href={`/project/${activePart.project.slug.current}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-highlight transition-colors group/link"
                >
                  Case Study
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              )}
              {activePart?.project && (
                <PartLinks project={activePart.project} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Parts summary strip — visible on all parts at a glance */}
      {group.parts.length > 1 && (
        <div
          className="mt-8 rounded-xl border border-border/30 bg-card/30 divide-y divide-border/20 overflow-hidden"
          aria-label="All parts in this project"
        >
          {group.parts.map((part, i) => {
            const cat = part.project?.projectType?.category;
            return (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 w-px h-4 bg-highlight/50 rounded-full" aria-hidden="true" />
                  <span className="text-sm font-medium font-heading truncate">
                    {part.label}
                  </span>
                  {cat && (
                    <span className="hidden sm:block text-xs font-mono text-muted-foreground/60 shrink-0">
                      {CATEGORY_LABELS[cat] ?? cat}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <PartLinks project={part.project} />
                  {part.project?.slug?.current && (
                    <Link
                      href={`/project/${part.project.slug.current}`}
                      aria-label={`${part.label} case study`}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      Case study →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.article>
  );
}
