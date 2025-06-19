import React from "react";
import { ScrollReveal } from "./animations/scroll-reveal";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity";
import { About } from "@/interface/sanity";

export default function AboutSection({ about }: { about: About }) {
  return (
    <>
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
                      <p key={index} className="text-gray-300 leading-relaxed">
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
    </>
  );
}
