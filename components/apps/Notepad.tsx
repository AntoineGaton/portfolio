"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Save, FileDown, FileUp } from "lucide-react";

export function Notepad() {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("untitled.txt");

  const handleSave = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target?.result as string);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="bg-transparent border-none focus:outline-none text-lg font-medium"
        />
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" asChild>
            <label>
              <FileUp className="h-4 w-4" />
              <input
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleLoad}
              />
            </label>
          </Button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[400px] p-4 bg-secondary/50 rounded-lg resize-none focus:outline-none"
        placeholder="Start typing..."
      />
    </Card>
  );
}