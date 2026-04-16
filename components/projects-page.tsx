"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./animations/scroll-reveal";
import type { About, Project } from "@/interface/sanity";
import { urlFor } from "@/sanity/sanity";
import Footer from "./nav/footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "./nav/navbar";

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

interface ProjectsPageProps {
  projects: Project[];
  about: About;
}

export function ProjectsPage({ projects, about }: ProjectsPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-5 md:px-8" aria-label="Projects header">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
              All Projects
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-5">
              Work I&apos;m proud of
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A complete archive of projects spanning web applications, mobile
              apps, and APIs — each one solving a real problem with care for
              user experience.
            </p>
            <a
              href="https://github.com/Delightsheriff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Browse GitHub profile"
              className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse GitHub
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>
      </section>

      <Separator className="opacity-30" />

      {/* Projects grid */}
      <section className="py-16 px-5 md:px-8 pb-24" aria-label="Projects list">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, index) => {
              const isMobile = project.projectType?.category === "mobile";
              const imageUrl = project.mainImage
                ? urlFor(project.mainImage).url()
                : "/placeholder.svg";

              return (
                <ScrollReveal key={project._id} delay={index * 0.05}>
                  <article className="group flex flex-col h-full">
                    {/* Image / Phone Mockup */}
                    <Link
                      href={`/project/${project.slug.current}`}
                      aria-label={`View ${project.title} case study`}
                      className="block mb-4"
                    >
                      {isMobile ? (
                        <div className="flex items-center justify-center py-10 sm:py-8 bg-muted/60 rounded-xl">
                          <div className="relative w-[160px] sm:w-[140px] md:w-[155px]">
                            <div className="relative rounded-[2rem] border-[5px] border-foreground/80 bg-foreground/80 shadow-xl overflow-hidden">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-foreground/80 rounded-b-xl z-10" />
                              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] bg-background">
                                <Image
                                  src={imageUrl}
                                  alt={`${project.title} app screenshot`}
                                  fill
                                  sizes="(max-width: 640px) 160px, 155px"
                                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                              </div>
                            </div>
                            {/* Shadow beneath phone */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground/20 rounded-full blur-sm" />
                          </div>
                        </div>
                      ) : (
                        <div className="relative overflow-hidden bg-muted/60 aspect-[4/3] rounded-xl">
                          <Image
                            src={imageUrl}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                        </div>
                      )}
                    </Link>

                    {/* Card content */}
                    <div className="flex flex-col flex-1 space-y-3">
                      {/* Category + year */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {project.projectType && (
                          <Badge variant="secondary" className="text-xs font-mono">
                            {CATEGORY_LABELS[project.projectType.category] ??
                              project.projectType.category}
                          </Badge>
                        )}
                        {project.year && (
                          <span className="text-xs font-mono text-muted-foreground">
                            {project.year}
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg md:text-xl font-serif leading-snug group-hover:text-highlight transition-colors">
                        <Link href={`/project/${project.slug.current}`}>
                          {project.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {project.description}
                      </p>

                      {/* Tech */}
                      {project.stack && project.stack.length > 0 && (
                        <div className="flex flex-wrap gap-1" aria-label="Tech stack">
                          {project.stack.slice(0, 4).map((t, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs font-mono px-1.5 py-0 text-muted-foreground border-border/40"
                            >
                              {t}
                            </Badge>
                          ))}
                          {project.stack.length > 4 && (
                            <Badge
                              variant="outline"
                              className="text-xs font-mono px-1.5 py-0 text-muted-foreground border-border/40"
                            >
                              +{project.stack.length - 4}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap gap-4 pt-1">
                        <Link
                          href={`/project/${project.slug.current}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-highlight transition-colors group/link"
                        >
                          Case Study
                          <ArrowUpRight
                            className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
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
                        {isMobile ? (
                          <>
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
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} live website`}
                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                                Web
                              </a>
                            )}
                          </>
                        ) : (
                          project.liveUrl && (
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
                          )
                        )}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-5 md:px-8 bg-muted/40" aria-label="Contact CTA">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground">
              I&apos;m open to full-time roles and select freelance projects.
            </p>
            <a
              href={`mailto:${about.email}?subject=Let's%20work%20together`}
              className="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-highlight transition-all"
              aria-label="Send an email to start a conversation"
            >
              Send a message
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
