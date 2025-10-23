"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface KeyFeaturesBadgeProps {
  features: string[];
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

export function KeyFeaturesBadge({
  features,
  size = "md",
}: KeyFeaturesBadgeProps) {
  const [tooltip, setTooltip] = useState<{
    content: string;
    isVisible: boolean;
    position: { x: number; y: number };
  }>({
    content: "",
    isVisible: false,
    position: { x: 0, y: 0 },
  });

  const featuresConfig: Record<
    string,
    { label: string; icon: string; description: string }
  > = {
    auth: {
      label: "User Authentication",
      icon: "🔐",
      description: "Secure user login and registration system",
    },
    payments: {
      label: "Payment Processing",
      icon: "💳",
      description: "Integrated payment gateway for transactions",
    },
    realtime: {
      label: "Real-time Data",
      icon: "📊",
      description: "Live data updates and real-time synchronization",
    },
    search: {
      label: "Search & Filtering",
      icon: "🔍",
      description: "Advanced search functionality with filters",
    },
    responsive: {
      label: "Responsive Design",
      icon: "📱",
      description: "Mobile-first responsive layout design",
    },
    api: {
      label: "API Integration",
      icon: "🌐",
      description: "External API integrations and data exchange",
    },
    analytics: {
      label: "Analytics & Tracking",
      icon: "📈",
      description: "User behavior analytics and performance tracking",
    },
    notifications: {
      label: "Push Notifications",
      icon: "🔔",
      description: "Real-time push notification system",
    },
    "custom-ui": {
      label: "Custom UI/UX",
      icon: "🎨",
      description: "Bespoke user interface and experience design",
    },
    performance: {
      label: "Performance Optimized",
      icon: "⚡",
      description: "Optimized for speed and performance",
    },
    security: {
      label: "Security Features",
      icon: "🔒",
      description: "Advanced security measures and data protection",
    },
    "file-management": {
      label: "File Upload/Management",
      icon: "📤",
      description: "File upload, storage, and management system",
    },
    "ai-integration": {
      label: "AI/ML Integration",
      icon: "🤖",
      description: "Artificial intelligence and machine learning features",
    },
    email: {
      label: "Email Integration",
      icon: "📧",
      description: "Email service integration and automation",
    },
    i18n: {
      label: "Multi-language Support",
      icon: "🌍",
      description: "Internationalization and multi-language support",
    },
    pwa: {
      label: "PWA Features",
      icon: "📱",
      description: "Progressive Web App capabilities",
    },
    "background-jobs": {
      label: "Background Jobs",
      icon: "🔄",
      description: "Asynchronous background task processing",
    },
    admin: {
      label: "Dashboard & Admin",
      icon: "📊",
      description: "Administrative dashboard and management tools",
    },
  };

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

  if (!features || features.length === 0) return null;

  return (
    <>
      <Tooltip
        content={tooltip.content}
        isVisible={tooltip.isVisible}
        position={tooltip.position}
      />

      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => {
          const featureConfig = featuresConfig[feature];
          if (!featureConfig) return null;

          return (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} font-medium rounded-full border bg-muted text-muted-foreground border-border cursor-help transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-accent hover:text-accent-foreground`}
              onMouseEnter={(e) =>
                handleMouseEnter(e, featureConfig.description)
              }
              onMouseLeave={handleMouseLeave}
            >
              <span>{featureConfig.icon}</span>
              <span className="hidden sm:inline">{featureConfig.label}</span>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
