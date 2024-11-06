"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPython, faJs, faHtml5, faCss3Alt, faNode, faReact,
  faGit, faGithub, faAws, faJira, faConfluence,
  faPhp
} from "@fortawesome/free-brands-svg-icons";
import { 
  faDatabase, faCode, faTerminal, faServer,
  faNetworkWired, faTools, faCogs
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";

interface CenterMenuProps {
  onClose: () => void;
}

export function CenterMenu({ onClose }: CenterMenuProps) {
  const [showAll, setShowAll] = useState(false);

  const languages = [
    { icon: faPython, name: "Python" },
    { icon: faJs, name: "JavaScript" },
    { icon: faCode, name: "C++" },
    { icon: faPhp, name: "PHP" },
    { icon: faHtml5, name: "HTML" },
    { icon: faCss3Alt, name: "CSS" },
    { icon: faDatabase, name: "SQL" },
  ]
  const tools = [
    { icon: faPython, name: "Flask" },
    { icon: faPython, name: "Django" },
    { icon: faNode, name: "Express.js" },
    { icon: faNode, name: "Node.js" },
    { icon: faReact, name: "React" },
    { icon: faReact, name: "Next.js" },
    { icon: faDatabase, name: "MySQL" },
    { icon: faDatabase, name: "MongoDB" },
    { icon: faTools, name: "Jinja2" },
  ];

  const importantFiles = [
    { icon: faDatabase, name: "Resume" },
    { icon: faDatabase, name: "Cover Letter" },
  ];

  const allFiles = [
    ...languages,
    ...tools,
    ...importantFiles,
    { icon: faGit, name: "Git" },
    { icon: faGithub, name: "GitHub" },
    { icon: faCode, name: "VSCode" },
    { icon: faCode, name: "IntelliJ" },
    { icon: faNetworkWired, name: "Postman" },
    { icon: faDatabase, name: "MySQL Workbench" },
    { icon: faDatabase, name: "MongoDB Atlas" },
    { icon: faJira, name: "JIRA" },
    { icon: faConfluence, name: "Confluence" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div 
        className="fixed inset-0 bg-transparent z-40"
        onClick={onClose}
      />
      <Card className="fixed left-1/2 bottom-16 -translate-x-1/2 w-[800px] p-6 bg-background/95 backdrop-blur-xl z-50 rounded-xl shadow-2xl">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for apps, settings, and documents"
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-secondary/50 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Languages Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Programming Languages</h3>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {languages.map((app) => (
                <Button
                  key={app.name}
                  variant="ghost"
                  className="flex flex-col items-center justify-center h-20 hover:bg-accent group"
                >
                  <div className="w-8 h-8 mb-2 flex items-center justify-center">
                    <FontAwesomeIcon 
                      icon={app.icon} 
                      className="w-6 h-6 group-hover:text-primary transition-colors"
                    />
                  </div>
                  <span className="text-xs text-center group-hover:text-primary">{app.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Tech Stack</h3>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {tools.map((app) => (
                <Button
                  key={app.name}
                  variant="ghost"
                  className="flex flex-col items-center justify-center h-20 hover:bg-accent group"
                >
                  <div className="w-8 h-8 mb-2 flex items-center justify-center">
                    <FontAwesomeIcon 
                      icon={app.icon} 
                      className="w-6 h-6 group-hover:text-primary transition-colors"
                    />
                  </div>
                  <span className="text-xs text-center group-hover:text-primary">{app.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Tech Stack</h3>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {importantFiles.map((app) => (
                <Button
                  key={app.name}
                  variant="ghost"
                  className="flex flex-col items-center justify-center h-20 hover:bg-accent group"
                >
                  <div className="w-8 h-8 mb-2 flex items-center justify-center">
                    <FontAwesomeIcon 
                      icon={app.icon} 
                      className="w-6 h-6 group-hover:text-primary transition-colors"
                    />
                  </div>
                  <span className="text-xs text-center group-hover:text-primary">{app.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Image 
                  src="/images/Antoine.jpg" 
                  alt="Profile picture"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-sm font-medium">Antoine Gaton</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FontAwesomeIcon icon={faCogs} className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}