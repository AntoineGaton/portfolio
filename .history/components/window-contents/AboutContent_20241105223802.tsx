'use client'

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Minus, Maximize2, X, Github, Linkedin, Twitter, Mail, Download } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import * as THREE from "three"

interface TimelineItem {
  title: string
  date: string
  description: string
}

export function AboutContent() {
  const [isMaximized, setIsMaximized] = useState(false)
  const blobRef = useRef<HTMLCanvasElement>(null)

  const timelineItems: TimelineItem[] = [
    {
      title: "Owner and Lead Developer at Code Monkey Studios",
      date: "2024 - Present",
      description: "Owner and lead developer of Code Monkey Studios, specializing in custom software solutions, client websites, and app development. Managed end-to-end project delivery, from requirements gathering to deployment, for clients in diverse industries, ensuring high-quality, client-focused outcomes.",
    },
    {
      title: "Software Engineer at TD Bank",
      date: "2022 - 2024",
      description: "Worked on anti-money laundering (AML) projects and implemented backend solutions for financial services. Contributed to cross-functional projects, collaborated with stakeholders to enhance user experience, and ensured code quality and security compliance in a regulated environment.",
    },
    {
      title: "Teaching Assistant at Coding Dojo",
      date: "2020 - 2024",
      description: "Supported students in learning web development, data structures, and algorithms. Provided one-on-one assistance, developed coding exercises, and helped students debug projects in JavaScript, Python, and other languages to reinforce foundational programming skills.",
    },
  ]

  useEffect(() => {
    if (!blobRef.current) return

    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: blobRef.current,
      alpha: true,
    })
    renderer.setSize(160, 160) // Match the size of the profile picture

    // Create blob geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      shininess: 100,
      transparent: true,
      opacity: 0.7,
      emissive: 0x4a90e2,
      emissiveIntensity: 0.5,
    })
    const blob = new THREE.Mesh(geometry, material)
    scene.add(blob)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const light1 = new THREE.PointLight(0xff0000, 2)
    light1.position.set(2, 1, 1)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00ff00, 2)
    light2.position.set(-2, -1, 1)
    scene.add(light2)

    const light3 = new THREE.PointLight(0x0000ff, 2)
    light3.position.set(0, 0, 2)
    scene.add(light3)

    camera.position.z = 2.5

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate lights
      const time = Date.now() * 0.001
      light1.position.x = Math.sin(time * 0.7) * 2
      light1.position.y = Math.cos(time * 0.7) * 2
      light2.position.x = Math.sin(time * 0.7 + 2) * 2
      light2.position.y = Math.cos(time * 0.7 + 2) * 2
      light3.position.x = Math.sin(time * 0.7 + 4) * 2
      light3.position.y = Math.cos(time * 0.7 + 4) * 2

      // Deform the blob
      const time = Date.now() * 0.001
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        const noise = Math.sin(time + i * 0.1) * 0.1;
        const length = Math.sqrt(x * x + y * y + z * z);
        
        positions.setXYZ(
          i,
          (x / length) * (1 + noise),
          (y / length) * (1 + noise),
          (z / length) * (1 + noise)
        );
      }
      positions.needsUpdate = true;

      blob.rotation.x += 0.005
      blob.rotation.y += 0.005

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div>
      <div className="p-6 space-y-6 max-h-[calc(100vh-40px)]">
        {/* Photo Section */}
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            {/* Three.js RGB Blob */}
            <div className="absolute inset-0 -z-10">
              <canvas 
                ref={blobRef}
                className="w-full h-full"
                style={{ filter: 'blur(8px)' }}
              />
            </div>
            
            {/* Profile Image */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
              <Image
                src="/images/Antoine.jpg"
                alt="Antoine Gaton"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-6" />

        {/* Keep other existing sections */}
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Antoine Gaton - Software Engineer</h2>
          <p className="text-gray-400 leading-relaxed">
            Driven by a passion for delivering refined solutions to complex challenges, I&apos;m a full-stack developer with expertise in both frontend and backend technologies, including React, Next.js, Django, and MongoDB. My experience spans scalable architecture design, client-focused software solutions, and a commitment to exploring emerging technologies, making me adaptable and forward-thinking in my approach to development.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/AntoineGaton" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/antoine-gaton/" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:swe.antoine.gaton@gmail.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 my-6" />

        {/* Skills section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Skills & Expertise</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Frontend</h4>
              <p className="text-sm text-gray-400">React, Next.js, TypeScript</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Backend</h4>
              <p className="text-sm text-gray-400">Node.js, Python, SQL</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Tools</h4>
              <p className="text-sm text-gray-400">Git, Docker, AWS</p>
            </div>
          </div>
        </div>

        {/* New Animated Timeline Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Professional Highlights</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-3 h-[calc(100%-24px)] w-[2px] bg-blue-500/20" />
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Keep remaining sections */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Current Focus</h3>
          <p className="text-gray-400 leading-relaxed">
            I&apos;m currently exploring advanced patterns in distributed systems and contributing to open-source
            projects. I&apos;m always eager to learn new technologies and methodologies to improve my craft.
          </p>
        </div>

        {/* Personal Interests section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Personal Interests</h3>
          <p className="text-gray-400 leading-relaxed">
            When I&apos;m not coding, you can find me hiking in nature, experimenting with new cooking recipes,
            or diving into a good sci-fi novel. I&apos;m also an avid supporter of open-source projects and regularly
            contribute to community-driven initiatives.
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex justify-center py-4">
          <a
            href="/docs/Antoine_Gaton_Resume-10.10.24.pdf"
            download="Antoine_Gaton_Resume-10.10.24.pdf"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Full Resume
          </a>
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.2,
          },
        },
      }}
      className="relative pl-8"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: index * 0.2 + 0.5 }}
        className="absolute left-0 top-[10px] h-4 w-4 rounded-full bg-blue-500"
      />
      
      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="mt-1 text-sm text-gray-400">{item.date}</p>
        <p className="mt-2 text-gray-400">{item.description}</p>
      </div>
    </motion.div>
  )
}