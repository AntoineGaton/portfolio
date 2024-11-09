"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useState, FormEvent } from "react";
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from "framer-motion";

export function ContactContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('contactFormSubmitted') === 'true';
    }
    return false;
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    // Name validation
    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Message validation
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_ghiih92",
        "template_k0ioezk",
        {
          user_name: formData.name.trim(),
          user_email: formData.email.trim(),
          message: formData.message.trim(),
        },
        "jbPu3Eo8bor4gIrkJ"
      );
      
      setIsSubmitted(true);
      sessionStorage.setItem('contactFormSubmitted', 'true');
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold">{isSubmitted ? "" : "Get in Touch"}</h2>
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center h-[400px] text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-green-500 mb-4 text-5xl"
              >
                ✓
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">
                Thank you for reaching out. I&apos;ll get back to you soon!
              </p>
            </motion.div>
          ) : (
            <motion.form
              className="mt-6 space-y-4"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  required
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  required
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Your message" 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  required
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <Button 
                className="w-full" 
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </Card>

      <Card className="p-6">
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary/20">
              <Image
                src="/images/Antoine.jpg"
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h2 className="text-2xl font-semibold">Antoine Gaton</h2>
            <p className="text-muted-foreground">Software Engineer</p>
          </div>

          <hr />

          {/* Contact Links */}
          <div className="space-y-3 dblock margin">
            <a
              href="mailto:swe.antoine.gaton@gmail.com"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary group"
            >
              <Mail className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="text-sm">swe.antoine.gaton@gmail.com</span>
            </a>
            
            <a
              href="tel:+15708568090"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary group"
            >
              <Phone className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="text-sm">+1 (570) 856-8090</span>
            </a>
            
            <a
              href="https://github.com/antoinegaton"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="text-sm">github.com/antoinegaton</span>
            </a>
            
            <a
              href="https://linkedin.com/in/antoinegaton"
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-secondary group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="text-sm">linkedin.com/in/antoinegaton</span>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}