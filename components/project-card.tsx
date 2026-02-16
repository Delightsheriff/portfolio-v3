/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/interface/sanity";

interface ProjectCardProps {
  project: Project;
  index: number;
  urlFor: (source: any) => any;
}

export function ProjectCard({ project, index, urlFor }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-12 gap-4 md:gap-8 items-center"
    >
      {/* Image */}
      <div
        className={`col-span-12 ${isEven ? "md:col-span-7" : "md:col-span-7 md:col-start-6 order-1 md:order-2"}`}
      >
        <Link href={`/project/${project.slug.current}`} className="group block">
          <div className="relative overflow-hidden bg-muted aspect-[4/3] rounded-sm">
            <Image
              src={urlFor(project.mainImage).url() || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div
        className={`col-span-12 ${
          isEven
            ? "md:col-span-4 md:col-start-9"
            : "md:col-span-4 order-2 md:order-1"
        } space-y-5`}
      >
        <div className="space-y-3">
          {/* Category label — clean text, no emoji */}
          {project.projectType && (
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
              {project.projectType.category === "fullstack"
                ? "Full-Stack"
                : project.projectType.category === "frontend"
                  ? "Frontend"
                  : project.projectType.category === "mobile"
                    ? "Mobile App"
                    : project.projectType.category === "backend"
                      ? "Backend"
                      : project.projectType.category === "ai"
                        ? "AI / ML"
                        : project.projectType.category === "static"
                          ? "Static Site"
                          : project.projectType.category}
            </span>
          )}
          <h3 className="text-2xl md:text-3xl font-serif">{project.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground/70">
          {project.stack.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-5">
          <Link
            href={`/project/${project.slug.current}`}
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
          >
            View Case Study
            <ArrowUpRight
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              Source
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
