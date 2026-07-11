"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { hash: "#work", label: "Work" },
  { hash: "#experience", label: "Experience" },
  { hash: "#about", label: "About" },
  { hash: "/blog", label: "Blog" },
  { hash: "/uses", label: "Uses" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const href = (hash: string) => {
    if (hash.startsWith("/")) return hash;
    return isHome ? hash : `/${hash}`;
  };

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
            ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_1px_0_0_oklch(1_0_0_/_6%)]"
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
            aria-label="Delight Sheriff home"
            className="text-sm font-heading font-bold tracking-[0.18em] uppercase hover:text-highlight transition-colors"
          >
            DS.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5" role="list">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.hash}
                href={href(link.hash)}
                role="listitem"
                className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-4 bg-border mx-2" aria-hidden="true" />

            <Link
              href={href("#contact")}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest h-auto border-highlight/40 text-highlight hover:bg-highlight hover:text-highlight-foreground",
              )}
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
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              variant="ghost"
              size="icon"
            >
              {mobileMenuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </Button>
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
            className="fixed inset-0 bg-background/98 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center px-8"
          >
            <nav className="space-y-1" aria-label="Mobile navigation links">
              {[...NAV_LINKS, { hash: "#contact", label: "Contact" }].map(
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
                      className="flex items-center py-4 text-3xl font-heading font-semibold text-foreground hover:text-highlight transition-colors border-b border-border/30"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-12 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Open to remote roles
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
