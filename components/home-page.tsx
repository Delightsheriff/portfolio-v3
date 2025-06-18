/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Linkedin,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { About, Hero, Project } from "@/interface/sanity";
import { CustomCursor } from "./animations/custom-cursor";
import { MagneticButton } from "./animations/magnetic-button";
import { ScrollReveal } from "./animations/scroll-reveal";
import { ProjectCard } from "./project-card";
import { urlFor } from "@/sanity/sanity";

interface HomePageProps {
  projects: Project[];
  about: About;
  hero: Hero;

  // urlFor: (source: any) => any;
}

export function HomePage({ projects, about, hero }: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Handle navigation blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split the headline into words
  const headlineWords = hero?.headline?.split(" ") || [];

  // Experience data - this could also come from Sanity CMS
  const experiences = [
    {
      id: "1",
      company: "TechCorp Solutions",
      role: "Senior Software Engineer",
      period: "2022 - Present",
      location: "Remote",
      type: "Full-time",
      description:
        "Leading development of fintech platforms serving 50,000+ users. Architecting scalable microservices infrastructure and mentoring junior developers.",
      achievements: [
        "Reduced transaction processing time by 75%",
        "Improved team productivity by 40% through code review processes",
        "Led migration to microservices architecture",
        "Implemented automated testing and CI/CD pipelines",
      ],
      technologies: [
        "React",
        "Node.js",
        "TypeScript",
        "AWS",
        "Docker",
        "PostgreSQL",
      ],
    },
    {
      id: "2",
      company: "StartupXYZ",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description:
        "Built responsive e-commerce platforms and developed RESTful APIs. Collaborated with design teams to implement pixel-perfect UI components.",
      achievements: [
        "Achieved 300% increase in conversion rates",
        "Reduced page load times by 60%",
        "Integrated multiple third-party services",
        "Delivered 15+ client projects on time",
      ],
      technologies: ["React", "Next.js", "Stripe", "MongoDB", "Express.js"],
    },
    {
      id: "3",
      company: "Digital Agency Pro",
      role: "Frontend Developer",
      period: "2019 - 2020",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description:
        "Developed custom WordPress themes and React applications for diverse client projects. Ensured cross-browser compatibility and responsive designs.",
      achievements: [
        "Completed 20+ client projects successfully",
        "Improved client satisfaction scores by 35%",
        "Reduced development time by implementing reusable components",
        "Mentored 2 junior developers",
      ],
      technologies: ["JavaScript", "WordPress", "React", "CSS3", "PHP"],
    },
  ];

  return (
    <>
      <CustomCursor />
      <div
        ref={containerRef}
        className="min-h-screen bg-[#FDFBF6] text-[#111111] overflow-hidden"
      >
        {/* Enhanced Navigation with Blur */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`fixed top-0 left-0 right-0 z-50 p-6 md:p-8 transition-all duration-300 ${
            scrolled
              ? "bg-[#FDFBF6]/80 backdrop-blur-xl border-b border-gray-200/20 shadow-sm"
              : "bg-transparent"
          }`}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Link
              href="/"
              className="text-sm font-mono tracking-wider hover:text-[#FF471A] transition-colors"
            >
              DS
            </Link>
            <div className="flex gap-6 text-sm items-center">
              <Link
                href="#work"
                className="hover:text-[#FF471A] transition-colors"
              >
                Work
              </Link>
              <Link
                href="#experience"
                className="hover:text-[#FF471A] transition-colors"
              >
                Experience
              </Link>
              <Link
                href="#about"
                className="hover:text-[#FF471A] transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="hover:text-[#FF471A] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/resume"
                className="px-4 py-2 bg-[#FF471A] text-white rounded-full hover:bg-[#e63d17] transition-colors text-xs"
              >
                Resume
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative px-6 md:px-8">
          <motion.div
            style={{ y }}
            className="max-w-7xl mx-auto grid grid-cols-12 gap-4 md:gap-8 w-full"
          >
            <div className="col-span-12 md:col-span-8 md:col-start-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  {headlineWords.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.8 + index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="inline-block text-4xl md:text-6xl lg:text-7xl font-serif leading-[0.9] mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="text-lg md:text-xl max-w-2xl text-gray-600 leading-relaxed"
                >
                  {hero?.subheadline}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  <MagneticButton href={hero?.ctaLink || "#work"}>
                    {hero?.ctaText || "View My Work"}
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col justify-end space-y-4 mt-12 md:mt-0"
            >
              <div className="text-xs font-mono text-gray-500 space-y-2">
                <div>{hero?.status}</div>
                <div>{hero?.location}</div>
                <div>Open to remote opportunities</div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Work Section */}
        <section id="work" className="py-20 md:py-32 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16">
                <div className="col-span-12 md:col-span-4">
                  <h2 className="text-3xl md:text-4xl font-serif">
                    Selected Work
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <p className="text-gray-600 leading-relaxed">
                    A curated collection of projects that showcase my approach
                    to solving complex technical challenges while maintaining
                    exceptional user experience.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Project Grid */}
            <div className="space-y-20 md:space-y-32">
              {projects.slice(0, 3).map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  urlFor={urlFor}
                />
              ))}
            </div>

            {/* View All Projects Button */}
            <ScrollReveal>
              <div className="text-center mt-20">
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <MagneticButton href="/projects" variant="outline">
                    View All Projects ({projects.length})
                  </MagneticButton>
                  <a
                    href="https://github.com/amadisheriff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm hover:text-[#FF471A] transition-colors group"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Profile</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-20 md:py-32 px-6 md:px-8 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8 mb-16">
                <div className="col-span-12 md:col-span-4">
                  <h2 className="text-3xl md:text-4xl font-serif">
                    Professional Journey
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <p className="text-gray-600 leading-relaxed">
                    Over 5 years of experience building scalable applications,
                    leading development teams, and delivering impactful
                    solutions across fintech, e-commerce, and enterprise
                    software.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <ScrollReveal key={experience.id} delay={index * 0.1}>
                  <div className="grid grid-cols-12 gap-4 md:gap-8 group">
                    {/* Timeline */}
                    <div className="col-span-12 md:col-span-3">
                      <div className="space-y-2">
                        <div className="text-sm font-mono text-gray-500">
                          {experience.period}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{experience.location}</span>
                          <span>•</span>
                          <span>{experience.type}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-12 md:col-span-8 md:col-start-5">
                      <div className="bg-white p-6 md:p-8 rounded-sm border border-gray-200 group-hover:border-[#FF471A]/20 group-hover:shadow-lg transition-all duration-300">
                        <div className="space-y-6">
                          {/* Header */}
                          <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-serif group-hover:text-[#FF471A] transition-colors">
                              {experience.role}
                            </h3>
                            <div className="text-gray-600 font-medium">
                              {experience.company}
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                              {experience.description}
                            </p>
                          </div>

                          {/* Key Achievements */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {experience.achievements.map((achievement, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-sm text-gray-700"
                                >
                                  <div className="w-1.5 h-1.5 bg-[#FF471A] rounded-full mt-2 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-mono text-gray-500 uppercase tracking-wider">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-gray-100 text-xs font-mono rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <ScrollReveal>
              <div className="text-center mt-16">
                <MagneticButton href="/resume" variant="outline">
                  View Full Resume
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 md:py-32 px-6 md:px-8 bg-[#111111] text-[#FDFBF6]"
        >
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-5">
                  <div className="relative aspect-[3/4] bg-gray-800 rounded-sm overflow-hidden">
                    <Image
                      src={
                        urlFor(about.profileImage).url() ||
                        "/placeholder.svg?height=800&width=600"
                      }
                      alt="Amadi-Sheriff Delight"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif">
                      {about.title || "Manifesto"}
                    </h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      {about.manifesto.map((block, index) => (
                        <p
                          key={index}
                          className="text-gray-300 leading-relaxed"
                        >
                          {block.children?.[0]?.text || ""}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-serif">Core Expertise</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm font-mono text-gray-400">
                      {about.skills.map((skillGroup, index) => (
                        <div key={index}>
                          <div className="text-[#FDFBF6] mb-2">
                            {skillGroup.category}
                          </div>
                          {skillGroup.items.map((skill, i) => (
                            <div key={i}>{skill}</div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section - Simplified with Direct Email */}
        <section id="contact" className="py-20 md:py-32 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
                  <div className="space-y-8">
                    <h2 className="text-4xl md:text-6xl font-serif">
                      Let&apos;s create something exceptional together.
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                      I&apos;m currently open to new opportunities and
                      interesting projects. Whether you&apos;re looking for a
                      technical co-founder, senior engineer, or consultant,
                      I&apos;d love to hear from you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <MagneticButton
                        href={`mailto:${about.email}?subject=Let's work together&body=Hi Amadi-Sheriff,%0D%0A%0D%0AI'd love to discuss a potential opportunity with you.%0D%0A%0D%0ABest regards,`}
                      >
                        Get In Touch
                      </MagneticButton>

                      <div className="flex gap-4 items-center">
                        {about.socialLinks.map((link, index) => {
                          let Icon = Linkedin;
                          if (link.platform === "github") Icon = Github;
                          if (link.platform === "twitter") Icon = ExternalLink;

                          return (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 border border-gray-200 rounded-full hover:border-[#FF471A] hover:text-[#FF471A] transition-colors"
                            >
                              <Icon className="w-5 h-5" />
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                        <div>
                          <div className="font-mono text-gray-500 mb-2">
                            Email
                          </div>
                          <a
                            href={`mailto:${about.email}`}
                            className="hover:text-[#FF471A] transition-colors"
                          >
                            {about.email}
                          </a>
                        </div>
                        <div>
                          <div className="font-mono text-gray-500 mb-2">
                            Response Time
                          </div>
                          <div>Usually within 24 hours</div>
                        </div>
                        <div>
                          <div className="font-mono text-gray-500 mb-2">
                            Availability
                          </div>
                          <div>Open to new opportunities</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

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
