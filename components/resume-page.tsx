"use client";

import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import GoBack from "./go-back";
import { CustomCursor } from "./animations/custom-cursor";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import type { Resume } from "@/interface/sanity";
import Footer from "./nav/footer";

export function ResumePage({ resumeData }: { resumeData: Resume }) {
  const handleDownload = () => {
    const url = (resumeData.resumeFile?.asset as { url?: string })?.url;
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background text-foreground">
        <GoBack />

        {/* Header */}
        <section className="pt-32 pb-8 px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Resume
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                {resumeData.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {resumeData.headline}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <a
                  href={`mailto:${resumeData.email}?subject=Let's work together`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm hover:border-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resume Content */}
        <section className="py-16 px-6 md:px-8">
          <div className="max-w-4xl mx-auto space-y-20">
            {/* Contact & Socials */}
            <ScrollReveal>
              <div className="py-6 border-y border-border">
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <span>{resumeData.location}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <a
                    href={`mailto:${resumeData.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {resumeData.email}
                  </a>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <a
                    href={resumeData.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {resumeData.websiteUrl.replace(
                      /^(https?:\/\/)?(www\.)?/,
                      "",
                    )}
                  </a>
                  <div className="flex gap-3 ml-auto">
                    {resumeData.socialLinks.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow on ${social.platform === "github" ? "GitHub" : "LinkedIn"}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {social.platform === "github" && (
                          <Github className="w-4 h-4" aria-hidden="true" />
                        )}
                        {social.platform === "linkedin" && (
                          <Linkedin className="w-4 h-4" aria-hidden="true" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Professional Profile */}
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-3">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    Profile
                  </span>
                </div>
                <div className="col-span-12 md:col-span-8 md:col-start-5">
                  <p className="text-foreground leading-relaxed">
                    {resumeData.professionalProfile}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Experience */}
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-3">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    Experience
                  </span>
                </div>
                <div className="col-span-12 md:col-span-8 md:col-start-5 space-y-10">
                  {resumeData.workExperience.map((job, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
                        <div>
                          <h4 className="text-base font-medium">{job.role}</h4>
                          <p className="text-sm text-muted-foreground">
                            {job.company}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                          {job.period}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {job.achievements.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-foreground/90"
                          >
                            <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Skills */}
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-3">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    Skills
                  </span>
                </div>
                <div className="col-span-12 md:col-span-8 md:col-start-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resumeData.technicalSkills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="text-sm font-medium text-foreground">
                          {skill.category}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {skill.skillsList}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-3">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    Education
                  </span>
                </div>
                <div className="col-span-12 md:col-span-8 md:col-start-5 space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1"
                    >
                      <div>
                        <h4 className="text-base font-medium">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Certifications */}
            <ScrollReveal>
              <div className="grid grid-cols-12 gap-4 md:gap-8">
                <div className="col-span-12 md:col-span-3">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    Certifications
                  </span>
                </div>
                <div className="col-span-12 md:col-span-8 md:col-start-5">
                  <ul className="space-y-2.5">
                    {resumeData.certifications.map((cert, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-foreground/90"
                      >
                        <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-8 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">
                  Let&apos;s work together
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  I&apos;m currently open to new opportunities and interesting
                  projects. Let&apos;s discuss how I can help bring your ideas
                  to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton
                    href={`mailto:${resumeData.email}?subject=Let's work together`}
                  >
                    Send Email
                  </MagneticButton>
                  <MagneticButton href="/" variant="outline">
                    View Portfolio
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
