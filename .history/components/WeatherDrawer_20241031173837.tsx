"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from 'react';
import { Button } from "./ui/button";
import { Weather } from "./weather";

interface LinkedInPost {
  id: string;
  content: string;
  date: string;
}

export function WeatherDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-0 left-0">
        <DrawerTrigger asChild>
          <Button variant="ghost" className="h-12 w-auto px-4">
            <Weather />
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className="fixed left-0 top-0 bottom-0 w-[400px] rounded-r-lg">
        <div className="h-full p-6 bg-background/80 backdrop-blur-lg">
          <h2 className="text-xl font-bold mb-4">Recent LinkedIn Posts</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-muted-foreground">October 31, 2024</p>
              <p className="mt-2">Sample LinkedIn post content...</p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
} 