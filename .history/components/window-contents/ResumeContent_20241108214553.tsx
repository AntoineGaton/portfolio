"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";
import { useEffect, useState } from "react";

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

      <object
        data="/documents/Antoine_Gaton_Resume_11824.pdf"
        type="application/pdf"
        className="h-[calc(100vh-8rem)] w-full"
      >
        <p>Unable to display PDF file. <a href="/documents/Antoine_Gaton_Resume_11824.pdf">Download</a> instead.</p>
      </object>
    </div>
  );
}