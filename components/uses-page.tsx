import { ScrollReveal } from "./animations/scroll-reveal";
import type { Uses, UsesCategory } from "@/interface/sanity";
import { ArrowUpRight } from "lucide-react";
import Footer from "./nav/footer";
import GoBack from "./go-back";

const FALLBACK_CATEGORIES: UsesCategory[] = [
  {
    name: "Editor & Terminal",
    items: [
      { name: "VS Code", description: "Primary editor. Clean, fast, great TypeScript support.", url: "https://code.visualstudio.com" },
      { name: "Zsh + Oh My Zsh", description: "Terminal shell with custom aliases and plugins.", url: "https://ohmyz.sh" },
    ],
  },
  {
    name: "AI & Developer Tools",
    items: [
      { name: "Claude Code", description: "Agentic coding assistant. My go-to for complex refactors and architecture decisions.", url: "https://claude.ai/code" },
      { name: "OpenCode", description: "Open-source AI coding agent that runs in the terminal.", url: "https://opencode.ai" },
      { name: "Antigravity", description: "AI-powered developer assistant for fast iteration.", url: "https://antigravity.dev" },
      { name: "Codex", description: "OpenAI Codex: useful for boilerplate generation and API exploration.", url: "https://openai.com/codex" },
    ],
  },
  {
    name: "Languages & Runtimes",
    items: [
      { name: "TypeScript", description: "Everything: web, backend, mobile. All TypeScript.", url: "https://www.typescriptlang.org" },
      { name: "Node.js", description: "Runtime for backend services and APIs.", url: "https://nodejs.org" },
    ],
  },
  {
    name: "Frontend & Mobile",
    items: [
      { name: "Next.js", description: "Primary framework for web applications.", url: "https://nextjs.org" },
      { name: "React Native", description: "Cross-platform mobile: iOS and Android from one codebase.", url: "https://reactnative.dev" },
      { name: "Tailwind CSS", description: "Utility-first CSS. The only way to write styles at speed.", url: "https://tailwindcss.com" },
    ],
  },
  {
    name: "Backend & Infrastructure",
    items: [
      { name: "Node.js / Fastify / Express", description: "REST APIs and backend services.", url: "https://fastify.dev" },
      { name: "NestJS", description: "Structured backend architecture for larger projects.", url: "https://nestjs.com" },
      { name: "PostgreSQL", description: "Primary database for relational data.", url: "https://postgresql.org" },
      { name: "MongoDB", description: "Document store for flexible schemas.", url: "https://mongodb.com" },
      { name: "Docker", description: "Containerising services for consistent deployments.", url: "https://docker.com" },
    ],
  },
  {
    name: "Services & Platforms",
    items: [
      { name: "Supabase", description: "Auth and Postgres: removes a lot of backend boilerplate.", url: "https://supabase.com" },
      { name: "Sanity", description: "Headless CMS. Powers this portfolio.", url: "https://sanity.io" },
      { name: "GitHub Actions", description: "CI/CD pipelines for automated testing and deployment.", url: "https://github.com/features/actions" },
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
