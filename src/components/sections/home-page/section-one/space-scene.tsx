"use client";

/**
 * Realistic Wireframe Space Scene Component
 *
 * A detailed 3D space environment featuring:
 * - Space station with rotating modules
 * - Satellites in orbit
 * - Space debris and asteroids
 * - Realistic wireframe materials
 * - Dynamic lighting and effects
 */

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Scroll-based animation hook
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const elementTop = 0; // Assuming this is at the top
      const elementHeight = windowHeight;

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(
        0,
        Math.min(1, scrollTop / (elementHeight * 2)),
      );
      setScrollY(scrollProgress);

      // Check if element is visible
      const rect = { top: elementTop, bottom: elementTop + elementHeight };
      const isInView =
        scrollTop < rect.bottom && scrollTop + windowHeight > rect.top;
      setIsVisible(isInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, isVisible };
}

// Isometric Camera Setup Component with scroll effects
function IsometricCamera() {
  const { camera, size } = useThree();
  const { scrollY } = useScrollAnimation();

  useEffect(() => {
    const aspect = size.width / size.height;
    const isMobile = size.width < 768; // Mobile breakpoint
    const d = Math.max(size.width, size.height) / (isMobile ? 80 : 100); // Zoom out more on mobile

    // Create orthographic camera that fills the screen
    const orthoCamera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      1,
      1000,
    );

    // Position camera to fill screen with more noticeable scroll effects
    const basePosition = { x: 15, y: 15, z: 15 };
    const scrollOffset = scrollY * 15; // Increased for more noticeable effect

    orthoCamera.position.set(
      basePosition.x + scrollOffset * 0.6,
      basePosition.y + scrollOffset * 0.4,
      basePosition.z + scrollOffset * 0.8,
    );
    orthoCamera.lookAt(0, 0, 0);

    // Replace the perspective camera
    camera.copy(orthoCamera);
  }, [camera, size, scrollY]);

  return null;
}

// Custom Star Field Component
function CustomStarField() {
  const starsRef = useRef<THREE.Points>(null);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const starGeometry = useMemo(() => {
    const starCount = isLight ? 1500 : 3000; // Reduce stars in light mode
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    return new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
  }, [isLight]);

  return (
    <points ref={starsRef} geometry={starGeometry}>
      <pointsMaterial
        color={isLight ? "#666666" : "#ffffff"}
        size={isLight ? 0.2 : 0.3}
        transparent
        opacity={isLight ? 0.4 : 0.8}
        sizeAttenuation={false}
      />
    </points>
  );
}

// Theme-aware Material Factory Function
function createWireframeMaterial(color: string, opacity: number, isLight: boolean = false) {
  return new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
    transparent: true,
    opacity: isLight ? opacity * 0.8 : opacity, // Reduce opacity in light mode
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: false,
  });
}

// Theme-aware color palette
function getThemeColors(isLight: boolean) {
  if (isLight) {
    return {
      primary: "#d97706", // Darker orange for light mode
      secondary: "#ea580c", // Darker red-orange
      accent: "#f59e0b", // Darker amber
      grid: "#d97706", // Darker grid color
      orbital: "#d97706", // Darker orbital rings
    };
  } else {
    return {
      primary: "#ff8c00", // Original orange
      secondary: "#ff6b35", // Original red-orange
      accent: "#ffa500", // Original amber
      grid: "#ff8c00", // Original grid color
      orbital: "#ff8c00", // Original orbital rings
    };
  }
}

