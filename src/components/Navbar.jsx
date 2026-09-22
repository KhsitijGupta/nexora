import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "../data/watchData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 ${
          isScrolled
            ? "bg-nexora-950/75 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="flex items-center group cursor-pointer focus:outline-none"
            aria-label="NEXORA Home"
          >
            <img
              src="./logo.png"
              alt="NEXORA"
              className="
        w-20
        h-auto
        object-contain
        transition-all
        duration-300
        group-hover:scale-[1.03]
        group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]
      "
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans tracking-wider">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="
          text-nexora-400
          hover:text-white
          transition-colors
          duration-200
          relative
          py-1
          text-xs
          uppercase
          tracking-widest
          group
        "
              >
                {link.label}

                <span
                  className="
            absolute
            bottom-0
            left-0
            w-0
            h-[1px]
            bg-nexora-accent
            transition-all
            duration-300
            group-hover:w-full
          "
                />
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#customizer"
              onClick={(e) => handleNavClick(e, "#customizer")}
              className="
        relative
        inline-flex
        items-center
        gap-2
        px-5
        py-2.5
        rounded-full
        text-xs
        font-mono
        font-medium
        tracking-wider
        uppercase
        text-white
        bg-white/5
        hover:bg-white/10
        border
        border-white/10
        hover:border-nexora-accent/50
        transition-all
        duration-300
        overflow-hidden
        group
        shadow-sm
        hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]
      "
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Explore Watch
                <ArrowUpRight
                  className="
            w-3.5
            h-3.5
            text-nexora-accent
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
            transition-transform
            duration-200
          "
                />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
      md:hidden
      p-2
      text-nexora-200
      hover:text-white
      focus:outline-none
    "
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-nexora-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col justify-between md:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg font-display">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-nexora-300 hover:text-nexora-accent tracking-widest uppercase text-base border-b border-white/5 pb-3 flex justify-between items-center"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-nexora-500" />
                </motion.a>
              ))}
            </nav>

            <div className="pt-6">
              <a
                href="#customizer"
                onClick={(e) => handleNavClick(e, "#customizer")}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-nexora-accent to-blue-500 text-nexora-950 font-semibold text-sm tracking-wider uppercase shadow-lg shadow-cyan-500/20"
              >
                Configure Timepiece
              </a>
              <div className="text-center mt-4 text-xs font-mono text-nexora-500">
                NEXORA HAUTE HORLOGERIE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
