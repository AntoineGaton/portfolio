'use client'

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Minus, Maximize2, X, Github, Linkedin, Twitter, Mail, Download } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TimelineItem {
  title: string
  date: string
  description: string
}

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

export function AboutContent() {
  const [isMaximized, setIsMaximized] = useState(false)
  
  return (
    <Card className={`w-full ${isMaximized ? 'h-screen' : 'max-h-[calc(100vh-40px)]'} overflow-y-auto`}>
      <CardHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-between items-center">
          <CardTitle>About Antoine Gaton</CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMaximized(!isMaximized)} aria-label={isMaximized ? "Minimize" : "Maximize"}>
              {isMaximized ? <Minus className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center">
          <Avatar className="w-40 h-40">
            <AvatarImage src="/images/Antoine.jpg" alt="Antoine Gaton" />
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Antoine Gaton - Software Engineer</h2>
          <p className="text-muted-foreground leading-relaxed">
            Driven by a passion for delivering refined solutions to complex challenges, I'm a full-stack developer with expertise in both frontend and backend technologies, including React, Next.js, Django, and MongoDB. My experience spans scalable architecture design, client-focused software solutions, and a commitment to exploring emerging technologies, making me adaptable and forward-thinking in my approach to development.
          </p>
          
          <div className="flex justify-center space-x-4">
            <SocialLink href="https://github.com/AntoineGaton" icon={<Github className="w-6 h-6" />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/antoine-gaton/" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
            <SocialLink href="mailto:swe.antoine.gaton@gmail.com" icon={<Mail className="w-6 h-6" />} label="Email" />
          </div>
        </div>

        <SkillsSection />
        <TimelineSection items={timelineItems} />
        <CurrentFocusSection />
        <PersonalInterestsSection />

        <div className="flex justify-center py-4">
          <Button asChild>
            <a href="/docs/Antoine_Gaton_Resume-10.10.24.pdf" download="Antoine_Gaton_Resume-10.10.24.pdf">
              <Download className="w-5 h-5 mr-2" />
              Download Full Resume
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} className="text-muted-foreground hover:text-foreground transition-colors" aria-label={label}>
      {icon}
    </a>
  )
}

function SkillsSection() {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Skills & Expertise</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkillCard title="Languages" skills="Python, JavaScript, TypeScript, C++, PHP, HTML, CSS, SQL" />
        <SkillCard title="Frontend" skills="React, Next.js, TypeScript, Electron, Tailwind CSS, Three.js" />
        <SkillCard title="Backend" skills="Node.js, Flask, Django, SQL, MongoDB, PostgreSQL" />
        <SkillCard title="Tools" skills="Git, JIRA, Confluence, Postman, MySQL Workbench, MongoDB Atlas, VSCode, Jupyter Notebook, Jira, Selenium" />
      </div>
    </section>
  )
}

function SkillCard({ title, skills }: { title: string; skills: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{skills}</p>
      </CardContent>
    </Card>
  )
}

function TimelineSection({ items }: { items: TimelineItem[] }) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Professional Highlights</h3>
      <div className="relative">
        <div className="absolute left-[7px] top-3 h-[calc(100%-24px)] w-[2px] bg-primary/20" />
        <div className="space-y-12">
          {items.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
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
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: index * 0.2 + 0.5 }}
        className="absolute left-0 top-[10px] h-4 w-4 rounded-full bg-primary"
      />
      
      <div>
        <h4 className="text-lg font-semibold">{item.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>
        <p className="mt-2 text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  )
}

function CurrentFocusSection() {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Current Focus</h3>
      <p className="text-muted-foreground leading-relaxed">
        I'm currently focused on deepening my knowledge of distributed systems, exploring advanced software design patterns, and gaining hands-on experience with mobile development. I'm actively working on improving my skills in Next.js, Svelte, and NativeScript, and regularly experimenting with frameworks like Tailwind CSS. My goal is to stay adaptable in a fast-evolving industry while refining my technical abilities for mobile and web development.
      </p>
    </section>
  )
}

function PersonalInterestsSection() {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Personal Interests</h3>
      <p className="text-muted-foreground leading-relaxed">
        Outside of coding, you can find me experimenting with new recipes, exploring the outdoors, or diving into sci-fi books and movies. I'm a dedicated learner, currently exploring mobile app development for unique user experiences. As a movie buff and gaming enthusiast, I'm always on the lookout for story-driven games and unique films. Additionally, I'm a strong advocate for open-source contributions and actively engage in community-driven projects.
      </p>
    </section>
  )
}