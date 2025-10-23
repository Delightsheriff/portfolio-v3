import { ScrollReveal } from "./animations/scroll-reveal";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity";
import type { About } from "@/interface/sanity";

export default function AboutSection({ about }: { about: About }) {
  return (
    <>
      <section
        id="about"
        className="py-20 md:py-32 px-6 md:px-8 bg-secondary text-secondary-foreground"
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-12 md:col-span-5">
                <div className="relative aspect-[3/4] bg-muted rounded-sm overflow-hidden">
                  <Image
                    src={
                      urlFor(about.profileImage).url() ||
                      "/placeholder.svg?height=800&width=600" ||
                      "/placeholder.svg"
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
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
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

                <div className="space-y-4">
                  <h3 className="text-xl font-serif">Core Expertise</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm font-mono text-muted-foreground">
                    {about.skills.map((skillGroup, index) => (
                      <div key={index}>
                        <div className="text-foreground mb-2">
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
