/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Smartphone, FileText, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/interface/sanity";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  index: number;
  urlFor: (source: any) => any;
}

export function ProjectCard({ project, index, urlFor }: ProjectCardProps) {
  const isEven = index % 2 === 0;
  const isMobile = project.projectType?.category === "mobile";
  const imageUrl = project.mainImage
    ? urlFor(project.mainImage).url()
    : "/placeholder.svg";
  const hasLiveLinks = project.liveUrl || project.iosUrl || project.androidUrl || project.apiDocsUrl || project.demoVideoUrl;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center group"
    >
      {/* Image */}
      <div
        className={`${
          isEven
            ? "md:col-span-7"
            : "md:col-span-7 md:col-start-6 md:order-2"
        }`}
      >
        <Link
          href={`/project/${project.slug.current}`}
          aria-label={`View ${project.title} case study`}
          className="block"
        >
          {isMobile ? (
            <div className="relative overflow-hidden rounded-2xl bg-card/60 border border-border/30 px-8 py-10 md:px-12 md:py-14">
              <div className="mx-auto max-w-[260px] md:max-w-[320px]">
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2rem] border border-border/30 bg-background shadow-[0_40px_80px_-20px_oklch(0_0_0_/_0.6)]">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              {/* Live indicator */}
              {hasLiveLinks && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-border/40 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Live</span>
                </div>
              )}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card/60 border border-border/30">
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
              {/* Live indicator */}
              {hasLiveLinks && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm border border-border/40 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Live</span>
                </div>
              )}
            </div>
          )}
        </Link>
      </div>

      {/* Content */}
      <div
        className={`${
          isEven
            ? "md:col-span-4 md:col-start-9"
            : "md:col-span-4 md:order-1"
        } space-y-4`}
      >
        {/* Category + year */}
        <div className="flex items-center gap-2 flex-wrap">
          {project.projectType && (
            <Badge variant="secondary" className="text-xs font-mono">
              {CATEGORY_LABELS[project.projectType.category] ??
                project.projectType.category}
            </Badge>
          )}
          {project.year && (
            <span className="text-xs font-mono text-muted-foreground/60">
              {project.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-heading font-bold leading-tight tracking-tight">
          <Link
            href={`/project/${project.slug.current}`}
            className="hover:text-highlight transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-sm">
          {project.description}
        </p>

        {/* Impact metric callout */}
        {project.impactMetric && (
          <div className="py-3 px-4 rounded-lg border border-highlight/20 bg-highlight/5 backdrop-blur-sm">
            <div className="text-sm text-muted-foreground mb-1">Impact</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-heading font-bold text-highlight">
                {project.impactMetric.value}
              </span>
              <span className="text-xs md:text-sm font-mono text-muted-foreground">
                {project.impactMetric.label}
              </span>
            </div>
          </div>
        )}

        {/* Tech stack badges */}
        {project.stack && project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.slice(0, 5).map((tech, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-xs font-mono text-muted-foreground border-border/40 px-2 py-0.5"
              >
                {tech}
              </Badge>
            ))}
            {project.stack.length > 5 && (
              <Badge
                variant="outline"
                className="text-xs font-mono text-muted-foreground border-border/40 px-2 py-0.5"
              >
                +{project.stack.length - 5}
              </Badge>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-1">
          <Link
            href={`/project/${project.slug.current}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-highlight transition-colors group/link"
          >
            Case Study
            <ArrowUpRight
              className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              Code
            </a>
          )}

          {/* Mobile store links */}
          {project.iosUrl && (
            <a
              href={project.iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on App Store`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              iOS
            </a>
          )}
          {project.androidUrl && (
            <a
              href={project.androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on Google Play`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              Android
            </a>
          )}
          {/* Web / live demo */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              Live
            </a>
          )}
          {/* API docs for backend projects */}
          {project.apiDocsUrl && (
            <a
              href={project.apiDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} API documentation`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              API Docs
            </a>
          )}
          {/* Demo video */}
          {project.demoVideoUrl && (
            <a
              href={project.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} demo video`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
