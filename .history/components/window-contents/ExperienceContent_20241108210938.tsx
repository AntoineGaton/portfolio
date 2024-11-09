"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ExperienceContent() {
  const experiences = [
    {
      company: "Tech Corp",
      position: "Senior Full Stack Developer",
      period: "2021 - Present",
      description: "Leading development of enterprise applications using React and Node.js",
      achievements: [
        "Reduced application load time by 40%",
        "Implemented CI/CD pipeline",
        "Mentored junior developers"
      ]
    },
    {
      company: "StartUp Inc",
      position: "Full Stack Developer",
      period: "2019 - 2021",
      description: "Developed and maintained multiple web applications",
      achievements: [
        "Built real-time collaboration features",
        "Integrated payment processing system",
        "Improved test coverage to 90%"
      ]
    },
    {
      company: "Digital Agency",
      position: "Frontend Developer",
      period: "2017 - 2019",
      description: "Created responsive web applications for various clients",
      achievements: [
        "Developed 20+ client websites",
        "Implemented design system",
        "Optimized performance metrics"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {experiences.map((exp) => (
        <Card key={exp.company} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">{exp.position}</h3>
              <p className="text-lg text-primary">{exp.company}</p>
            </div>
            <Badge variant="secondary">{exp.period}</Badge>
          </div>
          <p className="mt-4 text-muted-foreground">{exp.description}</p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            {exp.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}