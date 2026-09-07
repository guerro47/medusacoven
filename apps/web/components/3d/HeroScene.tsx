'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ModularArchitecture } from './ModularArchitecture';
import { SerpentRing } from './SerpentRing';

/**
 * Hero scene: floating modular architecture over the ink void.
 * Slow orbital drift + scroll parallax; never competes with copy or CTAs.
 * Eager for the hero only — everything below the fold stays 2D.
 */

function CameraRig({ animate }: { animate: boolean }) {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    // Slow orbital drift…
    camera.position.x = Math.sin(t * 0.08) * 0.5;
    // …plus scroll parallax between the 3D layer and the UI layer.
    camera.position.y = 0.8 + Math.sin(t * 0.05) * 0.1 - scrollRef.current * 0.0012;
    camera.lookAt(0, -0.3, 0);
  });

  return null;
}

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const animate = !reducedMotion;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.8, 10], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={animate ? 'always' : 'demand'}
      aria-hidden="true"
    >
      {/* Soft gold key from upper left, cool fill from below, ambient floor */}
      <ambientLight intensity={0.18} />
      <directionalLight position={[-4, 6, 3]} color="#F0D68A" intensity={1.4} />
      <pointLight position={[0, -3, 2]} color="#22D3EE" intensity={0.2} />

      <CameraRig animate={animate} />
      {/* Scaled + lowered so the architecture reads as backdrop and never
          competes with copy or CTAs. */}
      <group position={[0, -0.75, 0]} scale={0.85}>
        <SerpentRing animate={animate} />
        <ModularArchitecture animate={animate} />
      </group>
    </Canvas>
  );
}