// Space Station Component with scroll effects
function SpaceStation() {
  const stationRef = useRef<THREE.Group>(null);
  const solarPanelRef = useRef<THREE.Group>(null);
  const { scrollY, isVisible } = useScrollAnimation();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const colors = getThemeColors(isLight);
  
  const wireframeMaterial = useMemo(() => createWireframeMaterial(colors.primary, 0.6, isLight), [colors.primary, isLight]);
  const wireframeMaterialSecondary = useMemo(() => createWireframeMaterial(colors.secondary, 0.5, isLight), [colors.secondary, isLight]);
  const wireframeMaterialAccent = useMemo(() => createWireframeMaterial(colors.accent, 0.4, isLight), [colors.accent, isLight]);

  useFrame((state) => {
    if (stationRef.current && isVisible) {
      // More noticeable rotation with scroll acceleration
      const baseRotation = 0.0008;
      const scrollAcceleration = scrollY * 0.008;
      stationRef.current.rotation.y += baseRotation + scrollAcceleration;

      // More noticeable scale effect based on scroll
      const baseScale = 1;
      const scrollScale = 1 + scrollY * 0.3;
      stationRef.current.scale.setScalar(baseScale + scrollScale * 0.15);

      // More noticeable floating effect
      stationRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3 + scrollY * 2) * 0.8;

      // More noticeable rotation on other axes
      stationRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2 + scrollY * 1.5) * 0.15;
      stationRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.25 + scrollY * 1) * 0.1;
    }
    if (solarPanelRef.current && isVisible) {
      // More noticeable solar panel rotation
      const baseRotation = 0.003;
      const scrollAcceleration = scrollY * 0.015;
      solarPanelRef.current.rotation.y += baseRotation + scrollAcceleration;
    }
  });

  return (
    <group ref={stationRef} position={[0, 0, 0]}>
      {/* Main Station Hub */}
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 2, 8]} />
        <primitive object={wireframeMaterial.clone()} />
      </mesh>

      {/* Station Modules */}
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <primitive object={wireframeMaterialSecondary.clone()} />
      </mesh>

      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <primitive object={wireframeMaterialSecondary.clone()} />
      </mesh>

      <mesh position={[0, 0, 3]}>
        <boxGeometry args={[1, 1, 2]} />
        <primitive object={wireframeMaterialSecondary.clone()} />
      </mesh>

      <mesh position={[0, 0, -3]}>
        <boxGeometry args={[1, 1, 2]} />
        <primitive object={wireframeMaterialSecondary.clone()} />
      </mesh>

      {/* Solar Panels */}
      <group ref={solarPanelRef}>
        <mesh position={[5, 0, 0]}>
          <boxGeometry args={[0.2, 4, 2]} />
          <primitive object={wireframeMaterialAccent.clone()} />
        </mesh>
        <mesh position={[-5, 0, 0]}>
          <boxGeometry args={[0.2, 4, 2]} />
          <primitive object={wireframeMaterialAccent.clone()} />
        </mesh>
      </group>

      {/* Antenna */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 6]} />
        <primitive object={wireframeMaterial.clone()} />
      </mesh>
    </group>
  );
}

