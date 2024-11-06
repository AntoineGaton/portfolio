"use client";

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMediaQuery } from '@/hooks/use-media-query';

function Particles() {
  const points = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  });

  useFrame(({ clock }) => {
    if (!points.current) return;
    
    const positions = (points.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(time * 0.3 + i) * 0.002;
      positions[i + 1] += Math.cos(time * 0.3 + i) * 0.002;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;

    // RGB color cycling
    const r = Math.sin(time * 0.5) * 0.5 + 0.5;
    const g = Math.sin(time * 0.5 + 2) * 0.5 + 0.5;
    const b = Math.sin(time * 0.5 + 4) * 0.5 + 0.5;
    
    if (points.current.material instanceof THREE.PointsMaterial) {
      points.current.material.color.setRGB(r, g, b);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Lines() {
  const lines = useRef<THREE.LineSegments>(null);
  const [positions] = useState(() => {
    const count = 50;
    const positions = new Float32Array(count * 6);
    
    for (let i = 0; i < count * 6; i += 6) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      positions[i + 3] = (Math.random() - 0.5) * 10;
      positions[i + 4] = (Math.random() - 0.5) * 10;
      positions[i + 5] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  });

  useFrame(({ clock }) => {
    if (!lines.current) return;
    
    const positions = (lines.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(time * 0.2 + i) * 0.001;
      positions[i + 1] += Math.cos(time * 0.2 + i) * 0.001;
    }
    
    lines.current.geometry.attributes.position.needsUpdate = true;

    // RGB color cycling for lines
    const r = Math.sin(time * 0.5) * 0.5 + 0.5;
    const g = Math.sin(time * 0.5 + 2) * 0.5 + 0.5;
    const b = Math.sin(time * 0.5 + 4) * 0.5 + 0.5;
    
    if (lines.current.material instanceof THREE.LineBasicMaterial) {
      lines.current.material.color.setRGB(r, g, b);
    }
  });

  return (
    <lineSegments ref={lines}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial transparent opacity={0.2} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function Scene() {
  return (
    <>
      <Particles />
      <Lines />
      <ambientLight intensity={0.5} />
    </>
  );
}

export function Background() {
  const [isSupported, setIsSupported] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const isWebGLSupported = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
    setIsSupported(isWebGLSupported);
  }, []);

  // For mobile or unsupported browsers, return simple gradient background
  if (isMobile || !isSupported) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-100 to-sky-200 dark:from-gray-900 dark:to-gray-800"
      />
    );
  }

  // For desktop with WebGL support
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}