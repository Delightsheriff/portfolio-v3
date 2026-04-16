"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type {
  About,
  Experience,
  Hero,
  Project,
  VideoPitch,
} from "@/interface/sanity";
import { CustomCursor } from "./animations/custom-cursor";
import Navbar from "./nav/navbar";
import HeroSection from "./hero";
import Works from "./works";
import Experiences from "./experience";
import AboutSection from "./about";
import Contact from "./contact";
import Video from "./video";
import Footer from "./nav/footer";

interface HomePageProps {
  projects: Project[];
  about: About;
  hero: Hero;
  experiences: Experience[];
  videoPitch: VideoPitch;
  allProjects: Project[];
}

export function HomePage({
  projects,
  about,
  hero,
  experiences,
  videoPitch,
  allProjects,
}: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <>
      <CustomCursor />
      <div
        ref={containerRef}
        className="min-h-screen bg-background text-foreground overflow-hidden"
      >
        <Navbar />
        <main id="main-content">
          <HeroSection hero={hero} y={y} />
          {videoPitch?.enabled && <Video {...videoPitch} />}
          <Works projects={projects} allProjects={allProjects} />
          <Experiences experiences={experiences} />
          <AboutSection about={about} />
          <Contact about={about} />
        </main>
        <Footer />
      </div>
    </>
  );
}
