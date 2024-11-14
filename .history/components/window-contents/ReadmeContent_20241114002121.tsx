import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownContent = `
# Modern OS-Style Portfolio

A unique portfolio website that mimics a modern operating system interface, built with Next.js 14, TypeScript, and Tailwind CSS.

---

## 🚀 Key Features

### Desktop Environment

- Interactive desktop interface with animated icons and hover effects
- Advanced window management system with z-index layering:
  - Loading Screen (z-index: 100)
  - Center Menu (z-index: 60)
  - Taskbar (z-index: 50)
  - Windows (dynamic z-index)
- Animated background with particle effects
- System taskbar with live clock and quick access icons

### Window System

- Draggable and resizable windows
- Window state management (minimize, maximize, restore)
- Smart window positioning with cascading windows
- Multi-window support with proper z-index handling
- Window focus management with active state

### UI Components

- Custom animated loading screen
- Interactive center menu with search functionality
- Dynamic taskbar with window management
- Animated text effects with RGB gradients
- Badge-based skill display system
- Timeline animation for experience section
- Hover effects on social links and skills

---

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**:
   - Tailwind CSS
   - Framer Motion for animations
   - Shadcn/ui components
- **Icons**:
   - Lucide Icons
   - FontAwesome Icons
- **State Management**: React Hooks

---

## 🎨 Implemented Sections

- [x] About Me Section
   - Professional summary
   - Skills & expertise with interactive badges
   - Animated timeline for experience
   - Current focus and interests
   - Social links and resume download
- [x] Portfolio Section
   - Animated text effects
   - Interactive image display
   - RGB gradient animations
- [x] Experience Timeline
   - Animated entries
   - Professional highlights
   - Achievement tracking
- [x] Quick Access
   - GitHub profile
   - LinkedIn profile
   - Email contact
   - Resume download

---

## 🔄 Latest Updates

- Implemented badge-based skill display system
- Added animated timeline for experience section
- Created interactive center menu
- Integrated social links and quick access
- Added RGB gradient text animations
- Implemented window management system
- Created responsive card layouts
- Added hover effects and transitions

---

## 🚀 Coming Soon

- Enhanced mobile experience
- Window minimize animation
- Additional system utilities
- LinkedIn API integration
- GitHub activity feed
- Calendar integration
- Custom theme system
- File system simulation

---

## 📧 Contact

For any questions or feedback, please reach out to [swe.antoine.gaton@gmail.com](mailto:swe.antoine.gaton@gmail.com)
`;

export function ReadmeContent() {
  return (
    <div className="p-4">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        className="prose prose-invert max-w-none"
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
} 