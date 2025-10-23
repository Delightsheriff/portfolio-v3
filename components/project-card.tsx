/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/interface/sanity";
import { ProjectBadge } from "./project-badge";

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
      className={`grid grid-cols-12 gap-4 md:gap-8 items-center`}
    >
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
      <div
        className={`col-span-12 ${
          isEven
            ? "md:col-span-4 md:col-start-9"
            : "md:col-span-4 order-2 md:order-1"
        } space-y-4`}
      >
        <div className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-serif">{project.title}</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          {/* Project Badges */}
          {project.projectType && (
            <div className="flex flex-wrap gap-2">
              <ProjectBadge projectType={project.projectType} size="sm" />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
          {project.stack.map((tech, i) => (
            <span key={i}>{tech}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/project/${project.slug.current}`}
            className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors group"
          >
            View Case Study
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors group"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors group"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
