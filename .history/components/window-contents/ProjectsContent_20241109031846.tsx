"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

/**
 * Project Interface
 * @interface Project
 * @property {string} title - Project name
 * @property {string} description - Project description
 * @property {string} image - Project image URL
 * @property {string[]} technologies - Technologies used
 * @property {string} github - GitHub repository URL
 * @property {string} demo - Live demo URL
 */
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
}

/**
 * ProjectsContent Component
 * Displays a grid of project cards
 * @component
 */
export function ProjectsContent() {
  /**
   * Project data
   * @type {Project[]}
   */
  const projects: Project[] = [
    {
      title: "Feel Good Studios Website",
      description: "Complete redesign and development of a studio's website, integrating dark mode, AI chatbot, 3D logo, and social media for an engaging user experience.",
      image: "/projects/feelgood.jpg",
      technologies: ["React", "WordPress", "BotPenguin", "Vercel"],
      github: "#",
      demo: "#"
    },
    {
      title: "Invoice Generator App",
      description: "A desktop application automating invoice creation with options for saving and retrieving invoices securely.",
      image: "/projects/invoice.jpg",
      technologies: ["Next.js", "Firebase", "Vercel"],
      github: "#",
      demo: "#"
    },
    {
      title: "Pet Service App",
      description: "A mobile app providing pet care tips, a pet showcase, and data insights for walkers, supporting future SaaS features.",
      image: "/projects/pet.jpg",
      technologies: ["NativeScript", "Svelte", "Figma", "Vercel"],
      github: "#",
      demo: "#"
    },
    {
      title: "Algorithm Practice Extension",
      description: "A Chrome extension that challenges users with daily algorithm problems, featuring a ranking system and solution checking.",
      image: "/projects/algo.jpg",
      technologies: ["React", "Material UI", "Chrome API"],
      github: "#",
      demo: "#"
    },
    {
      title: "Game Tracker App",
      description: "A Django-powered app to track owned video games with statuses and Steam API integration.",
      image: "/projects/gametracker.jpg",
      technologies: ["Django", "Steam API", "PostgreSQL"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Card key={project.title} className="overflow-hidden">
          <div className="aspect-video relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-muted-foreground">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}