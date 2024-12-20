"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsContent() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform built with Next.js and Stripe",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=400",
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma"],
      github: "#",
      demo: "#"
    },
    {
      title: "Task Management App",
      description: "Real-time task management application with team collaboration features",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "#",
      demo: "#"
    },
    {
      title: "AI Image Generator",
      description: "Web application that generates images using AI models",
      image: "https://images.unsplash.com/photo-1547954575-855750c57bd3?auto=format&fit=crop&q=80&w=400",
      technologies: ["Python", "FastAPI", "React", "TensorFlow"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <Card key={project.title} className="overflow-hidden">
          <div className="flex gap-6 p-6">
            <img
              src={project.image}
              alt={project.title}
              className="h-48 w-72 rounded-lg object-cover"
            />
            <div className="flex-1">
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
          </div>
        </Card>
      ))}
    </div>
  );
}