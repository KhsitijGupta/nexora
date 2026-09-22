import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck, Cpu } from "lucide-react";
import { BRAND_DATA } from "../data/watchData";

export default function Hero({ onExploreClick, onTechClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 pointer-events-none">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Hero Typography & Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 z-20 pointer-events-auto flex flex-col justify-center text-left"
        >
          {/* Futuristic Micro-Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nexora-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-nexora-accent"></span>
            </span>
            <span className="font-mono text-xs tracking-super-wide text-nexora-accent uppercase font-medium bg-nexora-accent/10 px-3 py-1 rounded-full border border-nexora-accent/20">
              {BRAND_DATA.label}
            </span>
          </motion.div>

          {/* Main Display Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white"
          >
            TIME, <br />
            <span className="metallic-text">REIMAGINED.</span>
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-nexora-400 max-w-lg mt-6 leading-relaxed"
          >
            {BRAND_DATA.heroDescription}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mt-8 sm:mt-10"
          >
            <a
              href="#story"
              onClick={onExploreClick}
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-nexora-950 font-sans font-semibold text-sm tracking-wider uppercase overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="relative z-10">Explore Collection</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-nexora-100 to-nexora-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="#technology"
              onClick={onTechClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-nexora-900/60 hover:bg-nexora-800/80 text-white font-sans text-sm tracking-wider uppercase border border-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-md hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4 text-nexora-accent" />
              <span>Discover Tech</span>
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-12 mt-12 border-t border-white/10 max-w-md"
          >
            {BRAND_DATA.heroStats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display font-bold text-base sm:text-lg text-white">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-nexora-500 uppercase mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Spacer for Desktop 3D Canvas visual balance */}
        <div className="lg:col-span-6 h-64 lg:h-auto pointer-events-none" />
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-nexora-500 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-nexora-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
