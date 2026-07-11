"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Profile, Project } from "@/interface/sanity";
import Footer from "./nav/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "./nav/navbar";
import { ProjectFilter } from "./project-filter";
import { ProjectsHeader } from "./projects-header";
import { ProjectsCta } from "./projects-cta";
import { ProjectGridCard } from "./project-grid-card";

interface ProjectsPageProps {
  projects: Project[];
  profile: Profile;
}

export function ProjectsPage({ projects, profile }: ProjectsPageProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const handleFilterChange = (filtered: Project[]) => {
    setFilteredProjects(filtered);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main id="main-content">
        <ProjectsHeader />

        <Separator className="opacity-30" />

        <section className="py-16 px-5 md:px-8 pb-24" aria-label="Projects list">
          <div className="max-w-7xl mx-auto">
            <ProjectFilter
              projects={projects}
              groups={[]}
              onFilterChange={(filtered) => handleFilterChange(filtered)}
            />

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filteredProjects.map((project, index) => (
                  <ProjectGridCard
                    key={project._id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-lg text-muted-foreground mb-3">
                    No projects found with these filters
                  </p>
                  <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                    Try adjusting your tech stack or project type filters, or check back later for new projects
                  </p>
                  <Button
                    onClick={() => handleFilterChange(projects)}
                    variant="ghost"
                    className="mt-6 uppercase tracking-widest font-mono text-sm"
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        <ProjectsCta profile={profile} />
      </main>

      <Footer />
    </div>
  );
}
