"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Save, FileDown, FileUp } from "lucide-react";

/**
 * Notepad Component
 * Simple text editor with save/load functionality
 * @component
 */
export function Notepad() {
  const [content, setContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("untitled.txt");
  const [saved, setSaved] = useState<boolean>(true);

  /**
   * Handles content changes
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaved(false);
  };

  /**
   * Saves content to local storage
   */
  const handleSave = () => {
    localStorage.setItem(fileName, content);
    setSaved(true);
  };

  /**
   * Downloads content as a text file
   */
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Handles file upload
   * @param {React.ChangeEvent<HTMLInputElement>} e - File input change event
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
        setFileName(file.name);
        setSaved(true);
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
                onChange={handleFileUpload}
              />
            </label>
          </Button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-[400px] p-4 bg-secondary/50 rounded-lg resize-none focus:outline-none"
        placeholder="Start typing..."
      />
    </Card>
  );
}