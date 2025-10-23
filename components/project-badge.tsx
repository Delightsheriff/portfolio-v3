"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ProjectBadgeProps {
  projectType: {
    category: string;
    complexity: string;
    features?: string[];
    dataSource: string;
  };
  size?: "sm" | "md" | "lg";
}

interface TooltipProps {
  content: string;
  isVisible: boolean;
  position: { x: number; y: number };
}

function Tooltip({ content, isVisible, position }: TooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: position.x,
            top: position.y - 40,
            transform: "translateX(-50%)",
          }}
        >
          <div className="bg-popover text-popover-foreground text-xs px-3 py-2 rounded-lg shadow-lg border border-border max-w-xs">
            <div className="relative">
              {content}
              {/* Arrow pointing down */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ProjectBadge({ projectType, size = "md" }: ProjectBadgeProps) {
  const [tooltip, setTooltip] = useState<{
    content: string;
    isVisible: boolean;
    position: { x: number; y: number };
  }>({
    content: "",
    isVisible: false,
    position: { x: 0, y: 0 },
  });

  const categoryConfig = {
    fullstack: {
      label: "Full-Stack",
      icon: "🚀",
      color: "bg-primary/10 text-primary border-primary/20",
      description: "Complete web application with frontend and backend",
    },
    frontend: {
      label: "Frontend",
      icon: "⚡",
      color: "bg-accent/10 text-accent-foreground border-accent/20",
      description: "Client-side application with dynamic interactions",
    },
    static: {
      label: "Static",
      icon: "🎨",
      color: "bg-muted text-muted-foreground border-border",
      description: "Static website with no backend dependencies",
    },
    mobile: {
      label: "Mobile",
      icon: "📱",
      color: "bg-primary/10 text-primary border-primary/20",
      description: "Mobile application for iOS/Android",
    },
    backend: {
      label: "Backend",
      icon: "🔧",
      color: "bg-muted text-muted-foreground border-border",
      description: "Server-side API and data processing",
    },
    ai: {
      label: "AI/ML",
      icon: "🤖",
      color: "bg-primary/10 text-primary border-primary/20",
      description: "Artificial intelligence and machine learning",
    },
    dataviz: {
      label: "Data Viz",
      icon: "📊",
      color: "bg-accent/10 text-accent-foreground border-accent/20",
      description: "Data visualization and analytics dashboard",
    },
    devtool: {
      label: "Dev Tool",
      icon: "🛠️",
      color: "bg-muted text-muted-foreground border-border",
      description: "Developer productivity tool or utility",
    },
  };

  const category =
    categoryConfig[projectType.category as keyof typeof categoryConfig];

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const handleMouseEnter = (event: React.MouseEvent, content: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      content,
      isVisible: true,
      position: { x: rect.left + rect.width / 2, y: rect.top },
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, isVisible: false }));
  };

  if (!category) return null;

  return (
    <>
      <Tooltip
        content={tooltip.content}
        isVisible={tooltip.isVisible}
        position={tooltip.position}
      />

      <div className="flex flex-wrap gap-2">
        {/* Main Category Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} font-medium rounded-full border ${category.color} cursor-help transition-all duration-200 hover:scale-105 hover:shadow-md`}
          onMouseEnter={(e) => handleMouseEnter(e, category.description)}
          onMouseLeave={handleMouseLeave}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </motion.div>
      </div>
    </>
  );
}
