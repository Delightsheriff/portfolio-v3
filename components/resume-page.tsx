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
    // Ensure asset has a url property, otherwise handle gracefully
    const url = (resumeData.resumeFile?.asset as { url?: string })?.url;
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background text-foreground">
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
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {resumeData.headline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <a
                  href={`mailto:${resumeData.email}?subject=Let's work together`}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
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
                <h2 className="text-2xl font-serif">{resumeData.name}</h2>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <span>{resumeData.location}</span>
                  <a
                    href={`mailto:${resumeData.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {resumeData.email}
                  </a>
                  <a
                    href={resumeData.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {/* Remove protocol for cleaner look */}
                    {resumeData.websiteUrl.replace(
                      /^(https?:\/\/)?(www\.)?/,
                      ""
                    )}
                  </a>
                </div>
                <div className="flex justify-center gap-4">
                  {resumeData.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {/* You'll need a component or function to render the correct icon */}
                      {social.platform === "github" && (
                        <Github className="w-5 h-5" />
                      )}
                      {social.platform === "linkedin" && (
                        <Linkedin className="w-5 h-5" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Summary */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-4">
                  Professional Profile
                </h3>
                <p className="text-foreground leading-relaxed">
                  {resumeData.professionalProfile}
                </p>
              </div>
            </ScrollReveal>

            {/* Experience */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-6">Work Experience</h3>
                <div className="space-y-8">
                  {resumeData.workExperience.map((job, index) => (
                    <div key={index}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <div>
                          <h4 className="font-medium">{job.role}</h4>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground font-mono">
                          {job.period}
                        </span>
                      </div>
                      <ul className="text-sm text-foreground space-y-2 ml-4 list-disc marker:text-primary">
                        {job.achievements.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Skills */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-6">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {resumeData.technicalSkills.map((skill, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">{skill.category}</h4>
                      <p className="text-sm text-foreground">
                        {skill.skillsList}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-6">Education</h3>
                {resumeData.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-muted-foreground">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">
                        {edu.period}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Certifications */}
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-serif mb-6">Certifications</h3>
                <div className="space-y-2 text-sm text-foreground list-disc ml-4 marker:text-primary">
                  {resumeData.certifications.map((cert, index) => (
                    <div key={index}>• {cert}</div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-8 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-serif">
                  Let&apos;s work together
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  I&apos;m currently open to new opportunities and interesting
                  projects. Let&apos;s discuss how I can help bring your ideas
                  to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <MagneticButton
                    href={`mailto:${resumeData.email}?subject=Let's work together`}
                    variant="light"
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

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
