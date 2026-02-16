"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CustomCursor } from "./animations/custom-cursor";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import type { About, Project } from "@/interface/sanity";
import { urlFor } from "@/sanity/sanity";
import GoBack from "./go-back";
import Footer from "./nav/footer";

interface ProjectsPageProps {
  projects: Project[];
  about: About;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    fullstack: "Full-Stack",
    frontend: "Frontend",
    mobile: "Mobile App",
    backend: "Backend",
    static: "Static Site",
    ai: "AI / ML",
    dataviz: "Data Viz",
    devtool: "Dev Tool",
  };
  return labels[category] || category;
}

export function ProjectsPage({ projects, about }: ProjectsPageProps) {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background text-foreground">
        <GoBack />

        {/* Header */}
        <section className="pt-32 pb-16 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-5 block">
                Projects
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">
                All Projects
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A curated collection of projects that showcase my approach to
                solving complex technical challenges while maintaining
                exceptional user experience.
              </p>
              <a
                href="https://github.com/Delightsheriff"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
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

        {/* Projects Grid */}
        <section className="pb-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20">
              {projects.map((project, index) => (
                <ScrollReveal key={project._id} delay={index * 0.08}>
                  <div className="group">
                    {/* Image */}
                    <Link
                      href={`/project/${project.slug.current}`}
                      className="block mb-5"
                    >
                      <div className="relative overflow-hidden bg-muted aspect-[4/3] rounded-sm">
                        <Image
                          src={
                            urlFor(project.mainImage).url() ||
                            "/placeholder.svg"
                          }
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="space-y-3">
                      {/* Category */}
                      {project.projectType && (
                        <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                          {getCategoryLabel(project.projectType.category)}
                        </span>
                      )}

                      <h3 className="text-xl md:text-2xl font-serif group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground/70">
                        {project.stack.slice(0, 4).map((tech, i) => (
                          <span key={i}>{tech}</span>
                        ))}
                        {project.stack.length > 4 && (
                          <span>+{project.stack.length - 4} more</span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-5 pt-1">
                        <Link
                          href={`/project/${project.slug.current}`}
                          className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group/link"
                        >
                          View Case Study
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
                            <ExternalLink
                              className="w-4 h-4"
                              aria-hidden="true"
                            />
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-8 bg-muted">
          <div className="max-w-7xl mx-auto text-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">
                  Interested in working together?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  I&apos;m always open to discussing new opportunities and
                  interesting projects.
                </p>
                <MagneticButton
                  href={`mailto:${about.email}?subject=Let's work together&body=Hi Amadi-Sheriff,%0D%0A%0D%0AI'd love to discuss a potential opportunity with you.%0D%0A%0D%0ABest regards,`}
                >
                  Get In Touch
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
