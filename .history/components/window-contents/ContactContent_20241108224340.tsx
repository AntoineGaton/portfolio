"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail, Phone } from "lucide-react";

export function ContactContent() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p className="mt-2 text-muted-foreground">
          Feel free to reach out for collaborations or job opportunities.
        </p>

        <form className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input id="name" placeholder="Your name" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea id="message" placeholder="Your message" rows={4} />
          </div>

          <Button className="w-full">Send Message</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold">Connect With Me</h2>
        <div className="mt-6 space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary"
          >
            <Mail className="h-5 w-5" />
            <span>swe</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary"
          >
            <Phone className="h-5 w-5" />
            <span>+1 (555) 123-4567</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary"
          >
            <Github className="h-5 w-5" />
            <span>github.com/johndoe</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary"
          >
            <Linkedin className="h-5 w-5" />
            <span>linkedin.com/in/johndoe</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary"
          >
            <Twitter className="h-5 w-5" />
            <span>twitter.com/johndoe</span>
          </a>
        </div>
      </Card>
    </div>
  );
}