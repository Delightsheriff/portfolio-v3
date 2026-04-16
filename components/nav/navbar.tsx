"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { hash: "#work", label: "Work" },
  { hash: "#experience", label: "Experience" },
  { hash: "#about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On sub-pages, hash links must include the path so the browser navigates home first
  const href = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav
          className="flex items-center justify-between max-w-7xl mx-auto px-5 md:px-8 h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Delight Sheriff — home"
            className="text-base font-mono font-bold tracking-widest hover:text-highlight transition-colors"
          >
            DS.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.hash}
                href={href(link.hash)}
                role="listitem"
                className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-all"
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-4 bg-border mx-2" aria-hidden="true" />

            <Link
              href={href("#contact")}
              className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full border border-foreground/20 text-muted-foreground hover:border-foreground hover:text-foreground transition-all"
            >
              Hire me
            </Link>

            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className="p-2 rounded-md text-foreground hover:text-highlight transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/97 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center px-8"
          >
            <nav className="space-y-1" aria-label="Mobile navigation links">
              {[...NAV_LINKS.map(l => ({ hash: l.hash, label: l.label })), { hash: "#contact", label: "Contact" }].map(
                (link, index) => (
                  <motion.div
                    key={link.hash}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                  >
                    <Link
                      href={href(link.hash)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center py-4 text-3xl font-serif text-foreground hover:text-highlight transition-colors border-b border-border/30"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-12 text-xs font-mono text-muted-foreground uppercase tracking-widest"
            >
              Available for work
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
