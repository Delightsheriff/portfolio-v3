import { ScrollReveal } from "./animations/scroll-reveal";
import type { Uses } from "@/interface/sanity";
import { ArrowUpRight } from "lucide-react";
import Navbar from "./nav/navbar";
import Footer from "./nav/footer";
import GoBack from "./go-back";

const FALLBACK_CATEGORIES = [
  {
    name: "Editor & Terminal",
    items: [
      { name: "VS Code", description: "Primary editor. Clean, fast, great TypeScript support." },
      { name: "Zsh + Oh My Zsh", description: "Terminal shell with custom aliases and plugins." },
    ],
  },
  {
    name: "Languages & Runtimes",
    items: [
      { name: "TypeScript", description: "Everything. Web, backend, mobile — all TypeScript." },
      { name: "Node.js", description: "Runtime for backend services and APIs." },
    ],
  },
  {
    name: "Frontend & Mobile",
    items: [
      { name: "Next.js", description: "Primary framework for web applications." },
      { name: "React Native", description: "Cross-platform mobile — iOS and Android from one codebase." },
      { name: "Tailwind CSS", description: "Utility-first CSS. The only way to write styles at speed." },
    ],
  },
  {
    name: "Backend & Infrastructure",
    items: [
      { name: "Node.js / Fastify / Express", description: "REST APIs and backend services." },
      { name: "NestJS", description: "Structured backend architecture for larger projects." },
      { name: "PostgreSQL", description: "Primary database for relational data." },
      { name: "MongoDB", description: "Document store for flexible schemas." },
      { name: "Docker", description: "Containerising services for consistent deployments." },
    ],
  },
  {
    name: "Services & Tooling",
    items: [
      { name: "Supabase", description: "Auth + Postgres — removes a lot of backend boilerplate." },
      { name: "Sanity", description: "Headless CMS. Powers this portfolio." },
      { name: "GitHub Actions", description: "CI/CD pipelines for automated testing and deployment." },
    ],
  },
];

interface UsesPageProps {
  uses: Uses | null;
}

export function UsesPage({ uses }: UsesPageProps) {
  const title = uses?.title ?? "What I Use";
  const description = uses?.description ?? "A living list of the tools, stack, and software I rely on day-to-day. Updated periodically.";
  const categories = uses?.categories && uses.categories.length > 0
    ? uses.categories
    : FALLBACK_CATEGORIES;
  const updatedLabel = uses?.updatedLabel;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <GoBack />
      <main id="main-content" className="pt-28 pb-20 px-5 md:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <ScrollReveal>
            <div className="mb-14 md:mb-18">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/60 mb-4">
                /uses
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight mb-5">
                {title}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                {description}
              </p>
              {updatedLabel && (
                <p className="mt-4 text-xs font-mono text-muted-foreground/50">
                  {updatedLabel}
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* Categories */}
          <div className="space-y-14">
            {categories.map((category, ci) => (
              <ScrollReveal key={ci} delay={ci * 0.06}>
                <section aria-labelledby={`uses-category-${ci}`}>
                  <h2
                    id={`uses-category-${ci}`}
                    className="text-xs font-mono uppercase tracking-[0.25em] text-highlight mb-6 pb-3 border-b border-border/20"
                  >
                    {category.name}
                  </h2>
                  <ul className="space-y-5" role="list">
                    {category.items.map((item, ii) => (
                      <li key={ii} className="group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1 min-w-0">
                            {item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-base font-heading font-semibold text-foreground hover:text-highlight transition-colors"
                              >
                                {item.name}
                                <ArrowUpRight
                                  className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  aria-hidden="true"
                                />
                              </a>
                            ) : (
                              <p className="text-base font-heading font-semibold text-foreground">
                                {item.name}
                              </p>
                            )}
                            {item.description && (
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
