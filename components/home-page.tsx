"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  About,
  Experience,
  Hero,
  Project,
  VideoPitch,
} from "@/interface/sanity";
import { CustomCursor } from "./animations/custom-cursor";
import Navbar from "./navbar";
import HeroSection from "./hero";
import Works from "./works";
import Experiences from "./experience";
import AboutSection from "./about";
import Contact from "./contact";
import Video from "./video";

interface HomePageProps {
  projects: Project[];
  about: About;
  hero: Hero;
  experiences: Experience[];
  videoPitch: VideoPitch;
}

export function HomePage({
  projects,
  about,
  hero,
  experiences,
  videoPitch,
}: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <>
      <CustomCursor />
      <div
        ref={containerRef}
        className="min-h-screen bg-[#FDFBF6] text-[#111111] overflow-hidden"
      >
        {/* Enhanced Navigation with Blur */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection hero={hero} y={y} />

        {/* Video Pitch Section */}
        {videoPitch?.enabled && <Video {...videoPitch} />}

        {/* Featured Work Section */}
        <Works projects={projects} />

        {/* Experience Section */}
        <Experiences experiences={experiences} />

        {/* About Section */}
        <AboutSection about={about} />

        {/* Contact Section - Simplified with Direct Email */}
        <Contact about={about} />

        {/* Footer */}
        <footer className="py-8 px-6 md:px-8 border-t border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
            <div>© {new Date().getFullYear()} Amadi-Sheriff Delight</div>
            <div className="font-mono">Crafted with intention</div>
          </div>
        </footer>
      </div>
    </>
  );
}
