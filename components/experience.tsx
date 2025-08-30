import React from "react";
import { ScrollReveal } from "./animations/scroll-reveal";
import { Experience } from "@/interface/sanity";
import { MapPin } from "lucide-react";
import { MagneticButton } from "./animations/magnetic-button";

export default function Experiences({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <>
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
                  With extensive experience in software engineering, my journey
                  blends startup leadership with deep full-stack expertise. I
                  specialize in turning product vision into high-performance,
                  user-centric applications from ideation to execution.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ScrollReveal key={experience._id} delay={index * 0.1}>
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
    </>
  );
}
