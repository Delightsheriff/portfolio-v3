"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CustomCursor } from "./animations/custom-cursor";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import { Project } from "@/interface/sanity";
import { urlFor } from "@/sanity/sanity";
import GoBack from "./go-back";

interface ProjectsPageProps {
  projects: Project[];
}

export function ProjectsPage({ projects }: ProjectsPageProps) {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-[#FDFBF6] text-[#111111]">
        {/* Go back button */}
        <GoBack />

        {/* Header */}
        <section className="pt-24 pb-12 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-12 gap-4 md:gap-8"
            >
              <div className="col-span-12 md:col-span-8">
                <h1 className="text-4xl md:text-6xl font-serif mb-6">
                  All Projects
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                  A curated collection of projects that showcase my approach to
                  solving complex technical challenges while maintaining
                  exceptional user experience.
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 md:col-start-10 flex items-end">
                <a
                  href="https://github.com/Delightsheriff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-[#FF471A] transition-colors group"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Profile</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {projects.map((project, index) => (
                <ScrollReveal key={project._id} delay={index * 0.1}>
                  <div className="group">
                    <Link
                      href={`/project/${project.slug.current}`}
                      className="block"
                    >
                      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] rounded-sm mb-6">
                        <Image
                          src={
                            urlFor(project.mainImage).url() ||
                            "/placeholder.svg?height=600&width=800"
                          }
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-serif group-hover:text-[#FF471A] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-500">
                        {project.stack.slice(0, 4).map((tech, i) => (
                          <span key={i}>{tech}</span>
                        ))}
                        {project.stack.length > 4 && (
                          <span>+{project.stack.length - 4} more</span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <Link
                          href={`/project/${project.slug.current}`}
                          className="inline-flex items-center gap-2 hover:text-[#FF471A] transition-colors group"
                        >
                          View Case Study
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 hover:text-[#FF471A] transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 hover:text-[#FF471A] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live</span>
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
        <section className="py-20 px-6 md:px-8 bg-[#111111] text-[#FDFBF6]">
          <div className="max-w-7xl mx-auto text-center">
            <ScrollReveal>
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-serif">
                  Interested in working together?
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  I&apos;m always open to discussing new opportunities and
                  interesting projects.
                </p>
                <MagneticButton
                  href="mailto:hello@amadisheriff.dev?subject=Let's work together&body=Hi Amadi-Sheriff,%0D%0A%0D%0AI'd love to discuss a potential opportunity with you.%0D%0A%0D%0ABest regards,"
                  variant="light"
                >
                  Get In Touch
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 md:px-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
            <div>© {new Date().getFullYear()} Amadi-Sheriff Delight</div>
            <div className="font-mono">Crafted with intention</div>
          </div>
        </footer>
      </div>
    </>
  );
}
