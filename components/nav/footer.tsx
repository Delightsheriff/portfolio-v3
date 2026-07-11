import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/projects", label: "All Projects" },
  { href: "/uses", label: "Uses" },
];

const socialLinks = [
  { href: "https://github.com/Delightsheriff", label: "GitHub" },
  { href: "https://www.linkedin.com/in/delightsheriff", label: "LinkedIn" },
  { href: "https://x.com/delightsheriff", label: "X / Twitter" },
];

export default function Footer() {
  return (
    <footer className="px-5 md:px-8 pb-10 pt-2" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <Separator className="mb-12 opacity-20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-sm font-heading font-bold tracking-[0.18em] uppercase hover:text-highlight transition-colors"
              aria-label="Delight Sheriff — home"
            >
              DS.
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Software Engineer building production-grade products across the TypeScript ecosystem — web, backend, and mobile.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              <span className="text-xs font-mono text-muted-foreground">Open to remote roles</span>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50 mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <nav aria-label="Social media links">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50 mb-4">
              Connect
            </p>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} profile`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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
