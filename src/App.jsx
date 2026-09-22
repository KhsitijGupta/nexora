import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMousePosition } from "./hooks/useMousePosition";
import { useIsMobile } from "./hooks/useMediaQuery";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { CUSTOMIZER_OPTIONS, HOTSPOTS } from "./data/watchData";

import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import WatchCanvas from "./components/3d/WatchCanvas";
import Hero from "./components/Hero";
import WatchStory from "./components/WatchStory";
import FeatureSection from "./components/FeatureSection";
import WatchExplorer from "./components/WatchExplorer";
import ComponentExploded from "./components/ComponentExploded";
import Customizer from "./components/Customizer";
import Specifications from "./components/Specifications";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const mouse = useMousePosition();

  // 3D Watch Interactive State
  const [customizerState, setCustomizerState] = useState({
    case: CUSTOMIZER_OPTIONS.cases[0],
    strap: CUSTOMIZER_OPTIONS.straps[0],
    dial: CUSTOMIZER_OPTIONS.dials[0],
  });

  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0]);
  const [explodeFactor, setExplodeFactor] = useState(0);

  // Transform state driven by scroll or section focus
  const [watchTransform, setWatchTransform] = useState({
    position: [isMobile ? 0 : 0.85, isMobile ? -0.4 : 0, 0],
    rotation: [0.1, -0.2, 0],
    scale: isMobile ? 0.85 : 1.1,
  });

  // Current active section zone
  const [activeSection, setActiveSection] = useState("hero");

  // Initialize Lenis smooth scroll and connect with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  // Section observer to adapt watch position contextually outside the story timeline
  useEffect(() => {
    const handleScrollTracking = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const explorerEl = document.getElementById("explorer");
      const componentsEl = document.getElementById("components");
      const customizerEl = document.getElementById("customizer");
      const specsEl = document.getElementById("specifications");

      if (
        customizerEl &&
        customizerEl.getBoundingClientRect().top < windowHeight * 0.6 &&
        customizerEl.getBoundingClientRect().bottom > 0
      ) {
        setActiveSection("customizer");
        setWatchTransform({
          position: [isMobile ? 0 : -0.9, isMobile ? 0.3 : 0, 0.4],
          rotation: [0.15, -0.5, 0],
          scale: isMobile ? 0.9 : 1.2,
        });
      } else if (
        componentsEl &&
        componentsEl.getBoundingClientRect().top < windowHeight * 0.6 &&
        componentsEl.getBoundingClientRect().bottom > 0
      ) {
        setActiveSection("components");
      } else if (
        explorerEl &&
        explorerEl.getBoundingClientRect().top < windowHeight * 0.6 &&
        explorerEl.getBoundingClientRect().bottom > 0
      ) {
        setActiveSection("explorer");
        setWatchTransform({
          position: [0, 0, 0.2],
          rotation: [0.2, 0, 0],
          scale: isMobile ? 0.85 : 1.15,
        });
      } else if (scrollY < windowHeight * 0.8) {
        setActiveSection("hero");
        setWatchTransform({
          position: [isMobile ? 0 : 0.85, isMobile ? -0.4 : 0, 0],
          rotation: [0.1, -0.2, 0],
          scale: isMobile ? 0.85 : 1.1,
        });
      }
    };

    window.addEventListener("scroll", handleScrollTracking, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollTracking);
  }, [isMobile]);

  // Story scroll update callback from GSAP ScrollTrigger
  const handleStoryUpdate = (transforms) => {
    setWatchTransform(transforms);
  };

  // Hotspot click in WatchExplorer
  const handleHotspotSelect = (hotspot) => {
    setActiveHotspot(hotspot);
  };

  // Exploded view stage change
  const handleStageChange = (stage) => {
    setExplodeFactor(stage.explodeFactor);
    setWatchTransform((prev) => ({
      ...prev,
      position: [isMobile ? 0 : 0.75, 0, 0],
      rotation: stage.rotation,
      scale: isMobile ? 0.85 : 1.1,
    }));
  };

  return (
    <div className="relative min-h-screen bg-nexora-950 text-nexora-200 overflow-x-hidden">
      {/* Background Noise Texture */}
      <div className="noise-overlay" />

      {/* Cinematic Loading Screen */}
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Persistent Fullscreen 3D Watch Canvas (Hero through Story and Explorer) */}
      <div className="fixed inset-0 pointer-events-none z-10 w-full h-full">
        <WatchCanvas
          mouseNormalized={
            prefersReducedMotion
              ? { x: 0, y: 0 }
              : { x: mouse.normalizedX, y: mouse.normalizedY }
          }
          customizerState={customizerState}
          storyRotation={watchTransform.rotation}
          storyPosition={watchTransform.position}
          storyScale={watchTransform.scale}
          activeHotspot={activeSection === "explorer" ? activeHotspot : null}
          explodeFactor={explodeFactor}
          isInteractive={!prefersReducedMotion}
          idleRotation={!isLoading}
        />
      </div>

      {/* Main Content Sections Flow */}
      <main className="relative z-20">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={() => {
            const storyEl = document.getElementById("story");
            if (storyEl) storyEl.scrollIntoView({ behavior: "smooth" });
          }}
          onTechClick={() => {
            const techEl = document.getElementById("technology");
            if (techEl) techEl.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 2. Pinned GSAP ScrollTrigger Story Sequence */}
        <WatchStory onStoryUpdate={handleStoryUpdate} />

        {/* 3. 4-Block Feature Matrix */}
        <FeatureSection />

        {/* 4. Interactive Watch Hotspot Explorer */}
        <WatchExplorer
          onHotspotSelect={handleHotspotSelect}
          activeHotspotId={activeHotspot?.id}
        />

        {/* 5. Built From The Inside Out (Exploded Architecture) */}
        <ComponentExploded onStageChange={handleStageChange} />

        {/* 6. Live 3D Watch Customizer */}
        <Customizer
          customizerState={customizerState}
          onCustomizerChange={setCustomizerState}
        />

        {/* 7. Technical Specifications */}
        <Specifications />

        {/* 8. Final CTA Section */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
