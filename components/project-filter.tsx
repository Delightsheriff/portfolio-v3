"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Project, ProjectGroup } from "@/interface/sanity";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  projects: Project[];
  groups: ProjectGroup[];
  onFilterChange: (filtered: Project[], groups: ProjectGroup[]) => void;
}

type ProjectType = "Web" | "Mobile" | "API";
type ViewMode = "all" | "single" | "groups";

const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "React Native",
  "Tailwind",
  "Sanity",
  "PostgreSQL",
  "Expo",
  "GraphQL",
];

const PROJECT_TYPES: ProjectType[] = ["Web", "Mobile", "API"];

const VIEW_MODES: { value: ViewMode; label: string }[] = [
  { value: "all", label: "All" },
  { value: "single", label: "Single" },
  { value: "groups", label: "Groups" },
];

export function ProjectFilter({
  projects,
  groups,
  onFilterChange,
}: ProjectFilterProps) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  useEffect(() => {
    let filtered = projects;

    if (selectedTechs.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTechs.some((tech) =>
          project.stack?.some((s) => {
            if (typeof s === "string") {
              return s.toLowerCase().includes(tech.toLowerCase());
            }
            return false;
          })
        )
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((project) => {
        const projectType =
          typeof project.projectType === "string"
            ? project.projectType
            : project.projectType?.category || "";
        return selectedTypes.some((type) =>
          projectType.toLowerCase().includes(type.toLowerCase())
        );
      });
    }

    const filteredGroups =
      selectedTechs.length > 0 || selectedTypes.length > 0
        ? groups.filter((group) =>
            group.parts?.some((part) => filtered.includes(part.project))
          )
        : groups;

    if (viewMode === "single") {
      onFilterChange(filtered, []);
    } else if (viewMode === "groups") {
      onFilterChange([], filteredGroups);
    } else {
      onFilterChange(filtered, filteredGroups);
    }
  }, [selectedTechs, selectedTypes, viewMode, projects, groups, onFilterChange]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleType = (type: ProjectType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTechs([]);
    setSelectedTypes([]);
  };

  const isActive = selectedTechs.length > 0 || selectedTypes.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 mb-12"
    >
      {/* View Mode Filter */}
      <div>
        <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 block">
          Show
        </label>
        <div className="flex flex-wrap gap-2">
          {VIEW_MODES.map((mode) => (
            <motion.button
              key={mode.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(mode.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all border",
                viewMode === mode.value
                  ? "bg-highlight text-highlight-foreground border-highlight"
                  : "border-border/40 text-muted-foreground hover:border-highlight/30 hover:text-foreground",
              )}
            >
              {mode.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tech Stack Filter */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
            Filter by tech
          </label>
          {isActive && (
            <Button
              onClick={clearFilters}
              variant="link"
              className="text-xs font-mono h-auto p-0"
            >
              Clear filters
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTech(tech)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all border",
                selectedTechs.includes(tech)
                  ? "bg-highlight text-highlight-foreground border-highlight"
                  : "border-border/40 text-muted-foreground hover:border-highlight/30 hover:text-foreground",
              )}
            >
              {tech}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project Type Filter */}
      <div>
        <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 block">
          Filter by type
        </label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleType(type)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all border",
                selectedTypes.includes(type)
                  ? "bg-highlight text-highlight-foreground border-highlight"
                  : "border-border/40 text-muted-foreground hover:border-highlight/30 hover:text-foreground",
              )}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
