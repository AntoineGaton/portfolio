"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AboutContent() {
  const skills = [
    "Python", "JavaScript", "TypeScript", "Node.js", "React", "Next.js",
    "COBOL", "JCL", "DB2", "AWS", "Docker", "MongoDB"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6 flex-col md:flex-row">
        <div className="relative w-full md:w-[250px] h-[250px]">
          <Image
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250&h=250"
            alt="Antoine Gaton"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold">Antoine Gaton</h1>
          <p className="mt-2 text-xl text-muted-foreground">Full Stack Developer</p>
          <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              As a Full Stack Developer with a unique journey, I bring a diverse perspective to software development. My experience spans from mainframe systems to modern web applications, allowing me to bridge traditional and cutting-edge technologies.
            </p>
            <p>
              Being a kidney transplant survivor has taught me resilience and problem-solving skills that I apply to every project. I'm passionate about mentoring others and creating technology that makes a real difference in people's lives.
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Technical Expertise</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-2">Modern Stack</h3>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Enterprise Systems</h3>
            <div className="flex flex-wrap gap-2">
              {skills.slice(6).map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Personal Journey</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            My path in technology has been shaped by unique experiences. As a kidney transplant survivor, I've developed a deep appreciation for resilience and adaptability - qualities that translate perfectly into the ever-evolving tech landscape.
          </p>
          <p>
            Beyond coding, I'm passionate about:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Mentoring aspiring developers</li>
            <li>Building accessible and inclusive applications</li>
            <li>Gaming and game development</li>
            <li>Contributing to healthcare technology initiatives</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}