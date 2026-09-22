import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_STAGES } from "../data/watchData";

gsap.registerPlugin(ScrollTrigger);

export default function WatchStory({ onStoryUpdate }) {
  const storyContainerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const textStageRefs = useRef([]);

  useEffect(() => {
    if (!storyContainerRef.current || !pinWrapperRef.current) return;

    // Parameters interpolated continuously along the scroll timeline
    const watchTransform = {
      posX: 0,
      posY: 0,
      posZ: 0,
      rotX: 0.1,
      rotY: 0,
      rotZ: 0,
      scale: 1.0,
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: storyContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: pinWrapperRef.current,
          anticipatePin: 1,
          onUpdate: () => {
            if (onStoryUpdate) {
              onStoryUpdate({
                position: [
                  watchTransform.posX,
                  watchTransform.posY,
                  watchTransform.posZ,
                ],
                rotation: [
                  watchTransform.rotX,
                  watchTransform.rotY,
                  watchTransform.rotZ,
                ],
                scale: watchTransform.scale,
              });
            }
          },
        },
      });

      // Stage 1 (Initial centered state)
      // Elements are initially visible, then fade out into Stage 2
      tl.to(
        textStageRefs.current[0],
        { opacity: 0, y: -40, duration: 1, ease: "power2.inOut" },
        "+=0.2",
      );

      // Transition to Stage 2: Watch moves left (-1.3), rotates 45 deg (~0.8 rad), text 2 appears on right
      tl.to(
        watchTransform,
        {
          posX: -1.2,
          posY: 0,
          posZ: 0.2,
          rotX: 0.2,
          rotY: 0.8, // Approx 45 degrees
          rotZ: -0.1,
          scale: 1.15,
          duration: 2,
          ease: "power1.inOut",
        },
        "<",
      )
        .fromTo(
          textStageRefs.current[1],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
          "<+=0.3",
        )
        .to(
          textStageRefs.current[1],
          { opacity: 0, y: -40, duration: 1 },
          "+=1.2",
        );

      // Transition to Stage 3: Camera zooms closer, watch slightly centers, text 3 appears (Sapphire Crystal)
      tl.to(
        watchTransform,
        {
          posX: 0.9,
          posY: -0.1,
          posZ: 0.8, // Closer zoom
          rotX: -0.2,
          rotY: -0.5,
          rotZ: 0.15,
          scale: 1.35,
          duration: 2,
          ease: "power1.inOut",
        },
        "<",
      )
        .fromTo(
          textStageRefs.current[2],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
          "<+=0.3",
        )
        .to(
          textStageRefs.current[2],
          { opacity: 0, y: -40, duration: 1 },
          "+=1.2",
        );

      // Transition to Stage 4: Watch rotates again, shows titanium case profile, text 4 appears (Titanium Case)
      tl.to(
        watchTransform,
        {
          posX: -1.1,
          posY: 0.1,
          posZ: 0.4,
          rotX: 0.4,
          rotY: 1.4, // Sharp side profile angle
          rotZ: -0.2,
          scale: 1.25,
          duration: 2,
          ease: "power1.inOut",
        },
        "<",
      )
        .fromTo(
          textStageRefs.current[3],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
          "<+=0.3",
        )
        .to(
          textStageRefs.current[3],
          { opacity: 0, y: -40, duration: 1 },
          "+=1.2",
        );

      // Transition to Stage 5: Watch returns toward center, text 5 appears (Built To Perform)
      tl.to(
        watchTransform,
        {
          posX: 0,
          posY: 0,
          posZ: 0,
          rotX: 0.1,
          rotY: 0,
          rotZ: 0,
          scale: 1.05,
          duration: 2,
          ease: "power2.out",
        },
        "<",
      ).fromTo(
        textStageRefs.current[4],
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "power2.out" },
        "<+=0.3",
      );
    }, storyContainerRef);

    return () => ctx.revert();
  }, [onStoryUpdate]);

  return (
    <section
      id="story"
      ref={storyContainerRef}
      className="relative w-full h-[500vh] bg-transparent"
    >
      {/* Pinned full-viewport stage */}
      <div
        ref={pinWrapperRef}
        className="w-full h-screen sticky top-0 left-0 flex items-center justify-center pointer-events-none px-6 md:px-16 overflow-hidden"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* ---------------- STAGE 1: Centered initial statement ---------------- */}
        <div
          ref={(el) => (textStageRefs.current[0] = el)}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-auto"
        >
          <div className="w-12 h-[1px] bg-nexora-accent/60 mb-6" />
          <span className="font-mono text-xs tracking-super-wide text-nexora-accent uppercase mb-3">
            {STORY_STAGES[0].subtitle}
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white max-w-4xl tracking-tight leading-tight">
            ENGINEERED FOR <br className="hidden sm:inline" />
            <span className="metallic-text">EVERY SECOND.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-nexora-400 max-w-xl mt-6 leading-relaxed">
            {STORY_STAGES[0].description}
          </p>
        </div>

        {/* ---------------- STAGE 2: Right side text (Precision Movement) ---------------- */}
        <div
          ref={(el) => (textStageRefs.current[1] = el)}
          className="absolute right-6 md:right-20 lg:right-32 max-w-md text-left z-20 pointer-events-auto opacity-0"
        >
          <div className="glass-panel p-8 md:p-10 rounded-2xl border-l-2 border-l-nexora-accent">
            <span className="font-mono text-[11px] tracking-super-wide text-nexora-accent uppercase">
              {STORY_STAGES[1].subtitle}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4 tracking-wide">
              PRECISION <br />
              <span className="metallic-text">MOVEMENT</span>
            </h3>
            <p className="font-sans text-sm text-nexora-300 leading-relaxed">
              {STORY_STAGES[1].description}
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-nexora-400">
              <span>FREQUENCY</span>
              <span className="text-white font-semibold">28,800 VPH (4Hz)</span>
            </div>
          </div>
        </div>

        {/* ---------------- STAGE 3: Left side text (Sapphire Crystal) ---------------- */}
        <div
          ref={(el) => (textStageRefs.current[2] = el)}
          className="absolute left-6 md:left-20 lg:left-32 max-w-md text-left z-20 pointer-events-auto opacity-0"
        >
          <div className="glass-panel p-8 md:p-10 rounded-2xl border-l-2 border-l-white">
            <span className="font-mono text-[11px] tracking-super-wide text-nexora-titanium uppercase">
              {STORY_STAGES[2].subtitle}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4 tracking-wide">
              SAPPHIRE <br />
              <span className="metallic-text">CRYSTAL</span>
            </h3>
            <p className="font-sans text-sm text-nexora-300 leading-relaxed">
              {STORY_STAGES[2].description}
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-nexora-400">
              <span>HARDNESS RATING</span>
              <span className="text-white font-semibold">MOHS 9</span>
            </div>
          </div>
        </div>

        {/* ---------------- STAGE 4: Right side text (Titanium Case) ---------------- */}
        <div
          ref={(el) => (textStageRefs.current[3] = el)}
          className="absolute right-6 md:right-20 lg:right-32 max-w-md text-left z-20 pointer-events-auto opacity-0"
        >
          <div className="glass-panel p-8 md:p-10 rounded-2xl border-l-2 border-l-nexora-accent">
            <span className="font-mono text-[11px] tracking-super-wide text-nexora-accent uppercase">
              {STORY_STAGES[3].subtitle}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2 mb-4 tracking-wide">
              TITANIUM <br />
              <span className="metallic-text">CASE</span>
            </h3>
            <p className="font-sans text-sm text-nexora-300 leading-relaxed">
              {STORY_STAGES[3].description}
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-nexora-400">
              <span>ALLOY PURITY</span>
              <span className="text-white font-semibold">GRADE 5 MONOBLOC</span>
            </div>
          </div>
        </div>

        {/* ---------------- STAGE 5: Centered finale (Built to Perform) ---------------- */}
        <div
          ref={(el) => (textStageRefs.current[4] = el)}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-auto opacity-0"
        >
          <span className="font-mono text-xs tracking-super-wide text-nexora-accent uppercase mb-3">
            {STORY_STAGES[4].subtitle}
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight">
            BUILT TO <br />
            <span className="metallic-text">PERFORM.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-nexora-300 max-w-xl mt-6 leading-relaxed">
            {STORY_STAGES[4].description}
          </p>
        </div>

        {/* Progress Timeline Indicator on Side */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 z-30">
          {[1, 2, 3, 4, 5].map((stageNum) => (
            <div
              key={stageNum}
              className="w-1.5 h-1.5 rounded-full bg-white/30 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
