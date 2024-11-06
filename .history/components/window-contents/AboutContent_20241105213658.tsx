'use client'

import { useState } from "react"
import Image from "next/image"
import { Minus, Maximize2, X, Github, Linkedin, Twitter, Mail, Download } from "lucide-react"

export function AboutContent() {
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <div >
      {/* Window Content */}
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

        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Antoine Gaton - Software Engineer</h2>
          <p className="text-gray-400 leading-relaxed">
            Driven by a passion for delivering refined solutions to complex challenges, I’m a full-stack developer with expertise in both frontend and backend technologies, including React, Next.js, Django, and MongoDB. My experience spans scalable architecture design, client-focused software solutions, and a commitment to exploring emerging technologies, making me adaptable and forward-thinking in my approach to development.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/AntoineGaton" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/antoine-gaton/" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="tomail:" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

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

        {/* Experience Timeline */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Professional Highlights</h3>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-700"></div>
              </div>
              <div>
                <h4 className="text-lg font-medium">Senior Developer at Tech Co.</h4>
                <p className="text-sm text-gray-400">2020 - Present</p>
                <p className="text-sm text-gray-400 mt-2">Led development of scalable microservices architecture.</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-700"></div>
              </div>
              <div>
                <h4 className="text-lg font-medium">Full Stack Developer at StartUp Inc.</h4>
                <p className="text-sm text-gray-400">2017 - 2020</p>
                <p className="text-sm text-gray-400 mt-2">Developed and maintained multiple web applications.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Current Focus</h3>
          <p className="text-gray-400 leading-relaxed">
            I&apos;m currently exploring advanced patterns in distributed systems and contributing to open-source
            projects. I&apos;m always eager to learn new technologies and methodologies to improve my craft.
          </p>
        </div>

        {/* Personal Interests */}
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