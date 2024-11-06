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
        varying vec2 vUv;
        
        void main() {
          vec2 position = vUv;
          float r = sin(position.x * 10.0 + time) * 0.5 + 0.5;
          float g = sin(position.y * 10.0 + time + 2.094) * 0.5 + 0.5;
          float b = sin((position.x + position.y) * 10.0 + time + 4.188) * 0.5 + 0.5;
          gl_FragColor = vec4(r * 0.3, g * 0.3, b * 0.3, 0.5);
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}; 