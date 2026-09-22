import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 md:px-12 flex items-center justify-center text-center z-20 overflow-hidden">
      {/* Ambient background glow ring */}
      <div className="absolute w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-nexora-accent/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Brand Micro Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-8 bg-nexora-950/60 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-nexora-accent shadow-[0_0_15px_#38BDF8]" />
        </motion.div>

        {/* Big Display Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-[0.95]"
        >
          YOUR TIME <br />
          <span className="metallic-text">STARTS NOW.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-nexora-300 max-w-lg mt-6 leading-relaxed"
        >
          Precision engineered. Designed for those who move forward. Limited to
          250 numbered pieces worldwide.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#customizer"
            className="relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-nexora-950 font-sans font-bold text-sm tracking-wider uppercase shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-105 group overflow-hidden"
          >
            <span className="relative z-10">EXPLORE NEXORA</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1.5 transition-transform duration-200" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-cyan-100 to-nexora-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a
            href="#specifications"
            className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full bg-nexora-900/60 hover:bg-nexora-800/80 text-white font-sans text-sm tracking-wider uppercase border border-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-md"
          >
            <span>View All Calibres</span>
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-nexora-400"
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-nexora-accent" />
            <span>5-YEAR GLOBAL WARRANTY</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-nexora-accent" />
            <span>SWISS CHRONOMETER CERTIFIED</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-nexora-accent" />
            <span>COMPLIMENTARY CONCIERGE DELIVERY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
