// import React, { useEffect, useState } from "react";
// import { motion, useSpring, useMotionValue } from "framer-motion";
// import { useIsMobile } from "../hooks/useMediaQuery";

// export default function CustomCursor() {
//   const isMobile = useIsMobile();
//   const [isHovered, setIsHovered] = useState(false);
//   const [isClicking, setIsClicking] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   // Smooth mouse coordinates
//   const mouseX = useMotionValue(-100);
//   const mouseY = useMotionValue(-100);

//   const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
//   const cursorX = useSpring(mouseX, springConfig);
//   const cursorY = useSpring(mouseY, springConfig);

//   useEffect(() => {
//     if (isMobile) return;

//     // Enable custom cursor styles on body
//     document.body.classList.add("custom-cursor-active");

//     const moveCursor = (e) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//       if (!isVisible) setIsVisible(true);
//     };

//     const handleMouseDown = () => setIsClicking(true);
//     const handleMouseUp = () => setIsClicking(false);
//     const handleMouseLeave = () => setIsVisible(false);
//     const handleMouseEnter = () => setIsVisible(true);

//     // Interactive element detection
//     const handleMouseOver = (e) => {
//       const target = e.target;
//       const isInteractive = Boolean(
//         target.closest("button") ||
//         target.closest("a") ||
//         target.closest("[data-cursor-hover]") ||
//         target.closest(".interactive-target") ||
//         target.tagName === "BUTTON" ||
//         target.tagName === "A",
//       );
//       setIsHovered(isInteractive);
//     };

//     window.addEventListener("mousemove", moveCursor);
//     window.addEventListener("mousedown", handleMouseDown);
//     window.addEventListener("mouseup", handleMouseUp);
//     document.documentElement.addEventListener("mouseleave", handleMouseLeave);
//     document.documentElement.addEventListener("mouseenter", handleMouseEnter);
//     document.addEventListener("mouseover", handleMouseOver);

//     return () => {
//       document.body.classList.remove("custom-cursor-active");
//       window.removeEventListener("mousemove", moveCursor);
//       window.removeEventListener("mousedown", handleMouseDown);
//       window.removeEventListener("mouseup", handleMouseUp);
//       document.documentElement.removeEventListener(
//         "mouseleave",
//         handleMouseLeave,
//       );
//       document.documentElement.removeEventListener(
//         "mouseenter",
//         handleMouseEnter,
//       );
//       document.removeEventListener("mouseover", handleMouseOver);
//     };
//   }, [isMobile, isVisible, mouseX, mouseY]);

//   if (isMobile || !isVisible) return null;

//   return (
//     <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
//       {/* Outer trailing ring */}
//       <motion.div
//         className="absolute rounded-full border border-chronova-accent/50 pointer-events-none"
//         style={{
//           x: cursorX,
//           y: cursorY,
//           translateX: "-50%",
//           translateY: "-50%",
//         }}
//         animate={{
//           width: isHovered ? 52 : isClicking ? 28 : 36,
//           height: isHovered ? 52 : isClicking ? 28 : 36,
//           borderColor: isHovered
//             ? "rgba(56, 189, 248, 0.8)"
//             : "rgba(255, 255, 255, 0.3)",
//           backgroundColor: isHovered
//             ? "rgba(56, 189, 248, 0.08)"
//             : "transparent",
//         }}
//         transition={{ type: "spring", stiffness: 400, damping: 28 }}
//       />

//       {/* Inner precise dot */}
//       <motion.div
//         className="absolute rounded-full bg-white pointer-events-none"
//         style={{
//           x: mouseX,
//           y: mouseY,
//           translateX: "-50%",
//           translateY: "-50%",
//         }}
//         animate={{
//           scale: isClicking ? 0.7 : isHovered ? 1.5 : 1,
//           backgroundColor: isHovered ? "#38BDF8" : "#FFFFFF",
//         }}
//         transition={{ duration: 0.15 }}
//       >
//         <div className="w-1.5 h-1.5 rounded-full" />
//       </motion.div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "../hooks/useMediaQuery";

