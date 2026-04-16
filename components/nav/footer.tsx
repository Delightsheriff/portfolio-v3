import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/projects", label: "All Projects" },
];

const socialLinks = [
  { href: "https://github.com/Delightsheriff", label: "GitHub" },
  { href: "https://www.linkedin.com/in/delightsheriff", label: "LinkedIn" },
  { href: "https://x.com/delightsheriff", label: "X / Twitter" },
];

export default function Footer() {
  return (
    <footer className="px-5 md:px-8 pb-10" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <Separator className="mb-10 opacity-40" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-2">
            <Link
              href="/"
              className="text-base font-mono font-bold tracking-widest hover:text-highlight transition-colors"
              aria-label="Delight Sheriff — home"
            >
              DS.
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Software Engineer &amp; Mobile Developer building high-quality, user-centric products.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 mb-3">
              Navigation
            </p>
            <ul className="space-y-2">
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
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 mb-3">
              Connect
            </p>
            <ul className="space-y-2">
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
        <Separator className="mb-6 opacity-30" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/50 font-mono">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} Amadi-Sheriff Delight
          </span>
          <span>Designed &amp; built with Next.js, Sanity, Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
