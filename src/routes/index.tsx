import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Lenis from "lenis";
import {
  Database,
  Shield,
  HardDrive,
  Zap,
  Sparkles,
  Bell,
  ListChecks,
  Cloud,
  ArrowRight,
  Check,
  Cpu,
  BarChart3,
  Radio,
} from "lucide-react";

import heroRobot from "@/assets/hero-robot.jpg";
import robotWalk from "@/assets/robot-walk.jpg";
import robotDatabase from "@/assets/robot-database.jpg";
import robotDeploy from "@/assets/robot-deploy.jpg";
import robotPortal from "@/assets/robot-portal.jpg";

export const Route = createFileRoute("/")({
  component: DragendLanding,
});

/* -------------------------------------------------------------------------- */
/* Smooth scroll                                                              */
/* -------------------------------------------------------------------------- */

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

/* -------------------------------------------------------------------------- */
/* Ambient background — particles + cursor spotlight                           */
/* -------------------------------------------------------------------------- */

function Ambient() {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const bg = useTransform(
    [smx, smy] as unknown as MotionValue<number>[],
    // @ts-expect-error framer typings for combined MotionValues
    ([x, y]: [number, number]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, oklch(0.66 0.22 295 / 0.18), transparent 60%)`,
  );

  return (
    <>
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{ background: bg as unknown as string }}
      />
      {/* Static bloom */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.35 0.18 295 / 0.35), transparent 70%), radial-gradient(ellipse 60% 40% at 20% 100%, oklch(0.35 0.18 320 / 0.2), transparent 70%)",
        }}
      />
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {/* Floating particles */}
      <Particles />
    </>
  );
}

function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {particles.map((i) => {
        const size = 2 + (i % 4);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const dur = 8 + (i % 7);
        const delay = (i % 10) * 0.6;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-primary/70"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              boxShadow: "0 0 12px oklch(0.66 0.22 295 / 0.9)",
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Nav                                                                         */
/* -------------------------------------------------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
            scrolled ? "glass" : ""
          }`}
        >
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight">DRAGEND</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#build" className="transition hover:text-foreground">Build</a>
          <a href="#ai" className="transition hover:text-foreground">AI</a>
          <a href="#deploy" className="transition hover:text-foreground">Deploy</a>
          <a href="#features" className="transition hover:text-foreground">Features</a>
        </nav>
        <a
          href="#start"
          className="group relative overflow-hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-neon transition hover:scale-105"
        >
          <span className="relative z-10">Get Started</span>
          <span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            aria-hidden
          />
        </a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary to-primary-glow shadow-neon">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 6l6-3 10 5-6 3z" strokeLinejoin="round" />
        <path d="M4 12l10 5 6-3M4 18l10 5 6-3" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 1 — Hero                                                            */
/* -------------------------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <img
          src={heroRobot}
          alt="DRAGEND robot mascot in a dreamy sunset flower field"
          className="h-full w-full object-cover"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Now in private beta
        </motion.div>

        <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl md:text-[7rem]">
          <FadeWord delay={0.2}>Build</FadeWord>{" "}
          <FadeWord delay={0.35} gradient>
            Backends.
          </FadeWord>
          <br />
          <FadeWord delay={0.6}>Drag.</FadeWord>{" "}
          <FadeWord delay={0.75}>Drop.</FadeWord>{" "}
          <FadeWord delay={0.9} gradient>
            Deploy.
          </FadeWord>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground"
        >
          The visual backend builder. Design databases, connect APIs, and deploy production-ready
          systems in a single cinematic canvas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#start"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-neon transition-transform hover:scale-105"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary-glow to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
          </a>
          <a
            href="#build"
            className="rounded-full glass px-8 py-4 text-base font-medium text-foreground transition hover:bg-white/10"
          >
            See it in motion
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted-foreground"
        >
          <div className="flex flex-col items-center gap-2">
            <span>scroll to unfold</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-6 w-px bg-gradient-to-b from-primary to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FadeWord({
  children,
  delay = 0,
  gradient = false,
}: {
  children: ReactNode;
  delay?: number;
  gradient?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={`inline-block ${gradient ? "bg-gradient-to-br from-primary-glow via-primary to-white bg-clip-text text-transparent" : ""}`}
    >
      {children}
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 2 — Robot Walk                                                      */
/* -------------------------------------------------------------------------- */

function RobotWalk() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-30%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1.2]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative min-h-[120vh] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src={robotWalk}
          alt="Robot walking from a flower field into a futuristic neon world"
          className="h-full w-full object-cover opacity-70"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
      </motion.div>

      <motion.div
        style={{ x, scale }}
        className="absolute inset-y-0 left-0 right-0 flex items-center justify-center"
      >
        <div className="h-56 w-56 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[120vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
        <SectionEyebrow>Chapter 02 — The Journey Begins</SectionEyebrow>
        <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance md:text-7xl">
          Nature meets the{" "}
          <span className="bg-gradient-to-br from-primary-glow to-primary bg-clip-text text-transparent">
            machine.
          </span>
        </h2>
        <p className="mt-6 max-w-lg text-muted-foreground">
          As you scroll, our little architect walks into a floating platform where every backend
          block waits to be assembled.
        </p>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-primary shadow-neon" />
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 3 — Create Database                                                 */
/* -------------------------------------------------------------------------- */

