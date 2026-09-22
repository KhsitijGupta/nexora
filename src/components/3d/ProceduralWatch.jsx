// import React, { useRef, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function ProceduralWatch({
//   caseConfig = {
//     color: "#8E94A5",
//     metalness: 0.85,
//     roughness: 0.28,
//   },
//   strapConfig = {
//     color: "#121214",
//     textureType: "leather",
//     roughness: 0.7,
//     metalness: 0.1,
//   },
//   dialConfig = {
//     color: "#0B0C10",
//     accent: "#38BDF8",
//   },
//   explodeFactor = 0,
// }) {
//   const watchGroup = useRef();
//   const secondsHandRef = useRef();
//   const minutesHandRef = useRef();
//   const hoursHandRef = useRef();
//   const balanceWheelRef = useRef();
//   const gear1Ref = useRef();
//   const gear2Ref = useRef();

//   // Animation frame loop for watch mechanics
//   useFrame((state, delta) => {
//     const time = state.clock.getElapsedTime();

//     // Continuous sweeping seconds hand (1 full turn every 60s)
//     if (secondsHandRef.current) {
//       secondsHandRef.current.rotation.z = -time * 1.5;
//     }
//     // Minutes hand
//     if (minutesHandRef.current) {
//       minutesHandRef.current.rotation.z = -time * 0.1;
//     }
//     // Hours hand
//     if (hoursHandRef.current) {
//       hoursHandRef.current.rotation.z = -time * 0.02;
//     }

//     // High-beat Tourbillon balance wheel oscillation (4Hz rapid oscillation)
//     if (balanceWheelRef.current) {
//       balanceWheelRef.current.rotation.z = Math.sin(time * 25) * 1.8;
//     }

//     // Continuous gear train rotation
//     if (gear1Ref.current) gear1Ref.current.rotation.z = time * 0.8;
//     if (gear2Ref.current) gear2Ref.current.rotation.z = -time * 0.5;
//   });

//   // Hour markers geometry calculation
//   const hourMarkers = useMemo(() => {
//     const markers = [];
//     for (let i = 0; i < 12; i++) {
//       const angle = (i / 12) * Math.PI * 2;
//       const radius = 1.05;
//       const x = Math.sin(angle) * radius;
//       const y = Math.cos(angle) * radius;
//       const isQuarter = i % 3 === 0;
//       markers.push({
//         id: i,
//         pos: [x, y, 0.08],
//         rot: [0, 0, -angle],
//         size: isQuarter ? [0.06, 0.22, 0.04] : [0.04, 0.14, 0.03],
//         isQuarter,
//       });
//     }
//     return markers;
//   }, []);

//   // Minute ticks calculation
//   const minuteTicks = useMemo(() => {
//     const ticks = [];
//     for (let i = 0; i < 60; i++) {
//       if (i % 5 === 0) continue; // Skip hour positions
//       const angle = (i / 60) * Math.PI * 2;
//       const radius = 1.12;
//       ticks.push({
//         id: i,
//         pos: [Math.sin(angle) * radius, Math.cos(angle) * radius, 0.06],
//         rot: [0, 0, -angle],
//       });
//     }
//     return ticks;
//   }, []);

//   // Calculate exploded layer offsets based on explodeFactor
//   // Stable front-to-back layer stack:
//   // crystal > hands > bezel > dial > case > movement > caseback
//   const crystalZ = 0.48 + explodeFactor * 1.4;
//   const handsZ = 0.34 + explodeFactor * 0.5;
//   const bezelZ = 0.28 + explodeFactor * 0.9;
//   const dialZ = 0.14 + explodeFactor * 0.2;

//   const movementZ = -0.12 - explodeFactor * 0.5;
//   const casebackZ = -0.32 - explodeFactor * 1.0;

//   return (
//     <group ref={watchGroup} dispose={null}>
//       {/* ---------------- 1. WATCH CASE & LUGS ---------------- */}
//       <group position={[0, 0, 0]}>
//         {/* Main Monobloc Case Body */}
//         <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
//           <cylinderGeometry args={[1.36, 1.34, 0.38, 64]} />
//           <meshStandardMaterial
//             color={caseConfig.color}
//             metalness={caseConfig.metalness}
//             roughness={caseConfig.roughness}
//             envMapIntensity={1.5}
//           />
//         </mesh>

//         {/* Case Stepped Rim */}
//         <mesh position={[0, 0, 0.05]} castShadow rotation={[Math.PI / 2, 0, 0]}>
//           <cylinderGeometry args={[1.42, 1.4, 0.18, 64]} />
//           <meshStandardMaterial
//             color={caseConfig.color}
//             metalness={caseConfig.metalness}
//             roughness={Math.max(0.1, caseConfig.roughness - 0.05)}
//             envMapIntensity={1.8}
//           />
//         </mesh>

//         {/* Top Sculpted Lugs (connecting to upper strap) */}
//         <group position={[0, 1.35, -0.02]} rotation={[0.15, 0, 0]}>
//           <mesh position={[-0.72, 0.22, 0]} castShadow>
//             <boxGeometry args={[0.22, 0.72, 0.28]} />
//             <meshStandardMaterial
//               color={caseConfig.color}
//               metalness={caseConfig.metalness}
//               roughness={caseConfig.roughness}
//             />
//           </mesh>
//           <mesh position={[0.72, 0.22, 0]} castShadow>
//             <boxGeometry args={[0.22, 0.72, 0.28]} />
//             <meshStandardMaterial
//               color={caseConfig.color}
//               metalness={caseConfig.metalness}
//               roughness={caseConfig.roughness}
//             />
//           </mesh>
//         </group>

