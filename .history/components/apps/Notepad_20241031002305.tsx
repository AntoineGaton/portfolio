"use client";

import { useState, useEffect } from "react";
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
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          Download
        </Button>
        <label>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            asChild
          >
            <div>
              <FileUp className="h-4 w-4" />
              Upload
            </div>
          </Button>
          <input
            type="file"
            accept=".txt"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <span className="ml-auto text-sm text-muted-foreground">
          {saved ? "Saved" : "Unsaved"}
        </span>
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={handleChange}
        className="flex-1 p-4 resize-none focus:outline-none bg-background"
        placeholder="Start typing..."
      />
    </div>
  );
}