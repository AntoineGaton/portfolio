'use client'

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Minus, Maximize2, X, Github, Linkedin, Twitter, Mail, Download } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"

interface TimelineItem {
  title: string
  date: string
  description: string
}

export function AboutContent() {
  const [isMaximized, setIsMaximized] = useState(false)
  
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

  return (
    <div>
      <div className="p-6 space-y-6 max-h-[calc(100vh-40px)]">
        {/* Photo Section */}
        <div className="flex justify-center">
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
              <h4 className="font-medium mb-2">Languages</h4>
              <p className="text-sm text-gray-400">Python, JavaScript, TypeScript, C++, PHP, HTML, CSS, SQL</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Frontend</h4>
              <p className="text-sm text-gray-400">React, Next.js, TypeScript, Electron, Tailwind CSS, Three.js</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Backend</h4>
              <p className="text-sm text-gray-400">Node.js, Flask, Django, SQL, MongoDB, PostgreSQL</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Tools</h4>
              <p className="text-sm text-gray-400">Git, JIRA, Confluence, Postman, MySQL Workbench, MongoDB Atlas, VSCode, Jupyter Notebook, Jira, Selenium</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-6" />

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

        <div className="border-t border-gray-700 my-6" />
  
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
            Outside of coding, you can find me experimenting with new recipes (most recently Dominican-style dishes), exploring the outdoors, or diving into sci-fi books and movies. I&apos;m a dedicated learner, currently exploring areas like hardware interfaces and real-time operating systems, and I enjoy tinkering with new libraries and frameworks. As a movie buff and gaming enthusiast, I&apos;m always on the lookout for story-driven games and unique films. Additionally, I&apos;m a strong advocate for open-source contributions and actively engage in community-driven projects.
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