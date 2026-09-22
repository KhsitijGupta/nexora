import React from "react";
import { ArrowUp } from "lucide-react";
import { NAV_LINKS } from "../data/watchData";

// Minimalist SVG Icons for social links
function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function TwitterXIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-black border-t border-black/10 pt-16 pb-12 px-6 md:px-12 z-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-4">
                <img
                  src="/logo.png"
                  alt="NEXORA"
                  className="w-32 h-auto object-contain"
                />
              </div>

              <p className="font-sans text-xs sm:text-sm text-nexora-400 max-w-sm leading-relaxed">
                Precision-engineered mechanical timepieces rooted in the mastery
                of Swiss watchmaking and propelled by aerospace exploration.
              </p>
            </div>
            <div className="mt-8 font-mono text-[11px] text-nexora-500">
              GENÈVE • TOKYO • NEW YORK • DUBAI
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-xs tracking-widest text-white uppercase block mb-4">
                EXPLORE
              </span>
              <ul className="flex flex-col gap-2.5 text-xs font-sans text-nexora-400">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-nexora-accent transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs tracking-widest text-white uppercase block mb-4">
                LEGAL & CARE
              </span>
              <ul className="flex flex-col gap-2.5 text-xs font-sans text-nexora-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Certificate of Origin
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    International Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Terms of Pre-Order
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials and Scroll Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <span className="font-mono text-xs tracking-widest text-white uppercase block mb-4 md:text-right">
                FOLLOW US
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-nexora-300 hover:text-white hover:border-nexora-accent hover:bg-nexora-accent/10 transition-all duration-300"
                  aria-label="Chronova on Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-nexora-300 hover:text-white hover:border-nexora-accent hover:bg-nexora-accent/10 transition-all duration-300"
                  aria-label="Chronova on X"
                >
                  <TwitterXIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-nexora-300 hover:text-white hover:border-nexora-accent hover:bg-nexora-accent/10 transition-all duration-300"
                  aria-label="Chronova on LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-2 text-xs font-mono text-nexora-400 hover:text-white transition-colors duration-200 group"
            >
              <span>BACK TO TOP</span>
              <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-nexora-accent transition-colors duration-200">
                <ArrowUp className="w-3.5 h-3.5 text-nexora-accent group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-nexora-500">
          <span>© 2026 NEXORA. All rights reserved.</span>
          <span className="text-nexora-400">TIME, REIMAGINED.</span>
        </div>
      </div>
    </footer>
  );
}
