'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Spatial storytelling, not decoration:
 *  - the base platform is the Access Pass — the foundation everything
 *    else stands on;
 *  - the floating slabs are Drops — temporal layers that rise and fall;
 *  - the ascending filaments are Tips — energy flowing up to the creator.
 */

const GOLD = '#D4AF37';
const GOLD_HI = '#F0D68A';
const INK_ELEVATED = '#181509';

interface DropSlab {
  position: [number, number, number];
  size: [number, number, number];
  phase: number;
  speed: number;
}

// Slabs orbit the outer columns so the center stays clear for copy.
const DROP_SLABS: DropSlab[] = [
  { position: [-1.6, 0.4, 0.2], size: [1.4, 0.22, 1.4], phase: 0, speed: 0.55 },
  { position: [1.55, 0.9, -0.3], size: [1.15, 0.2, 1.15], phase: 2.1, speed: 0.42 },
  { position: [-1.15, 1.7, 0.5], size: [0.75, 0.18, 0.75], phase: 4.2, speed: 0.65 },
];

// Drops whisper; only the foundation wears full gold.
const GOLD_EDGE_DIM = '#8a7326';

const TIP_COUNT = 48;

interface TipFilament {
  x: number;
  z: number;
  y: number;
  speed: number;
  scale: number;
}

function DropLayer({ slab, animate }: { slab: DropSlab; animate: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!animate || !ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = slab.position[1] + Math.sin(t * slab.speed + slab.phase) * 0.14;
    ref.current.rotation.y = Math.sin(t * 0.12 + slab.phase) * 0.08;
  });

  return (
    <mesh ref={ref} position={slab.position}>
      <boxGeometry args={slab.size} />
      <meshStandardMaterial color={INK_ELEVATED} metalness={0.7} roughness={0.35} />
      <Edges color={GOLD_EDGE_DIM} threshold={15} />
    </mesh>
  );
}

function TipFilaments({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const filaments = useMemo<TipFilament[]>(() => {
    // Deterministic pseudo-random spread so SSR/CSR and re-renders agree.
    const items: TipFilament[] = [];
    for (let i = 0; i < TIP_COUNT; i++) {
      const a = (i / TIP_COUNT) * Math.PI * 2 * 7.13;
      const r = 0.5 + ((i * 37) % 100) / 100 * 1.6;
      items.push({
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        y: -0.8 + ((i * 53) % 100) / 100 * 3.2,
        speed: 0.25 + ((i * 29) % 100) / 100 * 0.5,
        scale: 0.35 + ((i * 41) % 100) / 100 * 0.9,
      });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    filaments.forEach((f, i) => {
      if (animate) {
        f.y += f.speed * delta;
        if (f.y > 2.6) f.y = -0.9;
      }
      // Fade by height: filaments dissolve as they reach the top.
      const fade = 1 - Math.max(0, (f.y - 1.4) / 1.2);
      dummy.position.set(f.x, f.y, f.z);
      dummy.scale.setScalar(0.02 * f.scale * Math.max(0.15, fade));
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, TIP_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={GOLD_HI} transparent opacity={0.85} />
    </instancedMesh>
  );
}

export function ModularArchitecture({ animate = true }: { animate?: boolean }) {
  return (
    <group position={[0, -0.4, 0]}>
      <Float speed={animate ? 1 : 0} rotationIntensity={0.08} floatIntensity={0.25}>
        {/* Access Pass — the foundation platform */}
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[3.4, 0.3, 3.4]} />
          <meshStandardMaterial color={INK_ELEVATED} metalness={0.75} roughness={0.3} />
          <Edges color={GOLD} threshold={15} />
        </mesh>

        {/* Drops — temporal layers */}
        {DROP_SLABS.map((slab, i) => (
          <DropLayer key={i} slab={slab} animate={animate} />
        ))}

        {/* Tips — energy flow */}
        <TipFilaments animate={animate} />
      </Float>
    </group>
  );
}
