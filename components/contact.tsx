import React from "react";
import { ScrollReveal } from "./animations/scroll-reveal";
import { MagneticButton } from "./animations/magnetic-button";
import { About } from "@/interface/sanity";
import { Linkedin, Github } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";

export default function Contact({ about }: { about: About }) {
  return (
    <>
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
                    I thrive on turning ambitious ideas into reality. I&apos;m
                    currently seeking a full-time role with a forward-thinking
                    team where I can take on significant ownership and
                    contribute to building impactful, user-centric products. If
                    you&apos;re building the future, whether at a high-growth
                    startup or an established innovator, I&apos;d love to
                    discuss how I can help.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <MagneticButton
                      href={`mailto:${about.email}?subject=Let's work together&body=Hi Amadi-Sheriff,%0D%0A%0D%0AI'd love to discuss a potential opportunity with you.%0D%0A%0D%0ABest regards,`}
                    >
                      Get In Touch
                    </MagneticButton>

                    <div className="flex gap-4 items-center">
                      {about.socialLinks.map((link, index) => {
                        if (link.platform === "twitter") {
                          return (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 border border-gray-200 rounded-full hover:border-[#FF471A] hover:text-[#FF471A] transition-colors"
                            >
                              <RiTwitterXFill className="w-5 h-5" />
                            </a>
                          );
                        }

                        let Icon = Linkedin;
                        if (link.platform === "github") Icon = Github;

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
    </>
  );
}
