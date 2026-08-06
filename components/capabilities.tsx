import { ScrollReveal } from "./animations/scroll-reveal";
import type { Profile } from "@/interface/sanity";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const REPRESENTATIVE_PROJECT: Record<string, { label: string; href: string }> = {
  Frontend: {
    label: "Jessica Iroh — Digital Identity",
    href: "/project/jessica-iroh-portfolio",
  },
  Mobile: {
    label: "DFood — Food Delivery App",
    href: "/project/dfood-food-delivery-mobile-application",
  },
  Backend: {
    label: "Flexride — Car Rental Platform",
    href: "/project/flexride-car-rental-platform-mvp",
  },
};

const CARD_ORDER = ["Frontend", "Mobile", "Backend"];

export default function Capabilities({ profile }: { profile: Profile }) {
  const cards = CARD_ORDER
    .map((category) => profile.skills?.find((s) => s.category === category))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (cards.length === 0) return null;

  return (
    <section
      id="capabilities"
      className="py-20 md:py-28 px-5 md:px-8 bg-card/20 border-y border-border/20"
      aria-label="What I build"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-14 md:mb-20 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/60 mb-3">
              What I Build
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight">
              One engineer, the full stack of a product
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/20 rounded-2xl overflow-hidden">
          {cards.map((skill, i) => {
            const project = REPRESENTATIVE_PROJECT[skill.category];
            return (
              <ScrollReveal key={skill.category} delay={0.08 * i}>
                <div className="h-full bg-background p-8 md:p-9 flex flex-col">
                  <span className="text-xs font-mono text-muted-foreground/50 mb-4">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tight mb-3">
                    {skill.category}
                  </h3>
                  {skill.blurb && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {skill.blurb}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {skill.items.slice(0, 5).map((item, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="text-xs font-mono text-muted-foreground border-border/40"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                  {project && (
                    <Link
                      href={project.href}
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-highlight transition-colors group/link"
                    >
                      {project.label}
                      <ArrowUpRight
                        className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