const DB_FIELDS = [
  { name: "id", type: "uuid" },
  { name: "name", type: "string" },
  { name: "email", type: "string" },
  { name: "password", type: "hash" },
  { name: "createdAt", type: "timestamp" },
];

function CreateDatabase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [visibleFields, setVisibleFields] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const count = Math.min(DB_FIELDS.length, Math.floor(v * 8));
    setVisibleFields(count);
  });

  const cardScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 1, 1.05]);
  const cardY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="build" ref={ref} className="relative min-h-[130vh] overflow-hidden py-32">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src={robotDatabase}
          alt="Robot presenting a holographic database"
          className="h-full w-full object-cover opacity-50"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </motion.div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <SectionEyebrow>Chapter 03 — Design</SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
            Drag a{" "}
            <span className="bg-gradient-to-br from-primary-glow to-primary bg-clip-text text-transparent">
              database
            </span>{" "}
            into existence.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Fields materialize as you place them. Types, indexes, and relations light up in
            purple as the schema takes shape.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {["Type-safe schemas", "Auto-generated migrations", "Live relation graph"].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <motion.div style={{ scale: cardScale, y: cardY }} className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/30 blur-3xl" />
          <div className="glass-strong overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  users
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-primary shadow-neon" />
              </div>
            </div>
            <div className="divide-y divide-white/5 p-2">
              {DB_FIELDS.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    i < visibleFields
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0.15, x: -20 }
                  }
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary shadow-neon" />
                    <span className="font-mono text-sm text-foreground">{f.name}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{f.type}</span>
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-1 flex items-center justify-center rounded-xl border border-dashed border-white/15 py-3 text-xs text-muted-foreground"
              >
                + Add Field
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 4 — Drag & Drop Builder graph                                       */
/* -------------------------------------------------------------------------- */

const NODES = [
  { id: "db", label: "Database", icon: Database, x: 15, y: 30 },
  { id: "auth", label: "Auth", icon: Shield, x: 40, y: 15 },
  { id: "storage", label: "Storage", icon: HardDrive, x: 65, y: 25 },
  { id: "api", label: "REST API", icon: Zap, x: 40, y: 55 },
  { id: "ai", label: "AI", icon: Sparkles, x: 78, y: 55 },
  { id: "queue", label: "Queue", icon: ListChecks, x: 20, y: 75 },
  { id: "notify", label: "Notifications", icon: Bell, x: 65, y: 82 },
];

const EDGES: [string, string][] = [
  ["db", "api"], ["auth", "api"], ["storage", "api"],
  ["api", "ai"], ["api", "queue"], ["queue", "notify"], ["ai", "notify"],
];

function BuilderGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <section ref={ref} className="relative min-h-[140vh] overflow-hidden py-32">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src={robotPortal}
          alt="Portal connecting everything"
          className="h-full w-full object-cover opacity-40"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </motion.div>
      <div className="relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Chapter 04 — Connect Everything</SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
            Every connection is a{" "}
            <span className="bg-gradient-to-br from-primary-glow to-primary bg-clip-text text-transparent">
              beam of light.
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Drop a component, drag a wire. The graph comes alive.
          </p>
        </div>

        <motion.div
          style={{ rotate, scale }}
          className="relative mx-auto mt-20 aspect-[16/10] w-full max-w-5xl"
        >
          <div className="glass-strong absolute inset-0 rounded-3xl" />
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_50%,oklch(0.66_0.22_295/0.15),transparent_60%)]" />

          {/* Edges */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="beam" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.19 300)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="oklch(0.78 0.19 300)" stopOpacity="1" />
                <stop offset="100%" stopColor="oklch(0.78 0.19 300)" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {EDGES.map(([a, b], i) => {
              const na = nodeById[a];
              const nb = nodeById[b];
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="url(#beam)"
                  strokeWidth="0.3"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: "easeInOut" }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {NODES.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3 shadow-neon">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-white">
                  <n.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{n.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 5 — REST APIs                                                       */
/* -------------------------------------------------------------------------- */

const METHODS = [
  { m: "GET", color: "bg-emerald-500/80", path: "/users" },
  { m: "POST", color: "bg-primary", path: "/signup" },
  { m: "PUT", color: "bg-amber-500/80", path: "/users/:id" },
  { m: "PATCH", color: "bg-cyan-500/80", path: "/users/:id" },
  { m: "DELETE", color: "bg-rose-500/80", path: "/users/:id" },
];

function RestPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src={robotDatabase}
          alt="Database APIs"
          className="h-full w-full object-cover opacity-35"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </motion.div>
      <div className="relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Chapter 05 — REST APIs</SectionEyebrow>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
              Endpoints that{" "}
              <span className="bg-gradient-to-br from-primary-glow to-primary bg-clip-text text-transparent">
                write themselves.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Choose a method, point at a resource. Validation, docs, and typed clients ship with it.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/30 blur-3xl" />
            <div className="glass-strong rounded-3xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  workflow · users
                </span>
                <Radio className="h-4 w-4 animate-pulse text-primary" />
              </div>
              <div className="space-y-2">
                {METHODS.map((m, i) => (
                  <motion.div
                    key={m.m}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-primary/40 hover:bg-white/[0.04]"
                  >
                    <span
                      className={`rounded-md px-2.5 py-1 font-mono text-[10px] font-bold text-white ${m.color}`}
                    >
                      {m.m}
                    </span>
                    <span className="font-mono text-sm text-foreground">{m.path}</span>
                    <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground opacity-0 transition group-hover:opacity-100">
                      <Check className="h-3 w-3 text-emerald-400" /> 200 OK
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 6 — AI Agent                                                        */
/* -------------------------------------------------------------------------- */

const AI_TASKS = [
  "→ Generating authentication…",
  "→ Scaffolding CRUD controllers…",
  "→ Writing Zod validation…",
  "→ Wiring middleware…",
  "→ Emitting OpenAPI docs…",
  "✓ Backend ready.",
];

function AiAgent() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1.1]);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (AI_TASKS.length + 1)), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="ai" ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ y: bgY, scale }} className="absolute inset-0 -z-10">
        <img
          src={robotWalk}
          alt="AI Agent at work"
          className="h-full w-full object-cover opacity-45"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </motion.div>
      <div className="relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-0 -z-10 animate-pulse rounded-3xl bg-primary/40 blur-3xl" />
            <div className="glass-strong rounded-3xl p-6 font-mono text-sm">
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Cpu className="h-4 w-4 text-primary" />
                <span>dragend / ai-agent</span>
                <span className="ml-auto flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  live
                </span>
              </div>
              <div className="space-y-1.5">
                {AI_TASKS.map((t, i) => (
                  <div
                    key={t}
                    className={`transition-all duration-500 ${
                      i < step
                        ? "text-foreground opacity-100"
                        : "text-muted-foreground/30 opacity-40"
                    }`}
                  >
                    {t}
                    {i === step - 1 && (
                      <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-primary align-middle" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SectionEyebrow>Chapter 06 — AI Agent</SectionEyebrow>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
              An AI that builds{" "}
              <span className="bg-gradient-to-br from-primary-glow to-primary bg-clip-text text-transparent">
                the boring parts.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Authentication, CRUD, validation, middleware, routes, controllers, docs. Generated in
              seconds, editable in one click.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 7 — Realtime Preview                                                */
/* -------------------------------------------------------------------------- */

function RealtimePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-10">
        <img
          src={robotDeploy}
          alt="Realtime preview deployment"
          className="h-full w-full object-cover opacity-40"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/25 to-background" />
      </motion.div>
      <div className="relative z-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Chapter 07 — Realtime Preview</SectionEyebrow>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
            Test it before it{" "}
            <span className="bg-gradient-to-br from-primary-glow to-primary bg-clip-text text-transparent">
              exists.
            </span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/30 blur-3xl" />
            <div className="glass-strong overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/70" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/70" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  POST /signup
                </span>
                <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono text-xs text-emerald-300">
                  200 OK · 42ms
                </span>
              </div>
              <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="p-6 font-mono text-sm">
                  <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Request</div>
                  <pre className="text-foreground/90"><code>{`{
  "email": "ada@dragend.dev",
  "password": "••••••••"
}`}</code></pre>
                </div>
                <div className="p-6 font-mono text-sm">
                  <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Response</div>
                  <pre className="text-foreground/90"><code>{`{
  "status": "success",
  "user": {
    "id": "u_12345",
    "email": "ada@dragend.dev"
  }
}`}</code></pre>
                </div>
              </div>
              <div className="border-t border-white/10 bg-black/30 px-5 py-3 font-mono text-xs text-emerald-300">
                ✓ user.created · ✓ session.issued · ✓ email.queued
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 8 — Deploy                                                          */
/* -------------------------------------------------------------------------- */

function Deploy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1.5, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="deploy" ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src={robotDeploy}
          alt="Robot deploying to the cloud"
          className="h-full w-full object-cover opacity-50"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </motion.div>
      <motion.div
        style={{ opacity: glow }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-[120px]"
      />
      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Chapter 08 — Deploy</SectionEyebrow>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
              One click.{" "}
              <span className="bg-gradient-to-br from-primary-glow to-primary bg-clip-text text-transparent">
                Live everywhere.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Ship to the edge in seconds. Zero config, global cache, autoscaling, and rollback in a
              single tap.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/20 text-emerald-400"
              >
                <Check className="h-7 w-7" />
              </motion.div>
              <div>
                <div className="font-mono text-sm text-emerald-300">Deployed successfully</div>
                <div className="font-mono text-xs text-muted-foreground">
                  https://api.dragend.dev · edge · 12 regions
                </div>
              </div>
            </div>
          </div>

          <motion.div style={{ scale }} className="relative mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 rounded-3xl bg-primary/40 blur-3xl -z-10" />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20" />
              <div className="h-48 w-48 rounded-3xl bg-gradient-to-br from-primary/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 9 — Features Explosion (orbit)                                      */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  { label: "REST APIs", icon: Zap },
  { label: "Database", icon: Database },
  { label: "AI", icon: Sparkles },
  { label: "Auth", icon: Shield },
  { label: "Storage", icon: HardDrive },
  { label: "Analytics", icon: BarChart3 },
  { label: "Realtime", icon: Radio },
  { label: "Deploy", icon: Cloud },
];

function FeaturesOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.08, 1.15]);

  return (
    <section id="features" ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-10">
        <img
          src={robotPortal}
          alt="Features orbiting the portal"
          className="h-full w-full object-cover opacity-35"
          loading="lazy"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </motion.div>
      <div className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <SectionEyebrow>Chapter 09 — Everything, orbiting.</SectionEyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
          One canvas.{" "}
          <span className="bg-gradient-to-br from-primary-glow to-primary bg-clip-text text-transparent">
            Every primitive.
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ y: -8, rotateX: 6, rotateY: -6 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative rounded-2xl glass p-6 text-left transition"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white shadow-neon">
                  <f.icon className="h-5 w-5" />
                </span>
                <div className="mt-4 font-display text-lg font-semibold">{f.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Production-ready · zero config
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 10 — Ending                                                         */
/* -------------------------------------------------------------------------- */

function Ending() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section id="start" ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img
          src={robotPortal}
          alt="Robot standing before a glowing purple portal"
          loading="lazy"
          width={1600}
          height={1200}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <SectionEyebrow>Chapter 10 — Your Turn</SectionEyebrow>
        <h2 className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight text-balance md:text-8xl">
          Build the future of{" "}
          <span className="bg-gradient-to-br from-primary-glow via-primary to-white bg-clip-text text-transparent">
            backends.
          </span>
        </h2>
        <div className="mt-8 font-display text-2xl tracking-tight text-muted-foreground">
          DRAGEND · Drag. Drop. Deploy.
        </div>
        <a
          href="#"
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-medium text-primary-foreground shadow-neon transition-transform hover:scale-105"
        >
          Start Building
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-sm font-bold">DRAGEND</span>
          <span className="ml-3 text-xs text-muted-foreground">© 2026</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Crafted for developers who ship.
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

function DragendLanding() {
  useLenis();
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Ambient />
      <Nav />
      <div className="relative z-10">
        <Hero />
        <RobotWalk />
        <CreateDatabase />
        <BuilderGraph />
        <RestPanel />
        <AiAgent />
        <RealtimePreview />
        <Deploy />
        <FeaturesOrbit />
        <Ending />
        <Footer />
      </div>
    </main>
  );
}
