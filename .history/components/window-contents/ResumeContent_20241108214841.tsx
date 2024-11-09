"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResumeContent() {
  return (

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