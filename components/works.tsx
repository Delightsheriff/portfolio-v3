import React from "react";
import { ScrollReveal } from "./animations/scroll-reveal";
import { ProjectCard } from "./project-card";
import { MagneticButton } from "./animations/magnetic-button";
import { ArrowUpRight, Github } from "lucide-react";
import { urlFor } from "@/sanity/sanity";
import { Project } from "@/interface/sanity";

export default function Works({ projects }: { projects: Project[] }) {
  return (
    <>
      <section id="work" className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16">
              <div className="col-span-12 md:col-span-4">
                <h2 className="text-3xl md:text-4xl font-serif">
                  Selected Work
                </h2>
              </div>
              <div className="col-span-12 md:col-span-6 md:col-start-7">
                <p className="text-gray-600 leading-relaxed">
                  A curated collection of projects that showcase my approach to
                  solving complex technical challenges while maintaining
                  exceptional user experience.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Project Grid */}
          <div className="space-y-20 md:space-y-32">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={index}
                urlFor={urlFor}
              />
            ))}
          </div>

          {/* View All Projects Button */}
          <ScrollReveal>
            <div className="text-center mt-20">
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <MagneticButton href="/projects" variant="outline">
                  View All Projects ({projects.length})
                </MagneticButton>
                <a
                  href="https://github.com/amadisheriff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-[#FF471A] transition-colors group"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Profile</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
