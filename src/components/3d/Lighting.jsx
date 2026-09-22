import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

export default function Lighting({ mouseNormalized = { x: 0, y: 0 } }) {
  const keyLightRef = useRef();
  const rimLightRef = useRef();
  const fillLightRef = useRef();

  useFrame((state, delta) => {
    // Subtle responsive lighting shifts based on cursor
    if (keyLightRef.current) {
      keyLightRef.current.position.x = THREE.MathUtils.lerp(
        keyLightRef.current.position.x,
        5 + mouseNormalized.x * 2,
        3 * delta,
      );
      keyLightRef.current.position.y = THREE.MathUtils.lerp(
        keyLightRef.current.position.y,
        5 + mouseNormalized.y * 2,
        3 * delta,
      );
    }
  });

  return (
    <>
      {/* Studio Ambient base illumination */}
      <ambientLight intensity={0.4} color="#CBD5E1" />

      {/* Main Studio Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[5, 6, 5]}
        intensity={2.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Cool Rim Light (accents watch bevels and metallic bevel edges) */}
      <directionalLight
        ref={rimLightRef}
        position={[-6, 4, -4]}
        intensity={2.8}
        color="#38BDF8"
      />

      {/* Warm Fill Light (balances shadows with luxury metallic warmth) */}
      <directionalLight
        ref={fillLightRef}
        position={[-4, -3, 3]}
        intensity={0.8}
        color="#F8FAFC"
      />

      {/* Top Grazing Light for Dial depth */}
      <pointLight
        position={[0, 4, 2]}
        intensity={1.5}
        color="#FFFFFF"
        distance={8}
      />

      {/* Bottom Subtle Up-light */}
      <pointLight
        position={[0, -4, 2]}
        intensity={0.6}
        color="#0284C7"
        distance={8}
      />

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.65}
        scale={8}
        blur={2.4}
        far={5}
        color="#000000"
      />

      {/* High-quality neutral studio environment for realistic metallic reflections */}
      <Environment preset="city" />
    </>
  );
}
