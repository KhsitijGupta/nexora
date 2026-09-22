import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPECIFICATIONS } from "../data/watchData";

gsap.registerPlugin(ScrollTrigger);

export default function Specifications() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="specifications"
      ref={sectionRef}
      className="relative w-full py-28 px-6 md:px-12 bg-nexora-950/90 z-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-super-wide text-nexora-accent uppercase block mb-3">
            TECHNICAL HOROLOGY
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            TECHNICAL <span className="metallic-text">SPECIFICATIONS.</span>
          </h2>
          <p className="font-sans text-sm text-nexora-400 max-w-md mx-auto mt-3">
            Every component tested to exceed COSC and ISO 6425 international
            chronometer standards.
          </p>
        </div>

        {/* Technical Data Table */}
        <div className="border-t border-white/15 divide-y divide-white/10">
          {SPECIFICATIONS.map((spec, idx) => (
            <div
              key={spec.category}
              ref={(el) => (rowsRef.current[idx] = el)}
              className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline group hover:bg-white/[0.02] transition-colors duration-200 px-4 rounded-lg"
            >
              {/* Category */}
              <div className="md:col-span-3">
                <span className="font-mono text-xs tracking-widest text-nexora-400 uppercase group-hover:text-nexora-accent transition-colors duration-200">
                  {spec.category}
                </span>
              </div>

              {/* Value */}
              <div className="md:col-span-5">
                <span className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors duration-200">
                  {spec.value}
                </span>
              </div>

              {/* Engineering Detail */}
              <div className="md:col-span-4 text-left md:text-right">
                <span className="font-sans text-xs text-nexora-400">
                  {spec.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
