"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calculator } from "../apps/Calculator";
import { Notepad } from "../apps/Notepad";
import { WeatherApp } from "../apps/WeatherApp";
import { Calculator as CalculatorIcon, FileText, Cloud } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface App {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

export function AppsContent() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const apps: App[] = [
    { id: "calculator", name: "Calculator", icon: CalculatorIcon, component: Calculator },
    { id: "notepad", name: "Notepad", icon: FileText, component: Notepad },
    { id: "weather", name: "Weather", icon: Cloud, component: WeatherApp },
  ];

  const AppComponent = selectedApp 
    ? apps.find(app => app.id === selectedApp)?.component 
    : null;

  return (
    <div className="space-y-6">
      {!selectedApp ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <Card
                  key={app.id}
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setSelectedApp(app.id)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="h-8 w-8" />
                    <span className="font-medium">{app.name}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <button
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSelectedApp(null)}
          >
            ← Back to Apps
          </button>
          {AppComponent && <AppComponent />}
        </div>
      )}
    </div>
  );
}