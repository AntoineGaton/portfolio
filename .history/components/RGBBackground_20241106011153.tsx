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
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
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
        varying vec2 vUv;
        
        // Noise function
        vec2 hash( vec2 p ) {
          p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
          return -1.0 + 2.0*fract(sin(p)*43758.5453123);
        }

        float noise( in vec2 p ) {
          const float K1 = 0.366025404;
          const float K2 = 0.211324865;
          
          vec2 i = floor( p + (p.x+p.y)*K1 );
          vec2 a = p - i + (i.x+i.y)*K2;
          vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
          vec2 b = a - o + K2;
          vec2 c = a - 1.0 + 2.0*K2;
          
          vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
          
          vec3 n = h*h*h*h* vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
          
          return dot( n, vec3(70.0) );
        }

        void main() {
          vec2 uv = vUv;
          
          // Create flowing movement
          float t = time * 0.3;
          vec2 pos = uv * 3.0;
          
          // Layer multiple noise functions for more complexity
          float n1 = noise(pos + t);
          float n2 = noise(pos * 2.0 - t);
          float n3 = noise(pos * 4.0 + t);
          
          // Combine noise layers
          float finalNoise = n1 * 0.5 + n2 * 0.25 + n3 * 0.25;
          
          // Create color channels with different phase shifts
          float r = sin(finalNoise * 3.0 + t) * 0.5 + 0.5;
          float g = sin(finalNoise * 3.0 + t + 2.094) * 0.5 + 0.5;
          float b = sin(finalNoise * 3.0 + t + 4.188) * 0.5 + 0.5;
          
          // Adjust color intensity and alpha
          gl_FragColor = vec4(r * 0.5, g * 0.5, b * 0.5, 0.7);
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