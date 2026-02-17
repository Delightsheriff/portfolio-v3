import { ScrollReveal } from "./animations/scroll-reveal";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity";
import type { About } from "@/interface/sanity";

export default function AboutSection({ about }: { about: About }) {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {/* Image */}
            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[3/4] bg-muted rounded-sm overflow-hidden">
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

            {/* Content */}
            <div className="col-span-12 md:col-span-6 md:col-start-7 space-y-10">
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  About
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                  {about.title || "Manifesto"}
                </h2>
                <div className="space-y-4">
                  {about.manifesto.map((block, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {block.children?.[0]?.text || ""}
                    </p>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-5">
                <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  Core Expertise
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {about.skills.map((skillGroup, index) => (
                    <div key={index} className="space-y-2">
                      <div className="text-sm font-medium text-foreground">
                        {skillGroup.category}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {skillGroup.items.map((skill, i) => (
                          <div key={i}>{skill}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
