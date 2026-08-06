"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type {
  Experience,
  Profile,
  Project,
  ProjectGroup,
} from "@/interface/sanity";
import Navbar from "./nav/navbar";
import HeroSection from "./hero";
import Works from "./works";
import Experiences from "./experience";
import AboutSection from "./about";
import Contact from "./contact";
import Capabilities from "./capabilities";
import { FlagshipCaseStudy } from "./flagship-case-study";
import Footer from "./nav/footer";
import { urlFor } from "@/sanity/sanity";

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
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground overflow-hidden relative"
    >
      <Navbar />
      <main id="main-content">
        <HeroSection profile={profile} y={y} />
        <Capabilities profile={profile} />
        <FlagshipCaseStudy groups={groups} urlFor={urlFor} />
        <Works projects={projects} allProjects={allProjects} groups={groups} />
        <Experiences experiences={experiences} />
        <AboutSection profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </div>
  );
}
