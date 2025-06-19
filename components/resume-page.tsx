"use client";

import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import GoBack from "./go-back";
import { CustomCursor } from "./animations/custom-cursor";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";

export function ResumePage() {
  const handleDownload = () => {
    // Here you would link to your actual resume PDF
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Make sure to add your resume.pdf to the public folder
    link.download = "Amadi-Sheriff-Delight-Resume.pdf";
    link.click();
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-[#FDFBF6] text-[#111111]">
        {/* Enhanced Navigation with Blur */}
        <GoBack />

        {/* Header */}
        <section className="pt-24 pb-12 px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center space-y-8"
            >
              <h1 className="text-4xl md:text-6xl font-serif">Resume</h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Senior Software Engineer with 5+ years of experience building
                scalable web applications and leading development teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF471A] text-white rounded-full hover:bg-[#e63d17] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <a
                  href="mailto:hello@amadisheriff.dev?subject=Let's work together&body=Hi Amadi-Sheriff,%0D%0A%0D%0AI'd love to discuss a potential opportunity with you.%0D%0A%0D%0ABest regards,"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#FF471A] text-[#FF471A] rounded-full hover:bg-[#FF471A] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resume Content */}
        <section className="py-12 px-6 md:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-serif">Amadi-Sheriff Delight</h2>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <span>Lagos, Nigeria</span>
                  <a
                    href="mailto:hello@amadisheriff.dev"
                    className="hover:text-[#FF471A] transition-colors"
                  >
                    hello@amadisheriff.dev
                  </a>
                  <a
                    href="https://amadisheriff.dev"
                    className="hover:text-[#FF471A] transition-colors"
                  >
                    amadisheriff.dev
                  </a>
                </div>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://github.com/amadisheriff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF471A] transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/amadisheriff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF471A] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Summary */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-4">
                  Professional Summary
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Passionate Senior Software Engineer with 5+ years of
                  experience in full-stack development, specializing in React,
                  Node.js, and cloud technologies. Proven track record of
                  leading development teams, architecting scalable solutions,
                  and delivering high-quality products that serve thousands of
                  users. Strong advocate for clean code, user-centered design,
                  and continuous learning.
                </p>
              </div>
            </ScrollReveal>

            {/* Experience */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-6">
                  Professional Experience
                </h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h4 className="font-medium">
                          Senior Software Engineer
                        </h4>
                        <p className="text-gray-600">TechCorp Solutions</p>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">
                        2022 - Present
                      </span>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>
                        • Led development of fintech platform serving 50,000+
                        users, reducing transaction processing time by 75%
                      </li>
                      <li>
                        • Architected microservices infrastructure using
                        Node.js, Docker, and AWS, improving system scalability
                      </li>
                      <li>
                        • Mentored junior developers and established code review
                        processes, improving team productivity by 40%
                      </li>
                      <li>
                        • Implemented automated testing and CI/CD pipelines,
                        reducing deployment time from hours to minutes
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h4 className="font-medium">Full Stack Developer</h4>
                        <p className="text-gray-600">StartupXYZ</p>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">
                        2020 - 2022
                      </span>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>
                        • Built responsive e-commerce platform using React and
                        Next.js, achieving 300% increase in conversion rates
                      </li>
                      <li>
                        • Developed RESTful APIs and integrated third-party
                        services including Stripe and SendGrid
                      </li>
                      <li>
                        • Optimized application performance, reducing page load
                        times by 60%
                      </li>
                      <li>
                        • Collaborated with design team to implement
                        pixel-perfect UI components
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h4 className="font-medium">Frontend Developer</h4>
                        <p className="text-gray-600">Digital Agency Pro</p>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">
                        2019 - 2020
                      </span>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>
                        • Developed custom WordPress themes and React
                        applications for 20+ client projects
                      </li>
                      <li>
                        • Implemented responsive designs and ensured
                        cross-browser compatibility
                      </li>
                      <li>
                        • Collaborated with clients to gather requirements and
                        provide technical consultation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Skills */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-6">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Frontend</h4>
                    <p className="text-sm text-gray-700">
                      React, Next.js, TypeScript, JavaScript, HTML5, CSS3,
                      Tailwind CSS, Sass
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Backend</h4>
                    <p className="text-sm text-gray-700">
                      Node.js, Express.js, Python, FastAPI, RESTful APIs,
                      GraphQL
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Database</h4>
                    <p className="text-sm text-gray-700">
                      PostgreSQL, MongoDB, Redis, Prisma, Mongoose
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Cloud & DevOps</h4>
                    <p className="text-sm text-gray-700">
                      AWS, Docker, Vercel, Netlify, CI/CD, GitHub Actions
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-6">Education</h3>
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4 className="font-medium">
                        Bachelor of Science in Computer Science
                      </h4>
                      <p className="text-gray-600">University of Lagos</p>
                    </div>
                    <span className="text-sm text-gray-500 font-mono">
                      2015 - 2019
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    First Class Honours • Relevant Coursework: Data Structures,
                    Algorithms, Software Engineering, Database Systems
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Certifications */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-6">Certifications</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    • AWS Certified Solutions Architect - Associate (2023)
                  </div>
                  <div>• Google Cloud Professional Cloud Architect (2022)</div>
                  <div>
                    • Meta React Developer Professional Certificate (2021)
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-8 bg-[#111111] text-[#FDFBF6]">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-serif">
                  Let&apos;s work together
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  I&apos;m currently open to new opportunities and interesting
                  projects. Let&apos;s discuss how I can help bring your ideas
                  to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton
                    href="mailto:hello@amadisheriff.dev?subject=Let's work together&body=Hi Amadi-Sheriff,%0D%0A%0D%0AI'd love to discuss a potential opportunity with you.%0D%0A%0D%0ABest regards,"
                    variant="light"
                  >
                    Send Email
                  </MagneticButton>
                  <MagneticButton href="/#contact" variant="outline">
                    View Portfolio
                  </MagneticButton>
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