//         {/* Bottom Sculpted Lugs (connecting to lower strap) */}
//         <group position={[0, -1.35, -0.02]} rotation={[-0.15, 0, 0]}>
//           <mesh position={[-0.72, -0.22, 0]} castShadow>
//             <boxGeometry args={[0.22, 0.72, 0.28]} />
//             <meshStandardMaterial
//               color={caseConfig.color}
//               metalness={caseConfig.metalness}
//               roughness={caseConfig.roughness}
//             />
//           </mesh>
//           <mesh position={[0.72, -0.22, 0]} castShadow>
//             <boxGeometry args={[0.22, 0.72, 0.28]} />
//             <meshStandardMaterial
//               color={caseConfig.color}
//               metalness={caseConfig.metalness}
//               roughness={caseConfig.roughness}
//             />
//           </mesh>
//         </group>

//         {/* Precision Crown (3 o'clock position) */}
//         <group position={[1.42, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
//           {/* Stem base */}
//           <mesh castShadow>
//             <cylinderGeometry args={[0.24, 0.26, 0.22, 32]} />
//             <meshStandardMaterial
//               color={caseConfig.color}
//               metalness={0.9}
//               roughness={0.2}
//             />
//           </mesh>
//           {/* Fluted crown cylinder */}
//           <mesh position={[0, 0.14, 0]} castShadow>
//             <cylinderGeometry args={[0.22, 0.22, 0.16, 24]} />
//             <meshStandardMaterial
//               color={caseConfig.color}
//               metalness={0.95}
//               roughness={0.35}
//             />
//           </mesh>
//           {/* Crown end-cap with blue jewel cabochon accent */}
//           <mesh position={[0, 0.23, 0]}>
//             <sphereGeometry
//               args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]}
//             />
//             <meshStandardMaterial
//               color={dialConfig.accent}
//               metalness={0.3}
//               roughness={0.1}
//               emissive={dialConfig.accent}
//               emissiveIntensity={0.3}
//             />
//           </mesh>
//         </group>
//       </group>

//       {/* ---------------- 2. CERAMIC / BRUSHED BEZEL ---------------- */}
//       <group position={[0, 0, bezelZ]}>
//         <mesh castShadow>
//           <torusGeometry args={[1.28, 0.11, 24, 64]} />
//           <meshStandardMaterial
//             color="#14161C"
//             metalness={0.92}
//             roughness={0.18}
//             envMapIntensity={2.0}
//           />
//         </mesh>
//         {/* Bezel tachymeter / minute index markers */}
//         <mesh position={[0, 0, -0.01]}>
//           <ringGeometry args={[1.18, 1.34, 48]} />
//           <meshStandardMaterial
//             color="#1C1E26"
//             metalness={0.9}
//             roughness={0.3}
//           />
//         </mesh>
//       </group>

//       {/* ---------------- 3. SAPPHIRE CRYSTAL DOME ---------------- */}
//       <group position={[0, 0, crystalZ]}>
//         <mesh rotation={[Math.PI / 2, 0, 0]}>
//           <cylinderGeometry args={[1.22, 1.22, 0.07, 48]} />
//           <meshPhysicalMaterial
//             color="#E8F0FF"
//             transmission={0.55}
//             opacity={0.3}
//             transparent
//             roughness={0.04}
//             ior={1.5}
//             thickness={0.12}
//             reflectivity={0.45}
//             clearcoat={0.8}
//             clearcoatRoughness={0.05}
//           />
//         </mesh>
//       </group>

//       {/* ---------------- 4. DIAL FACE & INDICES ---------------- */}
//       <group position={[0, 0, dialZ]}>
//         {/* Main Sunburst Dial Disc */}
//         <mesh receiveShadow rotation={[Math.PI / 2, 0, 0]}>
//           <cylinderGeometry args={[1.18, 1.18, 0.04, 64]} />
//           <meshStandardMaterial
//             color={dialConfig.color}
//             metalness={0.7}
//             roughness={0.25}
//             envMapIntensity={1.6}
//           />
//         </mesh>

//         {/* Outer Minute Chapter Ring */}
//         <mesh position={[0, 0, 0.025]}>
//           <ringGeometry args={[1.02, 1.16, 64]} />
//           <meshStandardMaterial
//             color="#08080C"
//             metalness={0.5}
//             roughness={0.5}
//           />
//         </mesh>

//         {/* Hour Indices */}
//         {hourMarkers.map((marker) => (
//           <group key={marker.id} position={marker.pos} rotation={marker.rot}>
//             <mesh castShadow>
//               <boxGeometry args={marker.size} />
//               <meshStandardMaterial
//                 color="#FFFFFF"
//                 metalness={0.95}
//                 roughness={0.15}
//                 emissive={marker.isQuarter ? dialConfig.accent : "#94A3B8"}
//                 emissiveIntensity={0.2}
//               />
//             </mesh>
//           </group>
//         ))}

//         {/* Minute Ticks */}
//         {minuteTicks.map((tick) => (
//           <mesh key={tick.id} position={tick.pos} rotation={tick.rot}>
//             <boxGeometry args={[0.015, 0.05, 0.01]} />
//             <meshBasicMaterial color="#64748B" opacity={0.6} transparent />
//           </mesh>
//         ))}

