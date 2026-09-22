import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Lighting from "./Lighting";
import WatchModel from "./WatchModel";

export default function WatchCanvas({
  mouseNormalized,
  customizerState,
  storyRotation = [0, 0, 0],
  storyPosition = [0, 0, 0],
  storyScale = 1,
  activeHotspot = null,
  explodeFactor = 0,
  isInteractive = true,
  idleRotation = true,
}) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <Lighting mouseNormalized={mouseNormalized} />

        <Suspense fallback={null}>
          <WatchModel
            mouseNormalized={mouseNormalized}
            customizerState={customizerState}
            storyRotation={storyRotation}
            storyPosition={storyPosition}
            storyScale={storyScale}
            activeHotspot={activeHotspot}
            explodeFactor={explodeFactor}
            isInteractive={isInteractive}
            idleRotation={idleRotation}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
