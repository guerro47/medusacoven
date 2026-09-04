'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SERPENT_PULSE_EVENT } from './constants';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Violet→cyan gradient sweeping around the ring. uActive drives the
// Coven success pulse; at rest the ring is a whisper.
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uActive;
  varying vec2 vUv;

  void main() {
    vec3 violet = vec3(0.486, 0.227, 0.929);
    vec3 cyan = vec3(0.133, 0.827, 0.933);
    float sweep = 0.5 + 0.5 * sin(vUv.x * 6.28318 + uTime * 0.6);
    vec3 color = mix(violet, cyan, sweep);
    float alpha = 0.10 + uActive * 0.8;
    gl_FragColor = vec4(color, alpha);
  }
`;

interface SerpentRingProps {
  /** World position; sits behind the modular architecture. */
  position?: [number, number, number];
  animate?: boolean;
}

export function SerpentRing({ position = [0, 0.4, -2.2], animate = true }: SerpentRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const activeRef = useRef(0);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uActive: { value: 0 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    const onPulse = () => {
      activeRef.current = 1;
    };
    window.addEventListener(SERPENT_PULSE_EVENT, onPulse);
    return () => window.removeEventListener(SERPENT_PULSE_EVENT, onPulse);
  }, []);

  useFrame((_, delta) => {
    if (!animate) return;
    material.uniforms.uTime.value += delta;
    // Pulse decays back to the resting whisper over ~2s.
    activeRef.current = Math.max(0, activeRef.current - delta * 0.5);
    material.uniforms.uActive.value = activeRef.current;
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[2.7, 0.018, 16, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
