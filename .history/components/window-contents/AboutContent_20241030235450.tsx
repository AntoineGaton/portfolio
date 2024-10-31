"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

/**
 * AboutContent Component
 * Displays personal information and skills
 * @component
 */
export default function AboutContent() {
  /**
   * Skills categorization
   * @type {Record<string, string[]>}
   */
  const skills = {
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    "Backend": ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    "Tools": ["Git", "Docker", "AWS", "Figma"],
    "Other": ["Agile", "CI/CD", "Testing", "Performance Optimization"]
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-lg text-muted-foreground">Full Stack Developer</p>
            <p className="mt-4">
              Passionate developer with experience in building modern web applications.
              Focused on creating efficient, scalable, and user-friendly solutions.
            </p>
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}