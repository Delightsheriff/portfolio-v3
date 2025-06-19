"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle navigation blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Enhanced Navigation with Blur */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 p-6 md:p-8 transition-all duration-300 ${
          scrolled
            ? "bg-[#FDFBF6]/80 backdrop-blur-xl border-b border-gray-200/20 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-sm font-mono tracking-wider hover:text-[#FF471A] transition-colors"
          >
            DS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 text-sm items-center">
            <Link
              href="#work"
              className="hover:text-[#FF471A] transition-colors"
            >
              Work
            </Link>
            <Link
              href="#experience"
              className="hover:text-[#FF471A] transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#about"
              className="hover:text-[#FF471A] transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="hover:text-[#FF471A] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/resume"
              className="px-4 py-2 bg-[#FF471A] text-white rounded-full hover:bg-[#e63d17] transition-colors text-xs"
            >
              Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:text-[#FF471A] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#FDFBF6]/95 backdrop-blur-xl border-l border-gray-200/20 shadow-xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200/20">
                  <Link
                    href="/"
                    className="text-sm font-mono tracking-wider hover:text-[#FF471A] transition-colors"
                    onClick={handleLinkClick}
                  >
                    DS
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:text-[#FF471A] transition-colors"
                    aria-label="Close mobile menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <div className="flex flex-col gap-1 p-6 flex-1">
                  <Link
                    href="#work"
                    className="py-3 px-4 text-sm hover:text-[#FF471A] hover:bg-gray-100/50 rounded-lg transition-all"
                    onClick={handleLinkClick}
                  >
                    Work
                  </Link>
                  <Link
                    href="#experience"
                    className="py-3 px-4 text-sm hover:text-[#FF471A] hover:bg-gray-100/50 rounded-lg transition-all"
                    onClick={handleLinkClick}
                  >
                    Experience
                  </Link>
                  <Link
                    href="#about"
                    className="py-3 px-4 text-sm hover:text-[#FF471A] hover:bg-gray-100/50 rounded-lg transition-all"
                    onClick={handleLinkClick}
                  >
                    About
                  </Link>
                  <Link
                    href="#contact"
                    className="py-3 px-4 text-sm hover:text-[#FF471A] hover:bg-gray-100/50 rounded-lg transition-all"
                    onClick={handleLinkClick}
                  >
                    Contact
                  </Link>

                  {/* Mobile Resume Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200/20">
                    <Link
                      href="/resume"
                      className="block w-full px-4 py-3 bg-[#FF471A] text-white rounded-full hover:bg-[#e63d17] transition-colors text-xs text-center font-medium"
                      onClick={handleLinkClick}
                    >
                      Resume
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
