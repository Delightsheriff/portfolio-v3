"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Profile, Project, ProjectGroup } from "@/interface/sanity";
import { urlFor } from "@/sanity/sanity";
import Footer from "./nav/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "./nav/navbar";
import { ProjectFilter } from "./project-filter";
import { ProjectsHeader } from "./projects-header";
import { ProjectsCta } from "./projects-cta";
import { ProjectGridCard } from "./project-grid-card";
import { ProjectGroupCard } from "./project-group-card";

interface ProjectsPageProps {
  projects: Project[];
  profile: Profile;
  groups: ProjectGroup[];
}

export function ProjectsPage({ projects, profile, groups }: ProjectsPageProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [filteredGroups, setFilteredGroups] = useState<ProjectGroup[]>(groups);
  const [filterVersion, setFilterVersion] = useState(0);

  const handleFilterChange = (filtered: Project[], groups: ProjectGroup[]) => {
    setFilteredProjects(filtered);
    setFilteredGroups(groups);
  };

  const handleClearFilters = () => {
    setFilterVersion((v) => v + 1);
    setFilteredProjects(projects);
    setFilteredGroups(groups);
  };

  const standalones = useMemo(() => {
    const groupedIds = new Set(
      filteredGroups.flatMap((g) => g.parts.map((p) => p.project?._id).filter(Boolean)),
    );
    return filteredProjects.filter(
      (p) => !groupedIds.has(p._id) || p.spotlight,
    );
  }, [filteredProjects, filteredGroups]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main id="main-content">
        <ProjectsHeader />

        <Separator className="opacity-30" />

        <section className="py-16 px-5 md:px-8 pb-24" aria-label="Projects list">
          <div className="max-w-7xl mx-auto">
            <ProjectFilter
              key={filterVersion}
              projects={projects}
              groups={groups}
              onFilterChange={(filtered, filteredGroups) => handleFilterChange(filtered, filteredGroups)}
            />

            {filteredGroups.length > 0 && (
              <div className="mb-16 space-y-12">
                <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
                  Project Groups
                </h2>
                {filteredGroups.map((group, index) => (
                  <ProjectGroupCard
                    key={group._id}
                    group={group}
                    index={index}
                    urlFor={urlFor}
                  />
                ))}
                <Separator className="opacity-20" />
              </div>
            )}

            {standalones.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {standalones.map((project, index) => (
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
                    onClick={handleClearFilters}
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