//         {/* Brand Inscription Plate (12 o'clock) */}
//         <group position={[0, 0.52, 0.03]}>
//           {/* Emblem triangle */}
//           <mesh position={[0, 0.06, 0]}>
//             <cylinderGeometry args={[0.04, 0.04, 0.01, 3]} />
//             <meshStandardMaterial
//               color={dialConfig.accent}
//               metalness={0.8}
//               roughness={0.2}
//             />
//           </mesh>
//           {/* Logo badge bar */}
//           <mesh>
//             <boxGeometry args={[0.34, 0.04, 0.01]} />
//             <meshStandardMaterial
//               color="#FFFFFF"
//               metalness={0.9}
//               roughness={0.1}
//             />
//           </mesh>
//         </group>

//         {/* Skeleton Aperture / Open Heart Window (6 o'clock) */}
//         <group position={[0, -0.44, 0]}>
//           {/* Circular cutout ring */}
//           <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
//             <ringGeometry args={[0.26, 0.31, 32]} />
//             <meshStandardMaterial
//               color="#D4AF37"
//               metalness={0.9}
//               roughness={0.2}
//             />
//           </mesh>
//           {/* Recessed cavity */}
//           <mesh position={[0, 0, -0.035]} rotation={[Math.PI / 2, 0, 0]}>
//             <cylinderGeometry args={[0.27, 0.27, 0.06, 32]} />
//             <meshStandardMaterial
//               color="#0A0B10"
//               metalness={0.8}
//               roughness={0.6}
//             />
//           </mesh>
//         </group>
//       </group>

//       {/* ---------------- 5. MECHANICAL ENGINE & TOURBILLON GEARS ---------------- */}
//       <group position={[0, 0, movementZ]} rotation={[Math.PI / 2, 0, 0]}>
//         {/* Movement Base Plate with Perlage */}
//         <mesh position={[0, 0, 0]} receiveShadow>
//           <cylinderGeometry args={[1.2, 1.2, 0.12, 48]} />
//           <meshStandardMaterial
//             color="#2A2D38"
//             metalness={0.85}
//             roughness={0.35}
//           />
//         </mesh>

//         {/* Visible Tourbillon Balance Mechanism in the cutout */}
//         <group position={[0, -0.44, 0.02]}>
//           {/* Escapement Bridge */}
//           <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
//             <boxGeometry args={[0.42, 0.06, 0.02]} />
//             <meshStandardMaterial
//               color="#E2E8F0"
//               metalness={0.95}
//               roughness={0.15}
//             />
//           </mesh>
//           {/* Ruby Jewel Bearing */}
//           <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
//             <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
//             <meshStandardMaterial
//               color="#DC2626"
//               roughness={0.1}
//               emissive="#EF4444"
//               emissiveIntensity={0.4}
//             />
//           </mesh>
//           {/* Oscillating Balance Wheel */}
//           <group ref={balanceWheelRef} position={[0, 0, -0.01]}>
//             <mesh>
//               <torusGeometry args={[0.19, 0.018, 12, 32]} />
//               <meshStandardMaterial
//                 color="#D4AF37"
//                 metalness={0.95}
//                 roughness={0.2}
//               />
//             </mesh>
//             <mesh>
//               <boxGeometry args={[0.38, 0.02, 0.01]} />
//               <meshStandardMaterial
//                 color="#D4AF37"
//                 metalness={0.95}
//                 roughness={0.2}
//               />
//             </mesh>
//           </group>
//         </group>

//         {/* Secondary visible movement gears */}
//         {/* <group ref={gear1Ref} position={[-0.32, 0.08, 0.04]}>
//           <mesh>
//             <cylinderGeometry args={[0.22, 0.22, 0.02, 28]} />
//             <meshStandardMaterial
//               color="#D4AF37"
//               metalness={0.9}
//               roughness={0.25}
//             />
//           </mesh>
//         </group> */}
//         {/* Secondary decorative gear intentionally hidden.
//             Keep the movement clean and let the 6 o'clock aperture
//             show the actual tourbillon mechanism. */}
//       </group>

//       {/* ---------------- 6. WATCH HANDS ---------------- */}
//       <group position={[0, 0, handsZ]}>
//         {/* Center Pinion Bushing & Cap */}
//         <mesh position={[0, 0, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
//           <cylinderGeometry args={[0.07, 0.07, 0.06, 24]} />
//           <meshStandardMaterial
//             color="#FFFFFF"
//             metalness={0.95}
//             roughness={0.1}
//           />
//         </mesh>
//         <mesh position={[0, 0, 0.065]}>
//           <sphereGeometry args={[0.045, 16, 16]} />
//           <meshStandardMaterial
//             color={dialConfig.accent}
//             metalness={0.8}
//             roughness={0.1}
//           />
//         </mesh>

//         {/* Hours Hand (Shorter, faceted skeleton) */}
//         <group ref={hoursHandRef} position={[0, 0, 0]}>
//           <mesh position={[0, 0.32, 0]} castShadow>
//             <boxGeometry args={[0.065, 0.65, 0.018]} />
//             <meshStandardMaterial
//               color="#E2E8F0"
//               metalness={0.95}
//               roughness={0.15}
//             />
//           </mesh>
//           {/* Luminous insert on hour hand */}
//           <mesh position={[0, 0.35, 0.01]}>
//             <boxGeometry args={[0.028, 0.35, 0.01]} />
//             <meshStandardMaterial
//               color="#FFFFFF"
//               emissive={dialConfig.accent}
//               emissiveIntensity={0.5}
//             />
//           </mesh>
//         </group>

