# Modern OS-Style Portfolio

A unique portfolio website that mimics a modern operating system interface, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Key Features

### Desktop Environment

- Interactive desktop interface with draggable icons
- Advanced window management system with z-index layering:
  - Loading Screen (z-index: 100)
  - Taskbar (z-index: 50)
  - Windows (dynamic z-index)
- Customizable background with animated effects
- System taskbar with live clock and weather

### Window System

- Draggable and resizable windows
- Window state management (minimize, maximize, restore)
- Smart window positioning
- Multi-window support with proper z-index handling
- Window focus management

### UI Components

- Custom animated loading screen
- Interactive start menu
- Dynamic taskbar with window previews
- System tray with functional widgets
- Context menus and dropdowns

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS
  - Framer Motion for animations
- **UI Components**:
  - Radix UI Primitives
  - Shadcn/ui
- **3D Graphics**: Three.js
- **State Management**: React Hooks

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/AntoineGaton/portfolio.git
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

1. Run the development server:

```bash
npm run dev
# or
yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Performance

The application is optimized for performance with efficient bundle sizes:

- Total First Load JS: 378 kB
- Static page rendering for optimal loading speed
- Automatic code splitting for better caching and performance
- Route-based chunking:
  - Home route: 298 kB
  - Shared bundles: 79.4 kB

All metrics are well within web performance best practices, ensuring a smooth user experience.

## 📁 Project Structure

```tree
portfolio/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Desktop.tsx          # Main desktop environment
│   ├── Taskbar.tsx         # System taskbar
│   ├── Window.tsx          # Window component
│   ├── apps/               # Application components
│   └── ui/                 # Reusable UI components
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── styles/               # Global styles
```

## 🎨 UI Components

### Window Implementation

The window system provides a desktop-like experience with:

- Draggable windows
- Window state management
- Z-index handling
- Minimize/Maximize/Close functionality

### Navigation

Custom navigation components including:

- Start menu
- Context menus
- Dropdown menus
- Application launcher

## 🔧 Customization

### Theme

The portfolio supports light and dark themes through Tailwind CSS. Theme can be toggled via the system tray icon.

## 📱 Responsive Design

The portfolio is fully responsive and adapts to different screen sizes:

- Desktop: Full OS-like experience
- Tablet: Simplified window management
- Mobile: Stack-based layout (coming soon)

## 🗺 Roadmap

### Core Content Sections

- [ ] About Me Section
- [ ] Projects Section
- [ ] Experience Section
- [ ] Resume Section
- [ ] Contact Section
- [ ] Games Section
- [ ] Apps Section

### UI/UX Improvements

- [ ] Mobile Version
- [ ] Window Minimize Animation
- [ ] Enhanced Search Functionality
- [ ] System Tray Icons
- [ ] Calendar Integration
- [ ] Battery Status
- [ ] Desktop Widgets

### Advanced Features

- [ ] Window Snapping
- [ ] Multi-window Management
- [ ] Custom Themes
- [ ] File System Simulation
- [ ] Terminal Emulator
- [ ] Keyboard Shortcuts
- [ ] Progressive Web App Support

### Integrations

- [ ] LinkedIn API
- [ ] GitHub Activity
- [ ] Weather API
- [ ] RSS Feed Reader
- [ ] Analytics Dashboard

## 🐛 Known Issues

- Window minimize animation needs improvement
- Mobile layout requires optimization
- Search functionality is basic
- Some UI elements need better accessibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful component designs
- [Lucide Icons](https://lucide.dev/) for the icon system
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS

## 📧 Contact

For any questions or feedback, please reach out to [swe.antoine.gaton@gmail.com](mailto:swe.antoine.gaton@gmail.com)

## 💡 Inspiration

This project draws inspiration from:

- Modern operating systems (Windows 11, macOS)
- Web-based operating systems
- Creative developer portfolios
- Desktop environment designs

## 🔄 Updates

### Latest Changes

- Added window management system
- Implemented dark/light theme toggle
- Created basic application structure
- Added taskbar functionality

### Coming Soon

- Enhanced mobile experience
- More applications and games
- Improved window animations
- Additional system utilities
- More UI/UX improvements
- LinkedIn API integration
- GitHub API integration
- Calendar Integration
- Battery Status
- Able to change colors, themes and wallpapers
