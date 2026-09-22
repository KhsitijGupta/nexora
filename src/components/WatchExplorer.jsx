import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Info, ChevronRight, X } from "lucide-react";
import { HOTSPOTS } from "../data/watchData";

export default function WatchExplorer({ onHotspotSelect, activeHotspotId }) {
  const [selectedId, setSelectedId] = useState(activeHotspotId || "crystal");

  const handleSelect = (hotspot) => {
    setSelectedId(hotspot.id);
    if (onHotspotSelect) {
      onHotspotSelect(hotspot);
    }
  };

  const currentHotspot =
    HOTSPOTS.find((h) => h.id === selectedId) || HOTSPOTS[0];

  return (
    <section
      id="explorer"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-between z-20"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full text-center mb-8">
        <span className="font-mono text-xs tracking-super-wide text-nexora-accent uppercase block mb-2">
          INTERACTIVE INSPECTION
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          LOOK <span className="metallic-text">CLOSER.</span>
        </h2>
        <p className="font-sans text-sm text-nexora-400 max-w-md mx-auto mt-3">
          Select any architectural component below to examine its
          micro-engineering and material properties.
        </p>
      </div>

      {/* Center Stage with Hotspot Markers Overlay */}
      <div className="relative max-w-5xl mx-auto w-full h-[480px] sm:h-[560px] flex items-center justify-center my-4">
        {/* Hotspot Nodes positioned around watch center */}
        {HOTSPOTS.map((hotspot) => {
          const isSelected = hotspot.id === selectedId;

          return (
            <div
              key={hotspot.id}
              style={{
                position: "absolute",
                top: hotspot.screenOffset.top,
                left: hotspot.screenOffset.left,
                transform: "translate(-50%, -50%)",
              }}
              className="z-30 pointer-events-auto"
            >
              <button
                type="button"
                onClick={() => handleSelect(hotspot)}
                className="relative flex items-center justify-center group focus:outline-none"
                aria-label={`Inspect ${hotspot.name}`}
              >
                {/* Pulsing Outer Aura */}
                <motion.span
                  animate={{
                    scale: isSelected ? [1, 1.8, 1] : [1, 1.4, 1],
                    opacity: isSelected ? [0.8, 0, 0.8] : [0.4, 0, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                  }}
                  className={`absolute w-9 h-9 rounded-full ${
                    isSelected ? "bg-nexora-accent" : "bg-white/40"
                  }`}
                />

                {/* Main Node Dot */}
                <motion.div
                  animate={{
                    scale: isSelected ? 1.25 : 1,
                    backgroundColor: isSelected ? "#38BDF8" : "#FFFFFF",
                  }}
                  className={`w-4 h-4 rounded-full border-2 border-nexora-950 shadow-[0_0_12px_rgba(56,189,248,0.8)] flex items-center justify-center cursor-pointer transition-transform duration-200 group-hover:scale-125`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-nexora-950" />
                </motion.div>

                {/* Micro Label on hover/active */}
                <span
                  className={`hidden sm:block absolute left-6 whitespace-nowrap font-mono text-[10px] tracking-wider px-2 py-0.5 rounded backdrop-blur-md transition-all duration-200 ${
                    isSelected
                      ? "text-nexora-accent bg-nexora-950/80 border border-nexora-accent/40 opacity-100"
                      : "text-white/70 bg-nexora-950/60 border border-white/10 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {hotspot.name}
                </span>
              </button>
            </div>
          );
        })}

        {/* Selected Component Floating Info Card (Desktop & Tablet) */}
        <div className="hidden lg:block absolute bottom-4 right-4 z-40 max-w-sm pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHotspot.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="glass-panel p-6 rounded-2xl border-l-4 border-l-nexora-accent shadow-2xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] tracking-super-wide text-nexora-accent uppercase font-semibold">
                  {currentHotspot.tag}
                </span>
                <span className="text-[10px] font-mono text-nexora-500">
                  HOTSPOT ACTIVE
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {currentHotspot.name}
              </h3>
              <p className="font-sans text-xs text-nexora-300 leading-relaxed">
                {currentHotspot.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Horizontal Hotspot Selector Tabs (Mobile & Quick Navigation) */}
      <div className="max-w-4xl mx-auto w-full z-30 pointer-events-auto">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {HOTSPOTS.map((hotspot) => {
            const isSelected = hotspot.id === selectedId;
            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => handleSelect(hotspot)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? "bg-nexora-accent text-nexora-950 font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    : "bg-nexora-900/80 text-nexora-400 hover:text-white border border-white/10 hover:border-white/25"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-nexora-950" : "bg-nexora-accent"
                  }`}
                />
                <span>{hotspot.name}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Info Sheet when on small screens */}
        <div className="block lg:hidden mt-6">
          <div className="glass-panel p-5 rounded-xl border-t border-nexora-accent/40">
            <span className="font-mono text-[10px] tracking-super-wide text-nexora-accent uppercase">
              {currentHotspot.tag}
            </span>
            <h3 className="font-display text-lg font-bold text-white mt-1">
              {currentHotspot.name}
            </h3>
            <p className="font-sans text-xs text-nexora-300 mt-1.5 leading-relaxed">
              {currentHotspot.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
