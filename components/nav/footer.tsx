"use client";

import { usePathname } from "next/navigation";
import { SparkNextLink } from "@/components/animations/spark-next-link";
import { SparkLink } from "@/components/animations/spark-button";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { hash: "#work", label: "Work" },
  { hash: "#experience", label: "Experience" },
  { hash: "#about", label: "About" },
  { hash: "#contact", label: "Contact" },
  { hash: "/projects", label: "All Projects" },
  { hash: "/blog", label: "Blog" },
  { hash: "/uses", label: "Uses" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const href = (hash: string) => {
    if (hash.startsWith("/")) return hash;
    return isHome ? hash : `/${hash}`;
  };
  return (
    <footer className="px-5 md:px-8 pb-10 pt-2" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <Separator className="mb-12 opacity-20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <SparkNextLink
              href="/"
              className="text-sm font-heading font-bold tracking-[0.18em] uppercase hover:text-highlight transition-colors"
              aria-label="Delight Sheriff home"
            >
              DS.
            </SparkNextLink>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Software Engineer building production-grade products across the TypeScript ecosystem: web, backend, and mobile.
            </p>

          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50 mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.hash}>
                  <SparkNextLink
                    href={href(link.hash)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </SparkNextLink>
                </li>
              ))}
            </ul>
          </nav>


        </div>

        {/* CTA section */}
        <div className="mb-6 space-y-4">
          <Separator className="opacity-20" />
          <div className="flex flex-wrap items-center gap-3">
            <SparkLink
              href="https://github.com/Delightsheriff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-widest text-foreground hover:text-highlight transition-colors"
            >
              View GitHub
            </SparkLink>
            <span className="text-muted-foreground/30">·</span>
            <a
              href="mailto:delightsheriff@gmail.com"
              className="text-xs font-mono uppercase tracking-widest text-foreground hover:text-highlight transition-colors"
            >
              Email Me
            </a>

          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="mb-6 opacity-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/40 font-mono">
          <span suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Amadi-Sheriff Delight
          </span>
          <span>Built with Next.js &middot; Sanity &middot; Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
