"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const RGBBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create gradient background
    const geometry = new THREE.PlaneGeometry(5, 5, 50, 50);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        mousePos: { value: new THREE.Vector2(0.5, 0.5) },
        ripples: { value: [] }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mousePos;
        varying vec2 vUv;

        #define MAX_RIPPLES 10
        #define PI 3.14159265359

        // Wave function
        float wave(vec2 position, vec2 origin, float time, float frequency) {
          float distance = length(position - origin);
          float amplitude = exp(-distance * 2.0);
          return amplitude * sin(distance * frequency - time * 5.0);
        }

        // Edge waves
        float edgeWave(vec2 position, float time) {
          float left = sin(position.x * 10.0 + time) * 0.5;
          float right = sin((1.0 - position.x) * 10.0 + time) * 0.5;
          float top = sin(position.y * 10.0 + time) * 0.5;
          float bottom = sin((1.0 - position.y) * 10.0 + time) * 0.5;
          
          return (left + right + top + bottom) * 0.25;
        }

        void main() {
          vec2 uv = vUv;
          float t = time * 0.5;

          // Create base waves
          float baseWave = wave(uv, vec2(0.5 + sin(t * 0.5) * 0.3, 0.5 + cos(t * 0.3) * 0.3), t, 8.0);
          
          // Add edge waves
          float edges = edgeWave(uv, t);
          
          // Add circular waves from center
          float centerWave = wave(uv, vec2(0.5, 0.5), t, 12.0);
          
          // Combine all waves
          float finalWave = baseWave + edges * 0.3 + centerWave * 0.5;
          
          // Create dynamic color channels
          float r = sin(finalWave * 2.0 + t) * 0.5 + 0.5;
          float g = sin(finalWave * 2.0 + t + PI * 2.0/3.0) * 0.5 + 0.5;
          float b = sin(finalWave * 2.0 + t + PI * 4.0/3.0) * 0.5 + 0.5;

          // Add caustics effect
          float caustics = pow(max(0.0, sin(finalWave * 5.0 + t * 2.0)), 2.0) * 0.2;
          r += caustics;
          g += caustics;
          b += caustics;
          
          // Create water-like transparency
          float alpha = 0.7 + finalWave * 0.1;

          gl_FragColor = vec4(r * 0.5, g * 0.5, b * 0.5, alpha);
        }
      `,
      transparent: true,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 2;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.time.value += 0.01;
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Add mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = 1.0 - (event.clientY / window.innerHeight);
      material.uniforms.mousePos.value.set(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}; 