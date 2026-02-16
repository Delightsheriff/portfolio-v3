import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo + Copyright */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Link
              href="/"
              className="font-mono font-semibold tracking-wider text-foreground hover:text-primary transition-colors"
            >
              DS.
            </Link>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6 text-xs font-mono text-muted-foreground">
            <Link
              href="#work"
              className="hover:text-foreground transition-colors"
            >
              Work
            </Link>
            <Link
              href="#about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/resume"
              className="hover:text-foreground transition-colors"
            >
              Resume
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
