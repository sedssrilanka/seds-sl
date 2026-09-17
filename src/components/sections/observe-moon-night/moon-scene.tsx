"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Scroll animation hook tracking 0 to 1 scroll ratio
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(1, scrollTop / (windowHeight * 1.8)),
      );
      setScrollY(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY };
}

// Wireframe material helper matching homepage X-Ray CAD style
function createWireframeMaterial(
  color: string,
  opacity: number,
  isLight: boolean = false,
) {
  return new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
    transparent: true,
    opacity: isLight ? opacity * 0.75 : opacity,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: false,
  });
}

// Theme-aware wireframe colors matching homepage
function getThemeColors(isLight: boolean) {
  if (isLight) {
    return {
      earth: "#2563eb", // Deep blue wireframe for Earth
      moon: "#ffffff", // Bright white wireframe for Moon
      orbit: "#93c5fd", // Light blue orbital line
      grid: "#2563eb", // Grid floor color
    };
  } else {
    return {
      earth: "#3b82f6", // Electric blue wireframe for Earth
      moon: "#ffffff", // Bright white wireframe for Moon
      orbit: "#1d4ed8", // Glowing blue orbital line
      grid: "#3b82f6", // Grid floor color
    };
  }
}

// Isometric Camera positioned opposite to text with scroll-driven zoom & tilt
// Isometric Camera setup with smooth vertical up/down movement on scroll
function IsometricCamera() {
  const { camera, size } = useThree();
  const { scrollY } = useScrollAnimation();

  useFrame(() => {
    const aspect = size.width / size.height;
    const isMobile = size.width < 768;
    const d = Math.max(size.width, size.height) / (isMobile ? 65 : 95);

    const orthoCamera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      1,
      1000,
    );

    const basePosition = { x: 14, y: 12, z: 16 };

    // Move camera view up and down smoothly on scroll
    orthoCamera.position.set(
      basePosition.x,
      basePosition.y + scrollY * 8,
      basePosition.z + scrollY * 6,
    );
    orthoCamera.lookAt(8, scrollY * 4, 0);

    camera.copy(orthoCamera);
  });

  return null;
}

// 100% Stable Homepage-Style Infinite Grid Floor (Zero Rotation)
function InfiniteGrid() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const colors = getThemeColors(isLight);

  const gridGeometry = useMemo(() => {
    const points = [];
    const size = 200;
    const divisions = 50;
    const step = size / divisions;

    for (let i = -divisions; i <= divisions; i++) {
      const x = i * step;
      points.push(new THREE.Vector3(x, 0, -size));
      points.push(new THREE.Vector3(x, 0, size));
    }

    for (let i = -divisions; i <= divisions; i++) {
      const z = i * step;
      points.push(new THREE.Vector3(-size, 0, z));
      points.push(new THREE.Vector3(size, 0, z));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const gridMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: colors.grid,
      transparent: true,
      opacity: isLight ? 0.1 : 0.15,
      linewidth: 1,
    });
  }, [colors.grid, isLight]);

  return (
    <group position={[0, -14, 0]}>
      <primitive object={new THREE.Line(gridGeometry, gridMaterial)} />
    </group>
  );
}

// Clean 2-Body (Earth & Moon) System Positioned Opposite to Content with Scroll Animation
function CleanEarthMoonSystem() {
  const systemGroupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const moonOrbitRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const { scrollY } = useScrollAnimation();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const colors = getThemeColors(isLight);

  // Clean Wireframe Materials
  const earthMaterial = useMemo(
    () => createWireframeMaterial(colors.earth, 0.65, isLight),
    [colors.earth, isLight],
  );
  const moonMaterial = useMemo(
    () => createWireframeMaterial(colors.moon, 0.9, isLight),
    [colors.moon, isLight],
  );
  const orbitLineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: colors.orbit,
      transparent: true,
      opacity: isLight ? 0.35 : 0.45,
      linewidth: 1,
    });
  }, [colors.orbit, isLight]);

  // Orbital Ring Geometry
  const orbitRingGeometry = useMemo(() => {
    const points = [];
    const radius = 10.2;
    const segments = 90;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, 0, z));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Earth self-rotation accelerates as user scrolls
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.15 + scrollY * Math.PI * 1.5;
      earthRef.current.rotation.x = Math.sin(scrollY * Math.PI) * 0.2;
    }

    // 2. Moon orbit revolution actively rotates with scroll position
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y = time * 0.22 + scrollY * Math.PI * 2.5;
    }

    // 3. Moon self-rotation
    if (moonRef.current) {
      moonRef.current.rotation.y = time * 0.4 + scrollY * Math.PI;
    }

    // 4. Floating & Scaling transition on scroll
    if (systemGroupRef.current) {
      systemGroupRef.current.position.y =
        0.5 + Math.sin(time * 0.5) * 0.3 + scrollY * 1.5;
      const scaleVal = 1 + scrollY * 0.2;
      systemGroupRef.current.scale.set(scaleVal, scaleVal, scaleVal);
    }
  });

  // Shifted far right to fill the open space on the right side of the screen
  const earthPosition: [number, number, number] = [17.5, 0.5, -2];

  return (
    <group ref={systemGroupRef} position={earthPosition}>
      {/* 1. CLEAN SCALED-UP WIREFRAME EARTH SPHERE */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[5.8, 24, 24]} />
      </mesh>

      {/* 2. SINGLE CLEAN ORBITAL RING */}
      <group rotation={[Math.PI / 6, 0, 0]}>
        <primitive
          object={new THREE.Line(orbitRingGeometry, orbitLineMaterial)}
        />

        {/* 3. CLEAN SCALED-UP BRIGHT WHITE WIREFRAME MOON SPHERE */}
        <group ref={moonOrbitRef}>
          <group position={[10.2, 0, 0]}>
            <mesh ref={moonRef} material={moonMaterial}>
              <sphereGeometry args={[2.6, 18, 18]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

// Main 3D Scene Component
function MoonSceneCanvas() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none touch-pan-y z-0 select-none [&_*]:pointer-events-none [&_canvas]:touch-pan-y">
      <Canvas
        className="pointer-events-none touch-pan-y"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          touchAction: "pan-y",
        }}
      >
        <IsometricCamera />

        <ambientLight intensity={isLight ? 1.2 : 0.6} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={isLight ? 1.8 : 1.2}
        />

        <Stars
          radius={100}
          depth={50}
          count={isLight ? 1000 : 2500}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />

        <InfiniteGrid />
        <CleanEarthMoonSystem />
      </Canvas>
    </div>
  );
}

// Homepage-style Space Scene Wireframe Grid Placeholder
export function SpaceScenePlaceholder() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 bg-background overflow-hidden pointer-events-none">
      {/* Theme-aware Ambient Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-sky-500/10" />

      {/* Wireframe Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
    </div>
  );
}

export default MoonSceneCanvas;
