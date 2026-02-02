import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere({
  position,
  color,
  speed = 1,
  distort = 0.3,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        position={position}
        scale={scale}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingRing({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 200 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            color="#ffffff"
          />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.5}
            color="#00d4ff"
          />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#a855f7" />

          {/* Main sphere */}
          <AnimatedSphere
            position={[2.5, 0.5, 0]}
            color="#00d4ff"
            distort={0.4}
            scale={1.5}
          />

          {/* Secondary spheres */}
          <AnimatedSphere
            position={[-3, -1, -2]}
            color="#a855f7"
            distort={0.3}
            scale={0.8}
            speed={0.7}
          />
          <AnimatedSphere
            position={[4, -2, -3]}
            color="#fbbf24"
            distort={0.2}
            scale={0.5}
            speed={1.2}
          />

          {/* Floating rings */}
          <FloatingRing position={[0, 2, -2]} color="#00d4ff" scale={1.2} />
          <FloatingRing position={[-2, -1.5, -1]} color="#a855f7" scale={0.8} />

          {/* Background stars */}
          <Stars
            radius={50}
            depth={50}
            count={1000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* Particles */}
          <Particles count={150} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Hero3DScene;
