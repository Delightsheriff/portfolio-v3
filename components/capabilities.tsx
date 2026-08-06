import { ScrollReveal } from "./animations/scroll-reveal";
import type { Profile } from "@/interface/sanity";
import { Badge } from "@/components/ui/badge";

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
          {cards.map((skill, i) => (
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
                <div className="flex flex-wrap gap-1.5 mt-auto" role="group" aria-label={`${skill.category} stack`}>
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
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
