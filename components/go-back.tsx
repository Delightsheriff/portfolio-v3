"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SparkNextLink } from "./animations/spark-next-link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./nav/theme-toggle";

export default function GoBack() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 py-5">
        <SparkNextLink
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </SparkNextLink>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SparkNextLink
            href="/"
            className="text-sm font-heading font-bold tracking-[0.18em] uppercase hover:text-highlight transition-colors"
          >
            DS.
          </SparkNextLink>
        </div>
      </div>
    </motion.nav>
  );
}