export default function CustomCursor() {
  const isMobile = useIsMobile();

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // =========================================================
  // MOUSE POSITION
  // =========================================================

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Main cursor - fast and precise
  const cursorX = useSpring(mouseX, {
    stiffness: 420,
    damping: 32,
    mass: 0.35,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 420,
    damping: 32,
    mass: 0.35,
  });

  // Soft background glow - slower movement
  const glowX = useSpring(mouseX, {
    stiffness: 120,
    damping: 25,
    mass: 0.8,
  });

  const glowY = useSpring(mouseY, {
    stiffness: 120,
    damping: 25,
    mass: 0.8,
  });

  // =========================================================
  // EVENTS
  // =========================================================

  useEffect(() => {
    if (isMobile) return;

    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const interactiveElement = target.closest(
        [
          "button",
          "a",
          "input",
          "textarea",
          "select",
          "[role='button']",
          "[data-cursor-hover]",
          ".interactive-target",
        ].join(","),
      );

      setIsHovered(Boolean(interactiveElement));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      setIsClicking(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    document.addEventListener("mouseover", handleMouseOver);

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      document.removeEventListener("mouseover", handleMouseOver);

      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
    };
  }, [isMobile, mouseX, mouseY]);

  // =========================================================
  // MOBILE
  // =========================================================

  if (isMobile || !isVisible) {
    return null;
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
      aria-hidden="true"
    >
      {/* =====================================================
          SOFT TRAILING GLOW
      ===================================================== */}

      <motion.div
        className="absolute left-0 top-0"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovered ? 95 : 65,
            height: isHovered ? 95 : 65,
            opacity: isHovered ? 0.75 : 0.5,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 22,
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.08) 40%, transparent 72%)",
            filter: "blur(9px)",
          }}
        />
      </motion.div>

      {/* =====================================================
          MAIN CURSOR SHADOW
          Gives the liquid cursor a floating 3D effect
      ===================================================== */}

      <motion.div
        className="absolute left-0 top-0"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.72 : isHovered ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 22,
        }}
      >
        {/* =================================================
            SHADOW
        ================================================= */}

        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
          }}
          animate={{
            width: isHovered ? 46 : 25,
            height: isHovered ? 18 : 9,
            opacity: isClicking ? 0.18 : isHovered ? 0.5 : 0.38,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 22,
          }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 45%, transparent 75%)",
              filter: "blur(5px)",
              transform: "translateY(9px)",
            }}
          />
        </motion.div>

        {/* =================================================
            LIQUID BODY
        ================================================= */}

        <motion.div
          className="relative overflow-hidden"
          animate={{
            width: isHovered ? 42 : 20,
            height: isHovered ? 42 : 20,
            borderRadius: isHovered ? 10 : 999,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 22,
          }}
          style={{
            background:
              "linear-gradient(135deg, rgba(125,211,252,0.98), rgba(14,165,233,0.78))",

            // Premium 3D shadow + cyan glow
            boxShadow: `
              0 7px 10px rgba(0, 0, 0, 0.5),
              0 16px 30px rgba(0, 0, 0, 0.3),
              0 0 12px rgba(99, 201, 245, 0.4),
              0 0 30px rgba(56,189,248,0.9),
              inset 1px 1px 3px rgba(255,255,255,0.35)
            `,
          }}
        >
          {/* ===============================================
              TOP HIGHLIGHT
          =============================================== */}

          <motion.div
            className="absolute rounded-full bg-white/60"
            style={{
              left: "22%",
              top: "17%",
              filter: "blur(1px)",
            }}
            animate={{
              width: isHovered ? 8 : 5,
              height: isHovered ? 8 : 5,
            }}
            transition={{
              duration: 0.2,
            }}
          />

          {/* ===============================================
              LIQUID REFLECTION
          =============================================== */}

          <motion.div
            className="absolute left-[-30px] top-1/2 h-[2px] w-[70px] bg-white/30"
            animate={{
              x: isHovered ? 28 : 8,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            style={{
              filter: "blur(2px)",
            }}
          />

          {/* ===============================================
              CENTER POINT
          =============================================== */}

          <motion.div
            className="absolute left-1/2 top-1/2 rounded-full bg-white"
            style={{
              translateX: "-50%",
              translateY: "-50%",
              boxShadow: "0 0 5px rgba(255,255,255,0.7)",
            }}
            animate={{
              width: isHovered ? 4 : 3,
              height: isHovered ? 4 : 3,
            }}
          />
        </motion.div>
      </motion.div>

      {/* =====================================================
          HOVER LABEL
      ===================================================== */}

      <motion.div
        className="absolute left-0 top-0"
        style={{
          x: cursorX,
          y: cursorY,

          // Fixed offset.
          // IMPORTANT: x/y are never animated here.
          translateX: 28,
          translateY: 28,
        }}
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
        }}
      >
        <div
          className="
            whitespace-nowrap
            rounded-full
            border
            border-cyan-400/20
            bg-[#080b10]/85
            px-3
            py-1.5
            backdrop-blur-xl
          "
          style={{
            boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
          }}
        >
          <span
            className="
              font-mono
              text-[8px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-cyan-100/75
            "
          >
            Explore
          </span>
        </div>
      </motion.div>

      {/* =====================================================
          CLICK RIPPLE
      ===================================================== */}

      <motion.div
        className="absolute left-0 top-0 rounded-full border border-cyan-300/60"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={false}
        animate={{
          width: isClicking ? 70 : 0,
          height: isClicking ? 70 : 0,
          opacity: isClicking ? 0 : 0.8,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      />

      {/* =====================================================
          CLICK INNER GLOW
      ===================================================== */}

      <motion.div
        className="absolute left-0 top-0 rounded-full bg-cyan-400/15"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={false}
        animate={{
          width: isClicking ? 45 : 0,
          height: isClicking ? 45 : 0,
          opacity: isClicking ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      />
    </div>
  );
}
