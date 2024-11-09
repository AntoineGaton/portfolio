"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";

export default function ResumeContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="p-6">
        <div className="border-b pb-6">
          <h1 className="text-4xl font-bold">John Doe</h1>
          <p className="mt-2 text-xl text-muted-foreground">Full Stack Developer</p>
          <div className="mt-4 text-sm">
            <p>📍 San Francisco, CA</p>
            <p>📧 john.doe@example.com</p>
            <p>🌐 portfolio.example.com</p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold">Summary</h2>
            <p className="mt-2">
              Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications.
              Proficient in modern JavaScript frameworks and cloud technologies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Technical Skills</h2>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Frontend</h3>
                <p className="text-muted-foreground">React, Next.js, TypeScript, Tailwind CSS</p>
              </div>
              <div>
                <h3 className="font-medium">Backend</h3>
                <p className="text-muted-foreground">Node.js, Python, GraphQL, REST APIs</p>
              </div>
              <div>
                <h3 className="font-medium">Database</h3>
                <p className="text-muted-foreground">PostgreSQL, MongoDB, Redis</p>
              </div>
              <div>
                <h3 className="font-medium">DevOps</h3>
                <p className="text-muted-foreground">AWS, Docker, CI/CD, Kubernetes</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Education</h2>
            <div className="mt-2">
              <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
              <p className="text-muted-foreground">University of Technology • 2017</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Certifications</h2>
            <ul className="mt-2 list-inside list-disc">
              <li>AWS Certified Solutions Architect</li>
              <li>Google Cloud Professional Developer</li>
              <li>MongoDB Certified Developer</li>
            </ul>
          </section>
        </div>
      </Card>
    </div>
  );
}