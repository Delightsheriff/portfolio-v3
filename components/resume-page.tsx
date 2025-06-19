"use client";

import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import GoBack from "./go-back";
import { CustomCursor } from "./animations/custom-cursor";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import { Resume } from "@/interface/sanity";

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
                {resumeData.headline}
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
                  href={`mailto:${resumeData.email}?subject=Let's work together`}
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
                <h2 className="text-2xl font-serif">{resumeData.name}</h2>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <span>{resumeData.location}</span>
                  <a
                    href={`mailto:${resumeData.email}`}
                    className="hover:text-[#FF471A] transition-colors"
                  >
                    {resumeData.email}
                  </a>
                  <a
                    href={resumeData.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF471A] transition-colors"
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
                      className="hover:text-[#FF471A] transition-colors"
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
                <p className="text-gray-700 leading-relaxed">
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
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                        <span className="text-sm text-gray-500 font-mono">
                          {job.period}
                        </span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-2 ml-4 list-disc marker:text-[#FF471A]">
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
                      <p className="text-sm text-gray-700">
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
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">
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
                <div className="space-y-2 text-sm text-gray-700 list-disc ml-4 marker:text-[#FF471A]">
                  {resumeData.certifications.map((cert, index) => (
                    <div key={index}>• {cert}</div>
                  ))}
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
