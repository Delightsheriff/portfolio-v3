"use client";

import { motion } from "framer-motion";

interface ProjectFilterProps {
  onFilterChange: (category: string) => void;
  totalProjects: number;
  filteredCount: number;
  activeCategory: string;
}

export function ProjectFilter({
  onFilterChange,
  totalProjects,
  filteredCount,
  activeCategory,
}: ProjectFilterProps) {
  const categories = [
    { value: "all", label: "All Projects", icon: "📁", count: totalProjects },
    { value: "fullstack", label: "Full-Stack", icon: "🚀" },
    { value: "frontend", label: "Frontend", icon: "⚡" },
    { value: "static", label: "Static", icon: "🎨" },
    { value: "mobile", label: "Mobile", icon: "📱" },
    { value: "backend", label: "Backend", icon: "🔧" },
    { value: "ai", label: "AI/ML", icon: "🤖" },
    { value: "dataviz", label: "Data Viz", icon: "📊" },
    { value: "devtool", label: "Dev Tool", icon: "🛠️" },
  ];

  const handleCategoryChange = (category: string) => {
    onFilterChange(category);
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category.value
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-foreground border border-border hover:border-primary hover:text-primary"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
            {category.value === "all" && (
              <span className="ml-1 px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
                {totalProjects}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Results Counter */}
      <div className="text-center text-sm text-muted-foreground mb-8">
        {activeCategory === "all" ? (
          <span>Showing all {totalProjects} projects</span>
        ) : (
          <span>
            Showing {filteredCount}{" "}
            {filteredCount === 1 ? "project" : "projects"} in{" "}
            {categories.find((cat) => cat.value === activeCategory)?.label}
          </span>
        )}
      </div>
    </div>
  );
}
