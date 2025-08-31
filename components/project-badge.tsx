"use client";

import { motion } from "framer-motion";

interface ProjectBadgeProps {
  projectType: {
    category: string;
    complexity: string;
    features?: string[];
    dataSource: string;
  };
  size?: "sm" | "md" | "lg";
}

export function ProjectBadge({ projectType, size = "md" }: ProjectBadgeProps) {
  const categoryConfig = {
    fullstack: {
      label: "Full-Stack",
      icon: "🚀",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      description: "Complete web application with frontend and backend",
    },
    frontend: {
      label: "Frontend",
      icon: "⚡",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      description: "Client-side application with dynamic interactions",
    },
    static: {
      label: "Static",
      icon: "🎨",
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Static website with no backend dependencies",
    },
    mobile: {
      label: "Mobile",
      icon: "📱",
      color: "bg-pink-100 text-pink-800 border-pink-200",
      description: "Mobile application for iOS/Android",
    },
    backend: {
      label: "Backend",
      icon: "🔧",
      color: "bg-gray-100 text-gray-800 border-gray-200",
      description: "Server-side API and data processing",
    },
    ai: {
      label: "AI/ML",
      icon: "🤖",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      description: "Artificial intelligence and machine learning",
    },
    dataviz: {
      label: "Data Viz",
      icon: "📊",
      color: "bg-cyan-100 text-cyan-800 border-cyan-200",
      description: "Data visualization and analytics dashboard",
    },
    devtool: {
      label: "Dev Tool",
      icon: "🛠️",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      description: "Developer productivity tool or utility",
    },
  };

  const complexityConfig = {
    simple: { label: "Simple", icon: "🟢", color: "text-green-600" },
    moderate: { label: "Moderate", icon: "🟡", color: "text-yellow-600" },
    complex: { label: "Complex", icon: "🟠", color: "text-orange-600" },
    enterprise: { label: "Enterprise", icon: "🔴", color: "text-red-600" },
  };

  const dataSourceConfig = {
    database: { label: "Dynamic Data", icon: "💾" },
    api: { label: "API Driven", icon: "🌐" },
    static: { label: "Static Content", icon: "📄" },
    realtime: { label: "Real-time", icon: "🔄" },
    analytics: { label: "Analytics", icon: "📊" },
    "ai-generated": { label: "AI Generated", icon: "🤖" },
    "user-generated": { label: "User Content", icon: "👥" },
    hybrid: { label: "Hybrid", icon: "🔗" },
  };

  const category =
    categoryConfig[projectType.category as keyof typeof categoryConfig];
  const complexity =
    complexityConfig[projectType.complexity as keyof typeof complexityConfig];
  const dataSource =
    dataSourceConfig[projectType.dataSource as keyof typeof dataSourceConfig];

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  if (!category) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {/* Main Category Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} font-medium rounded-full border ${category.color}`}
        title={category.description}
      >
        <span>{category.icon}</span>
        <span>{category.label}</span>
      </motion.div>

      {/* Complexity Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`inline-flex items-center gap-1 ${sizeClasses[size]} font-medium rounded-full bg-gray-50 text-gray-700 border border-gray-200`}
        title={`Complexity: ${complexity.label}`}
      >
        <span>{complexity.icon}</span>
        <span className="hidden sm:inline">{complexity.label}</span>
      </motion.div>

      {/* Data Source Badge */}
      {dataSource && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`inline-flex items-center gap-1 ${sizeClasses[size]} font-medium rounded-full bg-gray-50 text-gray-700 border border-gray-200`}
          title={`Data: ${dataSource.label}`}
        >
          <span>{dataSource.icon}</span>
          <span className="hidden md:inline">{dataSource.label}</span>
        </motion.div>
      )}
    </div>
  );
}
