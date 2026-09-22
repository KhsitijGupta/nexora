import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Disc, Sparkles, CheckCircle2 } from "lucide-react";
import { COMPONENT_LAYERS } from "../data/watchData";

export default function ComponentExploded({ onStageChange }) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const handleStageSelect = (index) => {
    setActiveStageIndex(index);
    const stage = COMPONENT_LAYERS[index];
    if (onStageChange) {
      onStageChange(stage);
    }
  };

  const currentLayer = COMPONENT_LAYERS[activeStageIndex];

  return (
    <section
      id="components"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center z-20"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Stage Details and Interactive Controls */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-nexora-accent" />
            <span className="font-mono text-xs tracking-super-wide text-nexora-accent uppercase font-medium">
              EXPLODED ARCHITECTURE
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            BUILT FROM THE <br />
            <span className="metallic-text">INSIDE OUT.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-nexora-400 mt-4 max-w-lg leading-relaxed">
            Deconstruct the horological layers that protect, calibrate, and
            drive Chronova's Calibre CN-01.
          </p>

          {/* 3 Interactive Stage Buttons */}
          <div className="grid grid-cols-3 gap-3 my-8 max-w-md">
            {COMPONENT_LAYERS.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleStageSelect(idx)}
                  className={`py-3.5 px-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 flex flex-col items-center gap-1.5 border ${
                    isActive
                      ? "bg-nexora-accent/15 border-nexora-accent text-white font-bold shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                      : "bg-nexora-900/60 border-white/10 text-nexora-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span className="text-[10px] text-nexora-500">
                    STAGE 0{idx + 1}
                  </span>
                  <span>{stage.id.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Layer Details Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLayer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-l-4 border-l-nexora-accent max-w-xl"
            >
              <span className="font-mono text-[10px] tracking-super-wide text-nexora-accent uppercase font-semibold">
                {currentLayer.subtitle}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1 mb-3">
                {currentLayer.title}
              </h3>
              <p className="font-sans text-sm text-nexora-300 leading-relaxed mb-6">
                {currentLayer.description}
              </p>

              {/* Technical bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                {currentLayer.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-mono text-nexora-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-nexora-accent shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Spacer for visual alignment with 3D Canvas */}
        <div className="lg:col-span-6 h-64 lg:h-96 pointer-events-none" />
      </div>
    </section>
  );
}
