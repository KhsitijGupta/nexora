import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const onCompleteRef = useRef(onLoadingComplete);
  onCompleteRef.current = onLoadingComplete;

  useEffect(() => {
    const start = Date.now();
    const duration = 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setIsDone(true);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, 30);

    const timer = setTimeout(() => {
      setProgress(100);
      setIsDone(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.85, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-nexora-950 text-white select-none px-6"
        >
          {/* Subtle ambient background glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-nexora-accent/5 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            {/* Animated Brand Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mb-6"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-t border-nexora-accent"
                />
                <div className="w-2 h-2 rounded-full bg-nexora-accent shadow-[0_0_12px_#38BDF8]" />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-display text-3xl sm:text-4xl font-extrabold tracking-[0.35em] text-white"
            >
              NEXORA
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="font-mono text-xs tracking-[0.3em] text-nexora-titanium mt-3 uppercase"
            >
              TIME, REIMAGINED.
            </motion.p>

            {/* Progress bar and counter */}
            <div className="w-48 sm:w-56 mt-10">
              <div className="w-full h-[2px] bg-nexora-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-nexora-accent/60 to-white"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-nexora-500 tracking-wider">
                <span>INITIALIZING CALIBRE</span>
                <span className="text-nexora-accent font-semibold">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