//         {/* Minutes Hand (Longer, reaches the minute track) */}
//         <group ref={minutesHandRef} position={[0, 0, 0.025]}>
//           <mesh position={[0, 0.48, 0]} castShadow>
//             <boxGeometry args={[0.05, 0.96, 0.016]} />
//             <meshStandardMaterial
//               color="#FFFFFF"
//               metalness={0.95}
//               roughness={0.15}
//             />
//           </mesh>
//           {/* Luminous insert on minute hand */}
//           <mesh position={[0, 0.52, 0.01]}>
//             <boxGeometry args={[0.022, 0.55, 0.01]} />
//             <meshStandardMaterial
//               color="#FFFFFF"
//               emissive={dialConfig.accent}
//               emissiveIntensity={0.5}
//             />
//           </mesh>
//         </group>

//         {/* Seconds Hand (Needle thin, signature accent color, counterweight tail) */}
//         <group ref={secondsHandRef} position={[0, 0, 0.1]}>
//           {/* Needle pointer */}
//           <mesh position={[0, 0.52, 0]}>
//             <boxGeometry args={[0.016, 1.05, 0.01]} />
//             <meshStandardMaterial
//               color={dialConfig.accent}
//               roughness={0.1}
//               metalness={0.9}
//               emissive={dialConfig.accent}
//               emissiveIntensity={0.4}
//             />
//           </mesh>
//           {/* Counterweight arrow tail */}
//           <mesh position={[0, -0.22, 0]}>
//             <boxGeometry args={[0.035, 0.3, 0.01]} />
//             <meshStandardMaterial color={dialConfig.accent} metalness={0.9} />
//           </mesh>
//         </group>
//       </group>

//       {/* ---------------- 7. CASEBACK & EXHIBITION WINDOW ---------------- */}
//       <group position={[0, 0, casebackZ]}>
//         <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
//           <cylinderGeometry args={[1.32, 1.34, 0.08, 48]} />
//           <meshStandardMaterial
//             color={caseConfig.color}
//             metalness={caseConfig.metalness}
//             roughness={caseConfig.roughness}
//           />
//         </mesh>
//         {/* Exhibition sapphire window in caseback */}
//         <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
//           <cylinderGeometry args={[0.82, 0.82, 0.02, 32]} />
//           <meshPhysicalMaterial
//             transmission={0.9}
//             opacity={0.95}
//             transparent
//             roughness={0.1}
//             ior={1.77}
//           />
//         </mesh>
//       </group>

//       {/* ---------------- 8. LUXURY STRAP (TOP & BOTTOM) ---------------- */}
//       <group position={[0, 0, -0.05]}>
//         {/* Top Strap Section */}
//         <group position={[0, 1.75, 0]}>
//           {strapConfig.textureType === "metal" ? (
//             // Segmented Metal Link Bracelet
//             <group>
//               {[-0.5, -0.15, 0.2, 0.55, 0.9].map((offsetY, idx) => (
//                 <mesh
//                   key={idx}
//                   position={[0, offsetY, -0.05 - idx * 0.06]}
//                   castShadow
//                 >
//                   <boxGeometry args={[1.22 - idx * 0.05, 0.32, 0.12]} />
//                   <meshStandardMaterial
//                     color={strapConfig.color}
//                     metalness={0.92}
//                     roughness={idx % 2 === 0 ? 0.2 : 0.4}
//                   />
//                 </mesh>
//               ))}
//             </group>
//           ) : strapConfig.textureType === "rubber" ? (
//             // Stealth Ribbed Rubber Strap
//             <group>
//               <mesh
//                 position={[0, 0.2, -0.08]}
//                 rotation={[-0.12, 0, 0]}
//                 castShadow
//               >
//                 <boxGeometry args={[1.2, 1.5, 0.14]} />
//                 <meshStandardMaterial
//                   color={strapConfig.color}
//                   roughness={0.88}
//                   metalness={0.05}
//                 />
//               </mesh>
//               {/* Rubber chevron ribs */}
//               {[-0.3, 0, 0.3, 0.6].map((ribY, i) => (
//                 <mesh
//                   key={i}
//                   position={[0, ribY, 0.01]}
//                   rotation={[-0.12, 0, 0]}
//                 >
//                   <boxGeometry args={[1.05, 0.08, 0.04]} />
//                   <meshStandardMaterial color="#2E3349" roughness={0.7} />
//                 </mesh>
//               ))}
//             </group>
//           ) : (
//             // Full Grain Hand-Stitched Leather Strap
//             <group>
//               <mesh
//                 position={[0, 0.25, -0.08]}
//                 rotation={[-0.14, 0, 0]}
//                 castShadow
//               >
//                 <boxGeometry args={[1.22, 1.6, 0.14]} />
//                 <meshStandardMaterial
//                   color={strapConfig.color}
//                   roughness={strapConfig.roughness}
//                   metalness={strapConfig.metalness}
//                 />
//               </mesh>
//               {/* Subtle edge stitching lines */}
//               <mesh position={[-0.52, 0.25, 0.01]} rotation={[-0.14, 0, 0]}>
//                 <boxGeometry args={[0.03, 1.5, 0.02]} />
//                 <meshBasicMaterial color="#E2E8F0" opacity={0.4} transparent />
//               </mesh>
//               <mesh position={[0.52, 0.25, 0.01]} rotation={[-0.14, 0, 0]}>
//                 <boxGeometry args={[0.03, 1.5, 0.02]} />
//                 <meshBasicMaterial color="#E2E8F0" opacity={0.4} transparent />
//               </mesh>
//             </group>
//           )}
//         </group>

