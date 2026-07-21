# DRAGEND - Visual Backend Builder

> **Build Backends. Drag. Drop. Deploy.**
> 
> A cinematic landing page showcasing a visual backend builder platform with stunning parallax animations and immersive 10-chapter narrative.

[![GitHub](https://img.shields.io/badge/GitHub-prajwal--vl%2Fdragend-blue?logo=github)](https://github.com/prajwal-vl/dragend)
[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://dragend.vercel.app)

---

## ✨ Features

### 🎨 Stunning Visual Design
- **10 Immersive Chapters** - Each telling part of the DRAGEND story
- **Parallax Scroll Animations** - Background images move with scroll for depth and visual interest
- **Framer Motion Effects** - Smooth, professional animations throughout
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 🎬 Chapter Breakdown
1. **Hero** - Build. Drag. Drop. Deploy. (Sunset flower field)
2. **The Journey Begins** - Nature meets the machine (Robot walking into futuristic world)
3. **Design** - Drag a database into existence (Database holographic interface)
4. **Connect Everything** - Every connection is a beam of light (Portal connections)
5. **REST APIs** - Endpoints that write themselves (API workflow)
6. **AI Agent** - An AI that builds the boring parts (Code generation)
7. **Realtime Preview** - Test it before it exists (Live testing)
8. **Deploy** - One click. Live everywhere. (Cloud deployment)
9. **Everything, Orbiting** - One canvas. Every primitive. (Feature showcase)
10. **Your Turn** - Build the future of backends (Call to action)

### 🚀 Tech Stack
- **Framework**: TanStack Start with TypeScript
- **Build Tool**: Vite
- **Animation**: Framer Motion with Lenis smooth scroll
- **UI Components**: Radix UI + Tailwind CSS
- **Styling**: TailwindCSS with custom gradients and glass effects
- **Icons**: Lucide React
- **Package Manager**: npm/Bun

---

## 📦 Prerequisites

- **Node.js** 18.x or higher
- **npm** or **Bun** package manager
- Git for version control

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/prajwal-vl/dragend.git
cd dragend

# Install dependencies
npm install
# or if using Bun
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun dev
```

The application will be available at:
- **Local**: http://localhost:8080/
- **Network**: http://192.168.56.1:8080/

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

---

## 📁 Project Structure

```
dragend/
├── src/
│   ├── assets/
│   │   ├── hero-robot.jpg           # Chapter 1 background
│   │   ├── robot-walk.jpg           # Chapter 2 background
│   │   ├── robot-database.jpg       # Chapter 3 background
│   │   ├── robot-deploy.jpg         # Chapter 7-8 backgrounds
│   │   └── robot-portal.jpg         # Chapter 4, 9-10 backgrounds
│   ├── components/ui/               # Radix UI components (50+)
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Utility functions
│   ├── routes/
│   │   ├── __root.tsx              # Root layout
│   │   └── index.tsx               # Landing page (all 10 chapters)
│   ├── styles.css                  # Global styles
│   ├── router.tsx                  # TanStack Router config
│   └── start.ts                    # Entry point
├── public/                         # Static assets
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🎨 Background Parallax Implementation

Each chapter features a unique background image with scroll-based parallax animations:

```tsx
// Pattern used in all chapters
const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"],
});
const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

// Applied to background
<motion.div style={{ y: bgY }} className="absolute inset-0">
  <img src={assetImage} className="h-full w-full object-cover opacity-50" />
  <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
</motion.div>
```

---


## 🔧 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run build:dev   # Build in development mode
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
```

---

## 📱 Features Breakdown

### Chapter Components

| Chapter | Component | Key Features |
|---------|-----------|--------------|
| 1 | `Hero()` | Hero animation, parallax zoom, gradient overlays |
| 2 | `RobotWalk()` | Character animation, background parallax |
| 3 | `CreateDatabase()` | Interactive database schema, floating asset |
| 4 | `BuilderGraph()` | SVG network graph, animated nodes and edges |
| 5 | `RestPanel()` | HTTP methods showcase, glass morphism cards |
| 6 | `AiAgent()` | Terminal-style code generation animation |
| 7 | `RealtimePreview()` | Split pane request/response demo |
| 8 | `Deploy()` | Deployment status indicator, asset display |
| 9 | `FeaturesOrbit()` | Feature cards with 3D transforms |
| 10 | `Ending()` | CTA with portal background, full scale parallax |

### Special Effects

- **Lenis Smooth Scroll** - Buttery smooth scrolling throughout
- **Cursor Spotlight** - Radial gradient follows mouse cursor
- **Glass Morphism** - Frosted glass effect on cards
- **Gradient Text** - Multi-color text with CSS `bg-clip-text`
- **Neon Shadows** - Glowing effects on primary elements
- **Staggered Animations** - Sequential animations on scroll

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

- **GitHub Issues**: [prajwal-vl/dragend/issues](https://github.com/prajwal-vl/dragend/issues)
- **Live Demo**: [dragend.vercel.app](https://dragend.vercel.app)

---

## 🎯 Roadmap

- [ ] Add dark/light theme toggle
- [ ] Interactive backend builder demo
- [ ] Email signup integration
- [ ] Analytics dashboard
- [ ] API documentation
- [ ] Blog section
- [ ] Community showcase

---

## 📊 Performance Optimizations

- Lazy loading on images (`loading="lazy"`)
- Optimized asset images (compressed JPGs)
- CSS-in-JS with Tailwind purging
- Code splitting via TanStack Router
- Smooth scroll with Lenis (GPU-accelerated)

---

## 🙏 Acknowledgments

- **TanStack**: Router and Start framework
- **Framer Motion**: Animation library
- **Radix UI**: Accessible component library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful icon set

---

**Built with ❤️ by Prajwal VL**

*Last Updated: 2026-07-21*
