"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function GoBack() {
  const [scrolled, setScrolled] = useState(false);

  // Handle navigation blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 p-6 md:p-8 transition-all duration-300 ${
          scrolled
            ? "bg-[#FDFBF6]/80 backdrop-blur-xl border-b border-gray-200/20 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-[#FF471A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/"
            className="text-sm font-mono tracking-wider hover:text-[#FF471A] transition-colors"
          >
            DS
          </Link>
        </div>
      </motion.nav>
    </>
  );
}
