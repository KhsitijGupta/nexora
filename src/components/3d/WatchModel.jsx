import React, { useState, useEffect, Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ProceduralWatch from "./ProceduralWatch";

// GLB Watch Loader component when watch.glb is present
function GLBWatch({ url, caseConfig, strapConfig, dialConfig, explodeFactor }) {
  const { scene } = useGLTF(url);
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);

  // Dynamically apply materials to meshes if named accordingly
  React.useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = (child.name || "").toLowerCase();
        // Dynamic customization matching
        if (
          name.includes("case") ||
          name.includes("body") ||
          name.includes("bezel")
        ) {
          if (caseConfig?.color)
            child.material.color = new THREE.Color(caseConfig.color);
          if (caseConfig?.metalness !== undefined)
            child.material.metalness = caseConfig.metalness;
          if (caseConfig?.roughness !== undefined)
            child.material.roughness = caseConfig.roughness;
        } else if (name.includes("strap") || name.includes("band")) {
          if (strapConfig?.color)
            child.material.color = new THREE.Color(strapConfig.color);
          if (strapConfig?.roughness !== undefined)
            child.material.roughness = strapConfig.roughness;
        } else if (name.includes("dial") || name.includes("face")) {
          if (dialConfig?.color)
            child.material.color = new THREE.Color(dialConfig.color);
        }
      }
    });
  }, [clonedScene, caseConfig, strapConfig, dialConfig]);

  return <primitive object={clonedScene} scale={0.85} />;
}

export default function WatchModel({
  mouseNormalized = { x: 0, y: 0 },
  customizerState = {},
  storyRotation = [0, 0, 0],
  storyPosition = [0, 0, 0],
  storyScale = 1,
  activeHotspot = null,
  explodeFactor = 0,
  isInteractive = true,
  idleRotation = true,
}) {
  const outerGroupRef = useRef();
  const innerGroupRef = useRef();
  const [hasGlb, setHasGlb] = useState(false);
  const [checkedGlb, setCheckedGlb] = useState(false);

  // Check if /models/watch.glb exists on the server
  useEffect(() => {
    const glbUrl = "/models/watch.glb";
    fetch(glbUrl, { method: "HEAD" })
      .then((res) => {
        const contentType = res.headers.get("content-type") || "";
        // If 200 OK and not HTML (Vite returns index.html on missing asset 404s)
        if (res.ok && !contentType.includes("text/html")) {
          setHasGlb(true);
        } else {
          setHasGlb(false);
        }
      })
      .catch(() => setHasGlb(false))
      .finally(() => setCheckedGlb(true));
  }, []);

  // Smooth lerp for mouse interaction and idle floating
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (outerGroupRef.current) {
      // Idle slow organic floating rotation
      const idleY = idleRotation ? Math.sin(time * 0.4) * 0.15 : 0;
      const idleX = idleRotation ? Math.cos(time * 0.3) * 0.08 : 0;

      // Subtle mouse tilt reaction
      const targetMouseX = isInteractive ? mouseNormalized.y * 0.35 : 0;
      const targetMouseY = isInteractive ? mouseNormalized.x * 0.45 : 0;

      // Hotspot target rotation bias if active
      const hotspotRotX = activeHotspot?.targetRotation
        ? activeHotspot.targetRotation[0]
        : 0;
      const hotspotRotY = activeHotspot?.targetRotation
        ? activeHotspot.targetRotation[1]
        : 0;
      const hotspotRotZ = activeHotspot?.targetRotation
        ? activeHotspot.targetRotation[2]
        : 0;

      // Target combined rotation
      const finalTargetX =
        storyRotation[0] + targetMouseX + idleX + hotspotRotX;
      const finalTargetY =
        storyRotation[1] + targetMouseY + idleY + hotspotRotY;
      const finalTargetZ = storyRotation[2] + hotspotRotZ;

      // Smooth damping interpolation (lerp)
      const lerpSpeed = 4 * delta;
      outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.x,
        finalTargetX,
        lerpSpeed,
      );
      outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.y,
        finalTargetY,
        lerpSpeed,
      );
      outerGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.z,
        finalTargetZ,
        lerpSpeed,
      );

      // Target position
      outerGroupRef.current.position.x = THREE.MathUtils.lerp(
        outerGroupRef.current.position.x,
        storyPosition[0],
        lerpSpeed,
      );
      outerGroupRef.current.position.y = THREE.MathUtils.lerp(
        outerGroupRef.current.position.y,
        storyPosition[1],
        lerpSpeed,
      );
      outerGroupRef.current.position.z = THREE.MathUtils.lerp(
        outerGroupRef.current.position.z,
        storyPosition[2],
        lerpSpeed,
      );

      // Target scale
      const currentScale = outerGroupRef.current.scale.x;
      const targetScale = storyScale;
      const newScale = THREE.MathUtils.lerp(
        currentScale,
        targetScale,
        lerpSpeed,
      );
      outerGroupRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <group ref={outerGroupRef}>
      <group ref={innerGroupRef}>
        {hasGlb ? (
          <Suspense
            fallback={
              <ProceduralWatch
                caseConfig={customizerState.case}
                strapConfig={customizerState.strap}
                dialConfig={customizerState.dial}
                explodeFactor={explodeFactor}
              />
            }
          >
            <GLBWatch
              url="/models/watch.glb"
              caseConfig={customizerState.case}
              strapConfig={customizerState.strap}
              dialConfig={customizerState.dial}
              explodeFactor={explodeFactor}
            />
          </Suspense>
        ) : (
          <ProceduralWatch
            caseConfig={customizerState.case}
            strapConfig={customizerState.strap}
            dialConfig={customizerState.dial}
            explodeFactor={explodeFactor}
          />
        )}
      </group>
    </group>
  );
}