// Satellite Component with variations and scroll effects
function Satellite({
  position,
  orbitRadius,
  orbitSpeed,
  orbitTilt = 0,
  satelliteType = "standard",
  rotationSpeed = 0.01,
  scrollMultiplier = 1,
}: {
  position: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt?: number;
  satelliteType?: "standard" | "cube" | "sphere" | "long";
  rotationSpeed?: number;
  scrollMultiplier?: number;
}) {
  const satelliteRef = useRef<THREE.Group>(null);
  const { scrollY, isVisible } = useScrollAnimation();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const colors = getThemeColors(isLight);
  
  const wireframeMaterial = useMemo(() => createWireframeMaterial(colors.primary, 0.6, isLight), [colors.primary, isLight]);
  const wireframeMaterialAccent = useMemo(() => createWireframeMaterial(colors.accent, 0.4, isLight), [colors.accent, isLight]);

  useFrame((state) => {
    if (satelliteRef.current && isVisible) {
      // More noticeable orbital motion with scroll effects
      const time = state.clock.elapsedTime * orbitSpeed;
      const scrollAcceleration = scrollY * scrollMultiplier * 0.8;

      const x = position[0] + Math.cos(time + scrollAcceleration) * orbitRadius;
      const y = position[1] + Math.sin(time + scrollAcceleration) * orbitTilt;
      const z = position[2] + Math.sin(time + scrollAcceleration) * orbitRadius;

      satelliteRef.current.position.set(x, y, z);

      // More noticeable rotation with scroll effect
      const scrollRotation = scrollY * scrollMultiplier * 0.03;
      satelliteRef.current.rotation.y += rotationSpeed + scrollRotation;

      // More noticeable scale pulsing effect
      const pulseScale =
        1 + Math.sin(state.clock.elapsedTime * 1.5 + scrollY * 3) * 0.2;
      const scrollScale = 1 + scrollY * 0.3;
      satelliteRef.current.scale.setScalar(pulseScale * scrollScale);

      // More noticeable rotation on other axes
      satelliteRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 1 + scrollY * 2) * 0.15;
      satelliteRef.current.rotation.z =
        Math.cos(state.clock.elapsedTime * 0.8 + scrollY * 1.5) * 0.1;
    }
  });

  const renderSatelliteBody = () => {
    switch (satelliteType) {
      case "cube":
        return <boxGeometry args={[0.6, 0.6, 0.6]} />;
      case "sphere":
        return <sphereGeometry args={[0.4, 8, 6]} />;
      case "long":
        return <boxGeometry args={[1.2, 0.3, 0.3]} />;
      default:
        return <boxGeometry args={[0.8, 0.4, 0.4]} />;
    }
  };

  return (
    <group ref={satelliteRef} position={position}>
      {/* Main Body */}
      <mesh>
        {renderSatelliteBody()}
        <primitive object={wireframeMaterial.clone()} />
      </mesh>

      {/* Solar Panels - different configurations */}
      {satelliteType === "long" ? (
        <>
          <mesh position={[0.8, 0, 0]}>
            <boxGeometry args={[0.1, 1.2, 0.6]} />
            <primitive object={wireframeMaterialAccent.clone()} />
          </mesh>
          <mesh position={[-0.8, 0, 0]}>
            <boxGeometry args={[0.1, 1.2, 0.6]} />
            <primitive object={wireframeMaterialAccent.clone()} />
          </mesh>
        </>
      ) : satelliteType === "sphere" ? (
        <>
          <mesh position={[0.5, 0, 0]}>
            <boxGeometry args={[0.1, 0.8, 0.8]} />
            <primitive object={wireframeMaterialAccent.clone()} />
          </mesh>
          <mesh position={[-0.5, 0, 0]}>
            <boxGeometry args={[0.1, 0.8, 0.8]} />
            <primitive object={wireframeMaterialAccent.clone()} />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[0.6, 0, 0]}>
            <boxGeometry args={[0.1, 1.5, 0.8]} />
            <primitive object={wireframeMaterialAccent.clone()} />
          </mesh>
          <mesh position={[-0.6, 0, 0]}>
            <boxGeometry args={[0.1, 1.5, 0.8]} />
            <primitive object={wireframeMaterialAccent.clone()} />
          </mesh>
        </>
      )}

      {/* Antenna */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
        <primitive object={wireframeMaterial.clone()} />
      </mesh>
    </group>
  );
}

// Asteroid Component with scroll effects
function Asteroid({
  position,
  size,
  rotationSpeed,
}: {
  position: [number, number, number];
  size: number;
  rotationSpeed: number;
}) {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const { scrollY, isVisible } = useScrollAnimation();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const colors = getThemeColors(isLight);
  
  const wireframeMaterialSecondary = useMemo(() => createWireframeMaterial(colors.secondary, 0.5, isLight), [colors.secondary, isLight]);

  useFrame((state) => {
    if (asteroidRef.current && isVisible) {
      // More noticeable rotation with scroll acceleration
      const scrollAcceleration = scrollY * 0.03;
      asteroidRef.current.rotation.x +=
        rotationSpeed * 0.3 + scrollAcceleration;
      asteroidRef.current.rotation.y +=
        rotationSpeed * 0.2 + scrollAcceleration * 0.7;
      asteroidRef.current.rotation.z +=
        rotationSpeed * 0.1 + scrollAcceleration * 0.3;

      // More noticeable floating effect
      const floatOffset =
        Math.sin(state.clock.elapsedTime * 0.3 + scrollY * 2) * 0.8;
      asteroidRef.current.position.y =
        position[1] + floatOffset + scrollY * 1.5;

      // More noticeable scale pulsing
      const pulseScale =
        1 + Math.sin(state.clock.elapsedTime * 1 + scrollY * 3) * 0.25;
      asteroidRef.current.scale.setScalar(pulseScale);

      // More noticeable position changes
      asteroidRef.current.position.x =
        position[0] +
        Math.sin(state.clock.elapsedTime * 0.2 + scrollY * 1.5) * 0.8;
      asteroidRef.current.position.z =
        position[2] +
        Math.cos(state.clock.elapsedTime * 0.3 + scrollY * 1) * 0.6;
    }
  });

  return (
    <mesh ref={asteroidRef} position={position}>
      <dodecahedronGeometry args={[size, 0]} />
      <primitive object={wireframeMaterialSecondary.clone()} />
    </mesh>
  );
}