//         {/* Bottom Strap Section */}
//         <group position={[0, -1.75, 0]}>
//           {strapConfig.textureType === "metal" ? (
//             <group>
//               {[0.5, 0.15, -0.2, -0.55, -0.9].map((offsetY, idx) => (
//                 <mesh
//                   key={idx}
//                   position={[0, offsetY, -0.05 - idx * 0.06]}
//                   castShadow
//                 >
//                   <boxGeometry args={[1.22 - idx * 0.05, 0.32, 0.12]} />
//                   <meshStandardMaterial
//                     color={strapConfig.color}
//                     metalness={0.92}
//                     roughness={idx % 2 === 0 ? 0.2 : 0.4}
//                   />
//                 </mesh>
//               ))}
//             </group>
//           ) : strapConfig.textureType === "rubber" ? (
//             <group>
//               <mesh
//                 position={[0, -0.2, -0.08]}
//                 rotation={[0.12, 0, 0]}
//                 castShadow
//               >
//                 <boxGeometry args={[1.2, 1.5, 0.14]} />
//                 <meshStandardMaterial
//                   color={strapConfig.color}
//                   roughness={0.88}
//                   metalness={0.05}
//                 />
//               </mesh>
//               {/* Buckle pin loop */}
//               <mesh position={[0, -0.9, -0.15]}>
//                 <boxGeometry args={[0.7, 0.15, 0.18]} />
//                 <meshStandardMaterial
//                   color={caseConfig.color}
//                   metalness={0.9}
//                   roughness={0.3}
//                 />
//               </mesh>
//             </group>
//           ) : (
//             <group>
//               <mesh
//                 position={[0, -0.25, -0.08]}
//                 rotation={[0.14, 0, 0]}
//                 castShadow
//               >
//                 <boxGeometry args={[1.22, 1.6, 0.14]} />
//                 <meshStandardMaterial
//                   color={strapConfig.color}
//                   roughness={strapConfig.roughness}
//                   metalness={strapConfig.metalness}
//                 />
//               </mesh>
//               {/* Strap adjustment holes */}
//               {[-0.2, -0.45, -0.7].map((holeY, i) => (
//                 <mesh
//                   key={i}
//                   position={[0, holeY, 0.01]}
//                   rotation={[0.14, 0, 0]}
//                 >
//                   <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
//                   <meshBasicMaterial color="#0A0A0C" />
//                 </mesh>
//               ))}
//             </group>
//           )}
//         </group>
//       </group>
//     </group>
//   );
// }
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ProceduralWatch({
  caseConfig = {
    color: "#4468ca",
    metalness: 0.85,
    roughness: 0.28,
  },
  strapConfig = {
    color: "#121214",
    textureType: "leather",
    roughness: 0.7,
    metalness: 0.1,
  },
  dialConfig = {
    color: "#0B0C10",
    accent: "#080e11",
  },
  explodeFactor = 0,
}) {
  const watchGroup = useRef();
  const secondsHandRef = useRef();
  const minutesHandRef = useRef();
  const hoursHandRef = useRef();
  const balanceWheelRef = useRef();
  const gear1Ref = useRef();
  const gear2Ref = useRef();

  // Animation frame loop for watch mechanics
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Continuous sweeping seconds hand (1 full turn every 60s)
    if (secondsHandRef.current) {
      secondsHandRef.current.rotation.z = -time * 1.5;
    }
    // Minutes hand
    if (minutesHandRef.current) {
      minutesHandRef.current.rotation.z = -time * 0.1;
    }
    // Hours hand
    if (hoursHandRef.current) {
      hoursHandRef.current.rotation.z = -time * 0.02;
    }

    // High-beat Tourbillon balance wheel oscillation (4Hz rapid oscillation)
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(time * 25) * 1.8;
    }

    // Continuous gear train rotation
    if (gear1Ref.current) gear1Ref.current.rotation.z = time * 0.8;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -time * 0.5;
  });

  // Hour markers geometry calculation
  const hourMarkers = useMemo(() => {
    const markers = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 1.05;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      const isQuarter = i % 3 === 0;
      markers.push({
        id: i,
        pos: [x, y, 0.08],
        rot: [0, 0, -angle],
        size: isQuarter ? [0.06, 0.22, 0.04] : [0.04, 0.14, 0.03],
        isQuarter,
      });
    }
    return markers;
  }, []);

  // Minute ticks calculation
  const minuteTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i < 60; i++) {
      if (i % 5 === 0) continue; // Skip hour positions
      const angle = (i / 60) * Math.PI * 2;
      const radius = 1.12;
      ticks.push({
        id: i,
        pos: [Math.sin(angle) * radius, Math.cos(angle) * radius, 0.06],
        rot: [0, 0, -angle],
      });
    }
    return ticks;
  }, []);

  // Calculate exploded layer offsets based on explodeFactor
  // Stable front-to-back layer stack:
  // crystal > hands > bezel > dial > case > movement > caseback
  const crystalZ = 0.18 + explodeFactor * 1.4;
  const handsZ = 0.24 + explodeFactor * 0.5;
  const bezelZ = 0.38 + explodeFactor * 0.9;
  const dialZ = 0.14 + explodeFactor * 0.2;

  const movementZ = -0.12 - explodeFactor * 0.5;
  const casebackZ = -0.32 - explodeFactor * 1.0;

  return (
    <group ref={watchGroup} dispose={null}>
      {/* ---------------- 1. WATCH CASE & LUGS ---------------- */}
      <group position={[0, 0, 0]}>
        {/* Main Monobloc Case Body */}
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.36, 1.34, 0.38, 64]} />
          <meshStandardMaterial
            color={caseConfig.color}
            metalness={caseConfig.metalness}
            roughness={caseConfig.roughness}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Case Stepped Rim */}
        <mesh position={[0, 0, 0.05]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.42, 1.4, 0.18, 64]} />
          <meshStandardMaterial
            color={caseConfig.color}
            metalness={caseConfig.metalness}
            roughness={Math.max(0.1, caseConfig.roughness - 0.05)}
            envMapIntensity={1.8}
          />
        </mesh>

        {/* Top Sculpted Lugs (connecting to upper strap) */}
        <group position={[0, 1.35, -0.02]} rotation={[0.15, 0, 0]}>
          <mesh position={[-0.72, 0.22, 0]} castShadow>
            <boxGeometry args={[0.22, 0.72, 0.28]} />
            <meshStandardMaterial
              color={caseConfig.color}
              metalness={caseConfig.metalness}
              roughness={caseConfig.roughness}
            />
          </mesh>
          <mesh position={[0.72, 0.22, 0]} castShadow>
            <boxGeometry args={[0.22, 0.72, 0.28]} />
            <meshStandardMaterial
              color={caseConfig.color}
              metalness={caseConfig.metalness}
              roughness={caseConfig.roughness}
            />
          </mesh>
        </group>

        {/* Bottom Sculpted Lugs (connecting to lower strap) */}
        <group position={[0, -1.35, -0.02]} rotation={[-0.15, 0, 0]}>
          <mesh position={[-0.72, -0.22, 0]} castShadow>
            <boxGeometry args={[0.22, 0.72, 0.28]} />
            <meshStandardMaterial
              color={caseConfig.color}
              metalness={caseConfig.metalness}
              roughness={caseConfig.roughness}
            />
          </mesh>
          <mesh position={[0.72, -0.22, 0]} castShadow>
            <boxGeometry args={[0.22, 0.72, 0.28]} />
            <meshStandardMaterial
              color={caseConfig.color}
              metalness={caseConfig.metalness}
              roughness={caseConfig.roughness}
            />
          </mesh>
        </group>

        {/* Precision Crown (3 o'clock position) */}
        <group position={[1.42, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          {/* Stem base */}
          <mesh castShadow>
            <cylinderGeometry args={[0.24, 0.26, 0.22, 32]} />
            <meshStandardMaterial
              color={caseConfig.color}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          {/* Fluted crown cylinder */}
          <mesh position={[0, 0.14, ]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.16, 24]} />
            <meshStandardMaterial
              color={caseConfig.color}
              metalness={0.95}
              roughness={0.35}
            />
          </mesh>
          {/* Crown end-cap with blue jewel cabochon accent */}
          <mesh position={[0, 0.23, 0]}>
            <sphereGeometry
              args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]}
            />
            <meshStandardMaterial
              color={dialConfig.accent}
              metalness={0.3}
              roughness={0.1}
              emissive={dialConfig.accent}
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* ---------------- 2. CERAMIC / BRUSHED BEZEL ---------------- */}
      <group position={[0, 0, bezelZ]}>
        <mesh castShadow>
          <torusGeometry args={[1.28, 0.11, 24, 64]} />
          <meshStandardMaterial
            color="#14161C"
            metalness={0.92}
            roughness={0.18}
            envMapIntensity={2.0}
          />
        </mesh>
        {/* Bezel tachymeter / minute index markers */}
        <mesh position={[0, 0, -0.01]}>
          <ringGeometry args={[1.18, 1.34, 48]} />
          <meshStandardMaterial
            color="#1C1E26"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* ---------------- 3. SAPPHIRE CRYSTAL DOME ---------------- */}
      <group position={[0, 0, crystalZ]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.22, 1.22, 0.07, 48]} />
          <meshPhysicalMaterial
            color="#E8F0FF"
            transmission={0.55}
            opacity={0.3}
            transparent
            roughness={0.04}
            ior={1.5}
            thickness={0.12}
            reflectivity={0.45}
            clearcoat={0.8}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </group>

      {/* ---------------- 4. DIAL FACE & INDICES ---------------- */}
      <group position={[0, 0, dialZ]}>
        {/* Main Sunburst Dial Disc */}
        <mesh receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.18, 1.18, 0.04, 64]} />
          <meshStandardMaterial
            color={dialConfig.color}
            metalness={0.7}
            roughness={0.25}
            envMapIntensity={1.6}
          />
        </mesh>

        {/* Outer Minute Chapter Ring */}
        <mesh position={[0, 0, 0.025]}>
          <ringGeometry args={[1.02, 1.16, 64]} />
          <meshStandardMaterial
            color="#08080C"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>

        {/* Hour Indices */}
        {hourMarkers.map((marker) => (
          <group key={marker.id} position={marker.pos} rotation={marker.rot}>
            <mesh castShadow>
              <boxGeometry args={marker.size} />
              <meshStandardMaterial
                color="#FFFFFF"
                metalness={0.95}
                roughness={0.15}
                emissive={marker.isQuarter ? dialConfig.accent : "#94A3B8"}
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        ))}

        {/* Minute Ticks */}
        {minuteTicks.map((tick) => (
          <mesh key={tick.id} position={tick.pos} rotation={tick.rot}>
            <boxGeometry args={[0.015, 0.05, 0.01]} />
            <meshBasicMaterial color="#64748B" opacity={0.6} transparent />
          </mesh>
        ))}

        {/* Brand Inscription Plate (12 o'clock) */}
        <group position={[0, 0.52, 0.03]}>
          {/* Emblem triangle */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.01, 3]} />
            <meshStandardMaterial
              color={dialConfig.accent}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Logo badge bar */}
          <mesh>
            <boxGeometry args={[0.34, 0.04, 0.01]} />
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Skeleton Aperture / Open Heart Window (6 o'clock) */}
        <group position={[0, -0.44, 0]}>
          {/* Circular cutout ring */}
          <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.26, 0.31, 32]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          {/* Recessed cavity */}
          <mesh position={[0, 0, -0.035]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.06, 32]} />
            <meshStandardMaterial
              color="#0A0B10"
              metalness={0.8}
              roughness={0.6}
            />
          </mesh>
        </group>
      </group>

      {/* ---------------- 5. MECHANICAL ENGINE & TOURBILLON GEARS ---------------- */}
      <group position={[0, 0, movementZ]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Movement Base Plate with Perlage */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.12, 48]} />
          <meshStandardMaterial
            color="#2A2D38"
            metalness={0.85}
            roughness={0.35}
          />
        </mesh>

        {/* Visible Tourbillon Balance Mechanism in the cutout */}
        <group position={[0, -0.44, 0.02]}>
          {/* Escapement Bridge */}
          <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.42, 0.06, 0.02]} />
            <meshStandardMaterial
              color="#E2E8F0"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Ruby Jewel Bearing */}
          <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
            <meshStandardMaterial
              color="#DC2626"
              roughness={0.1}
              emissive="#EF4444"
              emissiveIntensity={0.4}
            />
          </mesh>
          {/* Oscillating Balance Wheel */}
          <group ref={balanceWheelRef} position={[0, 0, -0.01]}>
            <mesh>
              <torusGeometry args={[0.19, 0.018, 12, 32]} />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={0.95}
                roughness={0.2}
              />
            </mesh>
            <mesh>
              <boxGeometry args={[0.38, 0.02, 0.01]} />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={0.95}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>

        {/* Secondary visible movement gears */}
        {/* <group ref={gear1Ref} position={[-0.32, 0.08, 0.04]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 0.02, 28]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>
        </group> */}
        {/* Secondary decorative gear intentionally hidden.
            Keep the movement clean and let the 6 o'clock aperture
            show the actual tourbillon mechanism. */}
      </group>

      {/* ---------------- 6. WATCH HANDS ---------------- */}
      <group position={[0, 0, handsZ]}>
        {/* Center Pinion Bushing & Cap */}
        <mesh position={[0, 0, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 24]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0, 0.065]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color={dialConfig.accent}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Hours Hand (Shorter, faceted skeleton) */}
        <group ref={hoursHandRef} position={[0, 0, 0]}>
          <mesh position={[0, 0.32, 0]} castShadow>
            <boxGeometry args={[0.065, 0.65, 0.018]} />
            <meshStandardMaterial
              color="#E2E8F0"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Luminous insert on hour hand */}
          <mesh position={[0, 0.35, 0.01]}>
            <boxGeometry args={[0.028, 0.35, 0.01]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive={dialConfig.accent}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>

        {/* Minutes Hand (Longer, reaches the minute track) */}
        <group ref={minutesHandRef} position={[0, 0, 0.025]}>
          <mesh position={[0, 0.48, 0]} castShadow>
            <boxGeometry args={[0.05, 0.96, 0.016]} />
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Luminous insert on minute hand */}
          <mesh position={[0, 0.52, 0.01]}>
            <boxGeometry args={[0.022, 0.55, 0.01]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive={dialConfig.accent}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>

        {/* Seconds Hand (Needle thin, signature accent color, counterweight tail) */}
        <group ref={secondsHandRef} position={[0, 0, 0.1]}>
          {/* Needle pointer */}
          <mesh position={[0, 0.52, 0]}>
            <boxGeometry args={[0.016, 1.05, 0.01]} />
            <meshStandardMaterial
              color={dialConfig.accent}
              roughness={0.1}
              metalness={0.9}
              emissive={dialConfig.accent}
              emissiveIntensity={0.4}
            />
          </mesh>
          {/* Counterweight arrow tail */}
          <mesh position={[0, -0.22, 0]}>
            <boxGeometry args={[0.035, 0.3, 0.01]} />
            <meshStandardMaterial color={dialConfig.accent} metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* ---------------- 7. CASEBACK & EXHIBITION WINDOW ---------------- */}
      <group position={[0, 0, casebackZ]}>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.32, 1.34, 0.08, 48]} />
          <meshStandardMaterial
            color={caseConfig.color}
            metalness={caseConfig.metalness}
            roughness={caseConfig.roughness}
          />
        </mesh>
        {/* Exhibition sapphire window in caseback */}
        <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.02, 32]} />
          <meshPhysicalMaterial
            transmission={0.9}
            opacity={0.95}
            transparent
            roughness={0.1}
            ior={1.77}
          />
        </mesh>
      </group>

      {/* ---------------- 8. LUXURY STRAP (TOP & BOTTOM) ---------------- */}
      <group position={[0, 0, -0.05]}>
        {/* Top Strap Section */}
        <group position={[0, 1.75, 0]}>
          {strapConfig.textureType === "metal" ? (
            // Segmented Metal Link Bracelet
            <group>
              {[-0.5, -0.15, 0.2, 0.55, 0.9].map((offsetY, idx) => (
                <mesh
                  key={idx}
                  position={[0, offsetY, -0.05 - idx * 0.06]}
                  castShadow
                >
                  <boxGeometry args={[1.22 - idx * 0.05, 0.32, 0.12]} />
                  <meshStandardMaterial
                    color={strapConfig.color}
                    metalness={0.92}
                    roughness={idx % 2 === 0 ? 0.2 : 0.4}
                  />
                </mesh>
              ))}
            </group>
          ) : strapConfig.textureType === "rubber" ? (
            // Stealth Ribbed Rubber Strap
            <group>
              <mesh
                position={[0, 0.2, -0.08]}
                rotation={[-0.12, 0, 0]}
                castShadow
              >
                <boxGeometry args={[1.2, 1.5, 0.14]} />
                <meshStandardMaterial
                  color={strapConfig.color}
                  roughness={0.88}
                  metalness={0.05}
                />
              </mesh>
              {/* Rubber chevron ribs */}
              {[-0.3, 0, 0.3, 0.6].map((ribY, i) => (
                <mesh
                  key={i}
                  position={[0, ribY, 0.01]}
                  rotation={[-0.12, 0, 0]}
                >
                  <boxGeometry args={[1.05, 0.08, 0.04]} />
                  <meshStandardMaterial color="#2E3349" roughness={0.7} />
                </mesh>
              ))}
            </group>
          ) : (
            // Full Grain Hand-Stitched Leather Strap
            <group>
              <mesh
                position={[0, 0.25, -0.08]}
                rotation={[-0.14, 0, 0]}
                castShadow
              >
                <boxGeometry args={[1.22, 1.6, 0.14]} />
                <meshStandardMaterial
                  color={strapConfig.color}
                  roughness={strapConfig.roughness}
                  metalness={strapConfig.metalness}
                />
              </mesh>
              {/* Subtle edge stitching lines */}
              <mesh position={[-0.52, 0.25, 0.01]} rotation={[-0.14, 0, 0]}>
                <boxGeometry args={[0.03, 1.5, 0.02]} />
                <meshBasicMaterial color="#E2E8F0" opacity={0.4} transparent />
              </mesh>
              <mesh position={[0.52, 0.25, 0.01]} rotation={[-0.14, 0, 0]}>
                <boxGeometry args={[0.03, 1.5, 0.02]} />
                <meshBasicMaterial color="#E2E8F0" opacity={0.4} transparent />
              </mesh>
            </group>
          )}
        </group>

        {/* Bottom Strap Section */}
        <group position={[0, -1.75, 0]}>
          {strapConfig.textureType === "metal" ? (
            <group>
              {[0.5, 0.15, -0.2, -0.55, -0.9].map((offsetY, idx) => (
                <mesh
                  key={idx}
                  position={[0, offsetY, -0.05 - idx * 0.06]}
                  castShadow
                >
                  <boxGeometry args={[1.22 - idx * 0.05, 0.32, 0.12]} />
                  <meshStandardMaterial
                    color={strapConfig.color}
                    metalness={0.92}
                    roughness={idx % 2 === 0 ? 0.2 : 0.4}
                  />
                </mesh>
              ))}
            </group>
          ) : strapConfig.textureType === "rubber" ? (
            <group>
              <mesh
                position={[0, -0.2, -0.08]}
                rotation={[0.12, 0, 0]}
                castShadow
              >
                <boxGeometry args={[1.2, 1.5, 0.14]} />
                <meshStandardMaterial
                  color={strapConfig.color}
                  roughness={0.88}
                  metalness={0.05}
                />
              </mesh>
              {/* Buckle pin loop */}
              <mesh position={[0, -0.9, -0.15]}>
                <boxGeometry args={[0.7, 0.15, 0.18]} />
                <meshStandardMaterial
                  color={caseConfig.color}
                  metalness={0.9}
                  roughness={0.3}
                />
              </mesh>
            </group>
          ) : (
            <group>
              <mesh
                position={[0, -0.25, -0.08]}
                rotation={[0.14, 0, 0]}
                castShadow
              >
                <boxGeometry args={[1.22, 1.6, 0.14]} />
                <meshStandardMaterial
                  color={strapConfig.color}
                  roughness={strapConfig.roughness}
                  metalness={strapConfig.metalness}
                />
              </mesh>
              {/* Strap adjustment holes */}
              {[-0.2, -0.45, -0.7].map((holeY, i) => (
                <mesh
                  key={i}
                  position={[0, holeY, 0.01]}
                  rotation={[0.14, 0, 0]}
                >
                  <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
                  <meshBasicMaterial color="#0A0A0C" />
                </mesh>
              ))}
            </group>
          )}
        </group>
      </group>
    </group>
  );
}
