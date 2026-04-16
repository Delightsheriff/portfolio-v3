"use client";

import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import GoBack from "./go-back";
import { ScrollReveal } from "./animations/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
      <div className="min-h-screen bg-background text-foreground">
        <GoBack />
        <main id="main-content">

        {/* Header */}
        <section className="pt-28 pb-8 px-5 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Resume
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                {resumeData.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {resumeData.headline}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-highlight transition-colors"
                  aria-label="Download resume as PDF"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download PDF
                </button>
                <a
                  href={`mailto:${resumeData.email}?subject=Let's work together`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm hover:border-foreground transition-colors"
                  aria-label="Send email to contact"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resume Content */}
        <section className="py-12 px-5 md:px-8">
          <div className="max-w-4xl mx-auto space-y-0">

            {/* Contact & Socials */}
            <ScrollReveal>
              <div className="py-5 border-y border-border mb-16">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  {resumeData.location && <span>{resumeData.location}</span>}
                  {resumeData.email && (
                    <a
                      href={`mailto:${resumeData.email}`}
                      className="hover:text-highlight transition-colors"
                    >
                      {resumeData.email}
                    </a>
                  )}
                  {resumeData.websiteUrl && (
                    <a
                      href={resumeData.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-highlight transition-colors"
                    >
                      {resumeData.websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, "")}
                    </a>
                  )}
                  <div className="flex gap-3 sm:ml-auto">
                    {resumeData.socialLinks?.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.platform === "github" ? "GitHub" : social.platform === "linkedin" ? "LinkedIn" : social.platform} profile`}
                        className="text-muted-foreground hover:text-highlight transition-colors"
                      >
                        {social.platform === "github" && <Github className="w-4 h-4" aria-hidden="true" />}
                        {social.platform === "linkedin" && <Linkedin className="w-4 h-4" aria-hidden="true" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Professional Profile */}
            {resumeData.professionalProfile && (
              <ScrollReveal>
                <ResumeSection label="Profile">
                  <p className="text-foreground/90 leading-relaxed">
                    {resumeData.professionalProfile as unknown as string}
                  </p>
                </ResumeSection>
              </ScrollReveal>
            )}

            <Separator className="my-16" />

            {/* Experience */}
            {resumeData.workExperience?.length > 0 && (
              <ScrollReveal>
                <ResumeSection label="Experience">
                  <div className="space-y-10">
                    {resumeData.workExperience.map((job, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                          <div>
                            <h3 className="text-base font-medium">{job.role}</h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                            {job.period}
                          </span>
                        </div>
                        <ul className="space-y-2" aria-label={`Achievements at ${job.company}`}>
                          {job.achievements.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-foreground/80">
                              <div className="w-1.5 h-1.5 bg-highlight/70 rounded-full mt-1.5 flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              </ScrollReveal>
            )}

            <Separator className="my-16" />

            {/* Skills */}
            {resumeData.technicalSkills?.length > 0 && (
              <ScrollReveal>
                <ResumeSection label="Skills">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {resumeData.technicalSkills.map((skill, i) => (
                      <div key={i} className="space-y-2.5">
                        <h3 className="text-sm font-medium">{skill.category}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {String(skill.skillsList)
                            .split(",")
                            .map((s: string) => s.trim())
                            .filter(Boolean)
                            .map((s: string, j: number) => (
                              <Badge key={j} variant="secondary" className="text-xs">
                                {s}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              </ScrollReveal>
            )}

            <Separator className="my-16" />

            {/* Education */}
            {resumeData.education?.length > 0 && (
              <ScrollReveal>
                <ResumeSection label="Education">
                  <div className="space-y-6">
                    {resumeData.education.map((edu, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1"
                      >
                        <div>
                          <h3 className="text-base font-medium">{edu.degree}</h3>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                          {edu.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              </ScrollReveal>
            )}

            <Separator className="my-16" />

            {/* Certifications */}
            {resumeData.certifications?.length > 0 && (
              <ScrollReveal>
                <ResumeSection label="Certifications">
                  <ul className="space-y-2.5" aria-label="Certifications list">
                    {resumeData.certifications.map((cert, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 bg-highlight/70 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </ResumeSection>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-5 md:px-8 bg-muted mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">
                  Let&apos;s work{" "}
                  <span className="text-highlight">together</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Open to new opportunities and interesting projects. Let&apos;s
                  discuss how I can help bring your ideas to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`mailto:${resumeData.email}?subject=Let's work together`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-highlight transition-colors"
                    aria-label="Send an email to start collaboration"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Send Email
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium hover:border-foreground hover:bg-background transition-colors group"
                    aria-label="View portfolio"
                  >
                    View Portfolio
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        </main>
        <Footer />
      </div>
    </>
  );
}

function ResumeSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
      <div className="md:col-span-3">
        <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="md:col-span-8 md:col-start-5">{children}</div>
    </div>
  );
}