// Space Debris Component with scroll effects
function SpaceDebris({
  position,
  orbitRadius,
  orbitSpeed,
}: {
  position: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
}) {
  const debrisRef = useRef<THREE.Group>(null);
  const { scrollY, isVisible } = useScrollAnimation();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const colors = getThemeColors(isLight);
  
  const wireframeMaterialAccent = useMemo(() => createWireframeMaterial(colors.accent, 0.4, isLight), [colors.accent, isLight]);

  useFrame((state) => {
    if (debrisRef.current && isVisible) {
      const time = state.clock.elapsedTime * orbitSpeed;
      const scrollAcceleration = scrollY * 0.8;

      debrisRef.current.position.x =
        position[0] + Math.cos(time + scrollAcceleration) * orbitRadius;
      debrisRef.current.position.z =
        position[2] + Math.sin(time + scrollAcceleration) * orbitRadius;

      // More noticeable rotation with scroll effect
      debrisRef.current.rotation.x += 0.015 + scrollY * 0.05;
      debrisRef.current.rotation.y += 0.01 + scrollY * 0.04;
      debrisRef.current.rotation.z += scrollY * 0.03;

      // More noticeable scale pulsing
      const pulseScale =
        1 + Math.sin(state.clock.elapsedTime * 2 + scrollY * 3) * 0.25;
      debrisRef.current.scale.setScalar(pulseScale);

      // More noticeable floating effect
      debrisRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1 + scrollY * 2) * 0.6;
    }
  });

  return (
    <group ref={debrisRef} position={position}>
      <mesh>
        <octahedronGeometry args={[0.3, 0]} />
        <primitive object={wireframeMaterialAccent.clone()} />
      </mesh>
    </group>
  );
}

// Orbital Ring Component
function OrbitalRing({ radius, color, isLight = false }: { radius: number; color: string; isLight?: boolean }) {
  const ringGeometry = useMemo(() => {
    const points = [];
    const segments = 64;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, 0, z));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  const ringMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: isLight ? 0.2 : 0.3, // Reduce opacity in light mode
      linewidth: 1,
    });
  }, [color, isLight]);

  return (
    <primitive
      object={
        new THREE.Line(ringGeometry, ringMaterial)
      }
    />
  );
}

// Static Isometric Grid Component
function InfiniteGrid() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const colors = getThemeColors(isLight);
  
  const gridGeometry = useMemo(() => {
    const points = [];
    const size = 200; // Large grid size
    const divisions = 50;
    const step = size / divisions;

    // Create simple grid lines on one axis only (X-Z plane)
    for (let i = -divisions; i <= divisions; i++) {
      const x = i * step;

      // Vertical lines (parallel to Z-axis)
      points.push(new THREE.Vector3(x, 0, -size));
      points.push(new THREE.Vector3(x, 0, size));
    }

    for (let i = -divisions; i <= divisions; i++) {
      const z = i * step;

      // Horizontal lines (parallel to X-axis)
      points.push(new THREE.Vector3(-size, 0, z));
      points.push(new THREE.Vector3(size, 0, z));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const gridMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: colors.grid,
      transparent: true,
      opacity: isLight ? 0.1 : 0.15, // Reduce opacity in light mode
      linewidth: 1,
    });
  }, [colors.grid, isLight]);

  return (
    <group position={[0, -20, 0]}>
      <primitive object={new THREE.Line(gridGeometry, gridMaterial)} />
    </group>
  );
}

