import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Cpu, Shield, Sparkles, Droplets } from "lucide-react";
import { FEATURES } from "../data/watchData";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_ICONS = [
  <Cpu className="w-6 h-6 text-nexora-accent" />,
  <Shield className="w-6 h-6 text-slate-300" />,
  <Sparkles className="w-6 h-6 text-cyan-300" />,
  <Droplets className="w-6 h-6 text-blue-400" />,
];

export default function FeatureSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger card entrance with GSAP ScrollTrigger
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 70,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={containerRef}
      className="relative w-full py-32 px-6 md:px-12 bg-nexora-950/80 z-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="font-mono text-xs tracking-super-wide text-nexora-accent uppercase block mb-3">
              HAUTE HORLOGERIE MATRIX
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              ENGINEERED FOR <br />
              <span className="metallic-text">EVERY SECOND.</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-nexora-400 max-w-sm mt-4 md:mt-0 leading-relaxed">
            Combining aerospace metallurgy with ancestral Swiss micromechanics
            to build an uncompromising wrist instrument.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.number}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="glass-panel p-8 rounded-2xl flex flex-col justify-between group hover:border-nexora-accent/40 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle metallic gradient hover shine */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-2xl font-bold text-white/30 group-hover:text-nexora-accent transition-colors duration-300">
                    {feature.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-nexora-accent/30 group-hover:bg-nexora-accent/10 transition-colors duration-300">
                    {FEATURE_ICONS[idx]}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <span className="font-mono text-[10px] tracking-super-wide text-nexora-400 uppercase block mb-1">
                  {feature.subtitle}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-nexora-accent transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-nexora-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Stat footer badge */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-nexora-300">
                <span className="text-[10px] text-nexora-500 uppercase">
                  SPEC
                </span>
                <span className="font-semibold text-white group-hover:text-nexora-accent transition-colors duration-300">
                  {feature.stats}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
