import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";
import { CUSTOMIZER_OPTIONS } from "../data/watchData";

export default function Customizer({ customizerState, onCustomizerChange }) {
  const [activeTab, setActiveTab] = useState("case");

  const { cases, straps, dials } = CUSTOMIZER_OPTIONS;

  const handleCaseSelect = (caseItem) => {
    onCustomizerChange({
      ...customizerState,
      case: caseItem,
    });
  };

  const handleStrapSelect = (strapItem) => {
    onCustomizerChange({
      ...customizerState,
      strap: strapItem,
    });
  };

  const handleDialSelect = (dialItem) => {
    onCustomizerChange({
      ...customizerState,
      dial: dialItem,
    });
  };

  // Generate dynamic reference code based on choices
  const refCode = `CN-${customizerState.case.id.slice(0, 2).toUpperCase()}-${customizerState.dial.id.slice(0, 2).toUpperCase()}-${customizerState.strap.id.slice(0, 2).toUpperCase()}`;

  return (
    <section
      id="customizer"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 flex items-center justify-center z-20"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual spacer for the 3D watch preview */}
        <div className="lg:col-span-6 h-72 lg:h-[500px] pointer-events-none flex flex-col justify-end">
          <div className="glass-pill px-4 py-2 rounded-full inline-flex items-center gap-3 w-fit pointer-events-auto border border-white/10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-nexora-300">
              LIVE 3D SIMULATION — REF: {refCode}
            </span>
          </div>
        </div>

        {/* Right Column: Customization Controls Card */}
        <div className="lg:col-span-6 flex flex-col pointer-events-auto">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs tracking-super-wide text-nexora-accent uppercase font-semibold">
                BESPOKE ATELIER
              </span>
              <span className="font-mono text-xs text-nexora-400">
                REF: {refCode}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
              MAKE IT <span className="metallic-text">YOURS.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-nexora-400 mb-8 leading-relaxed">
              Tailor every element to your personal sensibility. Hand-assembled
              in Switzerland upon order confirmation.
            </p>

            {/* Customization Categories Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-nexora-950/80 border border-white/10 mb-8">
              {[
                { id: "case", label: "CASE ALLOY" },
                { id: "strap", label: "STRAP / BRACELET" },
                { id: "dial", label: "DIAL SUNBURST" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-nexora-950 font-bold shadow-md"
                      : "text-nexora-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Option Panels */}
            <AnimatePresence mode="wait">
              {activeTab === "case" && (
                <motion.div
                  key="case-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-3"
                >
                  <span className="text-xs font-mono text-nexora-400 mb-1">
                    SELECT CASE FINISH:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {cases.map((caseItem) => {
                      const isSelected =
                        customizerState.case.id === caseItem.id;
                      return (
                        <button
                          key={caseItem.id}
                          type="button"
                          onClick={() => handleCaseSelect(caseItem)}
                          className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between h-28 ${
                            isSelected
                              ? "bg-white/10 border-nexora-accent shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                              : "bg-nexora-900/50 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className="w-5 h-5 rounded-full border border-white/30 shadow-inner"
                              style={{ backgroundColor: caseItem.color }}
                            />
                            {isSelected && (
                              <Check className="w-4 h-4 text-nexora-accent" />
                            )}
                          </div>
                          <div>
                            <div className="font-display text-sm font-bold text-white">
                              {caseItem.name}
                            </div>
                            <div className="text-[10px] font-mono text-nexora-400 mt-0.5">
                              {caseItem.id === "black"
                                ? "DLC COATED"
                                : "METALLURGY"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === "strap" && (
                <motion.div
                  key="strap-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-3"
                >
                  <span className="text-xs font-mono text-nexora-400 mb-1">
                    SELECT STRAP MATERIAL:
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {straps.map((strapItem) => {
                      const isSelected =
                        customizerState.strap.id === strapItem.id;
                      return (
                        <button
                          key={strapItem.id}
                          type="button"
                          onClick={() => handleStrapSelect(strapItem)}
                          className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between h-24 ${
                            isSelected
                              ? "bg-white/10 border-nexora-accent shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                              : "bg-nexora-900/50 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className="w-5 h-5 rounded-full border border-white/30"
                              style={{ backgroundColor: strapItem.color }}
                            />
                            {isSelected && (
                              <Check className="w-4 h-4 text-nexora-accent" />
                            )}
                          </div>
                          <div className="font-display text-sm font-bold text-white">
                            {strapItem.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === "dial" && (
                <motion.div
                  key="dial-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-3"
                >
                  <span className="text-xs font-mono text-nexora-400 mb-1">
                    SELECT SUNBURST DIAL:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {dials.map((dialItem) => {
                      const isSelected =
                        customizerState.dial.id === dialItem.id;
                      return (
                        <button
                          key={dialItem.id}
                          type="button"
                          onClick={() => handleDialSelect(dialItem)}
                          className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between h-28 ${
                            isSelected
                              ? "bg-white/10 border-nexora-accent shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                              : "bg-nexora-900/50 border-white/10 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className="w-5 h-5 rounded-full border border-white/30"
                              style={{ backgroundColor: dialItem.color }}
                            />
                            {isSelected && (
                              <Check className="w-4 h-4 text-nexora-accent" />
                            )}
                          </div>
                          <div>
                            <div className="font-display text-sm font-bold text-white">
                              {dialItem.name}
                            </div>
                            <div className="text-[10px] font-mono text-nexora-400 mt-0.5">
                              SUNBURST GUILLOCHÉ
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Bar & Order Inquire */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-nexora-500 uppercase block">
                  MANUFACTURE ESTIMATE
                </span>
                <span className="font-display text-2xl font-bold text-white tracking-wide">
                  $18,400{" "}
                  <span className="text-xs font-mono text-nexora-400 font-normal">
                    USD
                  </span>
                </span>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-nexora-accent to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-nexora-950 font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Reserve Configuration</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