// Main Space Scene Component
export default function SpaceScene() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const colors = getThemeColors(isLight);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0">
      {/* Theme-aware Gradient Background */}
      <div className={`absolute inset-0 pointer-events-none ${
        isLight 
          ? "bg-gradient-to-br from-white/20 via-white/10 to-white/30" 
          : "bg-gradient-to-br from-black/60 via-black/30 to-black/40"
      }`} />

      <Canvas
        style={{
          background: "transparent",
          width: "100vw",
          height: "100vh",
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        dpr={[1, 2]}
      >
        {/* Isometric Camera Setup */}
        <IsometricCamera />

        {/* Theme-aware Lighting Setup */}
        <ambientLight intensity={isLight ? 0.4 : 0.2} />
        <pointLight position={[10, 15, 10]} intensity={isLight ? 0.8 : 1.0} color="#ffffff" />
        <pointLight position={[-8, 8, -8]} intensity={isLight ? 0.3 : 0.5} color={colors.primary} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={isLight ? 0.4 : 0.6}
          color="#ffffff"
        />

        {/* Background stars - reduced in light mode */}
        <Stars
          radius={400}
          depth={80}
          count={isLight ? 4000 : 8000}
          factor={6}
          saturation={0}
          fade={false}
          speed={0.5}
        />

        {/* Custom star field backup */}
        <CustomStarField />

        {/* Infinite Isometric Grid */}
        <InfiniteGrid />

        {/* Theme-aware Orbital Rings */}
        <OrbitalRing radius={8} color={colors.orbital} isLight={isLight} />
        <OrbitalRing radius={12} color={colors.secondary} isLight={isLight} />
        <OrbitalRing radius={16} color={colors.accent} isLight={isLight} />

        {/* Space Station */}
        <SpaceStation />

        {/* Satellites with variations and scroll effects */}
        <Satellite
          position={[0, 0, 0]}
          orbitRadius={8}
          orbitSpeed={0.08}
          orbitTilt={2}
          satelliteType="standard"
          rotationSpeed={0.003}
          scrollMultiplier={1.5}
        />
        <Satellite
          position={[0, 0, 0]}
          orbitRadius={12}
          orbitSpeed={-0.06}
          orbitTilt={-1.5}
          satelliteType="cube"
          rotationSpeed={0.002}
          scrollMultiplier={-1.2}
        />
        <Satellite
          position={[0, 0, 0]}
          orbitRadius={16}
          orbitSpeed={0.04}
          orbitTilt={3}
          satelliteType="sphere"
          rotationSpeed={0.004}
          scrollMultiplier={2.0}
        />
        <Satellite
          position={[0, 0, 0]}
          orbitRadius={20}
          orbitSpeed={-0.03}
          orbitTilt={-2}
          satelliteType="long"
          rotationSpeed={0.001}
          scrollMultiplier={-0.8}
        />

        {/* Asteroids - moved out of orbit */}
        <Asteroid position={[25, 8, 15]} size={1.2} rotationSpeed={0.003} />
        <Asteroid position={[-22, -6, 12]} size={0.8} rotationSpeed={-0.002} />
        <Asteroid position={[18, 12, -20]} size={1.0} rotationSpeed={0.004} />
        <Asteroid position={[-15, -8, -18]} size={0.6} rotationSpeed={-0.003} />
        <Asteroid position={[30, -4, 8]} size={0.9} rotationSpeed={0.002} />
        <Asteroid position={[-28, 10, -25]} size={1.1} rotationSpeed={-0.004} />

        {/* Space Debris - slower speeds */}
        <SpaceDebris position={[0, 0, 0]} orbitRadius={6} orbitSpeed={0.1} />
        <SpaceDebris position={[0, 0, 0]} orbitRadius={10} orbitSpeed={-0.08} />
        <SpaceDebris position={[0, 0, 0]} orbitRadius={14} orbitSpeed={0.06} />
      </Canvas>
    </div>
  );
}
