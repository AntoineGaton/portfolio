"use client";

import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

interface ExperienceItemProps extends Experience {}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  company,
  duration,
  responsibilities,
}) => (
  <div className="mb-8 flex gap-4">
    <div className="flex flex-col items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Briefcase className="h-6 w-6" />
      </div>
      <div className="h-full w-0.5 bg-border" />
    </div>
    <div className="flex-grow pb-8">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{company}</p>
      <div className="mt-2 flex items-center text-sm text-muted-foreground">
        <Calendar className="mr-2 h-4 w-4" />
        {duration}
      </div>
      <ul className="mt-4 space-y-2">
        {responsibilities.map((responsibility, index) => (
          <li key={index} className="flex items-start">
            <ChevronRight className="mr-2 h-5 w-5 text-primary" />
            <span>{responsibility}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export function ExperienceContent() {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Corp",
      duration: "2021 - Present",
      responsibilities: [
        "Reduced application load time by 40%",
        "Implemented CI/CD pipeline",
        "Mentored junior developers"
      ],
    },
    {
      title: "Full Stack Developer",
      company: "StartUp Inc",
      duration: "2019 - 2021",
      responsibilities: [
        "Built real-time collaboration features",
        "Integrated payment processing system",
        "Improved test coverage to 90%"
      ],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      duration: "2017 - 2019",
      responsibilities: [
        "Developed 20+ client websites",
        "Implemented design system",
        "Optimized performance metrics"
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
      {experiences.map((experience, index) => (
        <ExperienceItem key={index} {...experience} />
      ))}
    </div>
  );
}