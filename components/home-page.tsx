"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type {
  Experience,
  Profile,
  Project,
  ProjectGroup,
} from "@/interface/sanity";
import { CustomCursor } from "./animations/custom-cursor";
import Navbar from "./nav/navbar";
import HeroSection from "./hero";
import Works from "./works";
import Experiences from "./experience";
import AboutSection from "./about";
import Contact from "./contact";
import StatsStrip from "./stats-strip";
import Footer from "./nav/footer";

interface HomePageProps {
  projects: Project[];
  profile: Profile;
  experiences: Experience[];
  allProjects: Project[];
  groups: ProjectGroup[];
}

export function HomePage({
  projects,
  profile,
  experiences,
  allProjects,
  groups,
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
        className="min-h-screen bg-background text-foreground overflow-hidden relative"
      >
        <Navbar />
        <main id="main-content">
          <HeroSection profile={profile} y={y} />
          <StatsStrip />
          <Works projects={projects} allProjects={allProjects} groups={groups} />
          <Experiences experiences={experiences} />
          <AboutSection profile={profile} />
          <Contact profile={profile} />
        </main>
        <Footer />
      </div>
    </>
  );
}
