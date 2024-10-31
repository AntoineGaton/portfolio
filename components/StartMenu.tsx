"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Code, FileText, Phone } from "lucide-react";

interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const menuItems = [
    { icon: User, label: "About Me", id: "about" },
    { icon: Code, label: "Projects", id: "projects" },
    { icon: Briefcase, label: "Experience", id: "experience" },
    { icon: FileText, label: "Resume", id: "resume" },
    { icon: Phone, label: "Contact", id: "contact" },
  ];

  return (
    <Card className="fixed bottom-14 left-2 w-80 p-4 bg-background/80 backdrop-blur-lg z-50">
      <div className="grid grid-cols-2 gap-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className="flex flex-col items-center justify-center h-24 hover:bg-accent"
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              onClose();
            }}
          >
            <item.icon className="h-8 w-8 mb-2" />
            {item.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}