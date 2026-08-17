"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, Code2 as Github, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";

// ─── Inline project data ─────────────────────────────────────────────────────
interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "Web" | "Design" | "OSS";
  link: string;
  github?: string;
  featured?: boolean;
  stars?: number;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "1",
    title: "Pulse Analytics",
    description:
      "A real-time analytics dashboard for SaaS products. Tracks user behavior, funnel conversion, and revenue metrics with beautiful charts and customizable widgets.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/66e172dce01441978a51b35b0b5d3cb1.png",
    technologies: ["Next.js", "TypeScript", "Recharts", "Supabase"],
    category: "Web",
    link: "https://pulse-analytics.dev",
    github: "https://github.com/alexmorgandev/pulse-analytics",
    featured: true,
    stars: 312,
  },
  {
    id: "2",
    title: "Forma Design System",
    description:
      "A comprehensive component library and design system built for scale. Includes 60+ accessible components, dark mode support, and a Figma kit.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e84cc0bed2564849b7604d3eb2342f9d.png",
    technologies: ["React", "Storybook", "Radix UI", "Tailwind CSS"],
    category: "Design",
    link: "https://forma.design",
    github: "https://github.com/alexmorgandev/forma",
    featured: true,
    stars: 891,
  },
  {
    id: "3",
    title: "Relay",
    description:
      "Open-source WebSocket state synchronization library. Keeps client state in sync across browser tabs and devices with zero configuration.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/92dca7a3ea914d6cb01afc78e4381ce7.jpg",
    technologies: ["TypeScript", "WebSockets", "Rollup", "Vitest"],
    category: "OSS",
    link: "https://relay-sync.dev",
    github: "https://github.com/alexmorgandev/relay",
    featured: false,
    stars: 1240,
  },
  {
    id: "4",
    title: "Cartographer",
    description:
      "Interactive map-based data visualization platform for urban planners. Layers demographic, transit, and zoning data over live map tiles.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/2d0f81720f1f4caf9aa7fcd2dcbcc651.jpg",
    technologies: ["React", "Mapbox GL", "D3.js", "Node.js"],
    category: "Web",
    link: "https://cartographer.app",
    featured: false,
  },
  {
    id: "5",
    title: "Hue Brand Identity",
    description:
      "Full brand identity system for a creative agency. Covers logo design, typography, color palette, motion guidelines, and a 40-page brand book.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/9ff75e85973c46f18f89a24d0d6951bf.php",
    technologies: ["Figma", "After Effects", "Illustrator"],
    category: "Design",
    link: "https://dribbble.com/alexmorgan/hue",
    featured: false,
  },
  {
    id: "6",
    title: "Vaultd",
    description:
      "End-to-end encrypted password manager with biometric unlock, secure sharing, and a browser extension. Built with a zero-knowledge architecture.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/925d716da6234ac0a938e903286eb86c.jpg",
    technologies: ["React Native", "Expo", "AES-256", "SQLite"],
    category: "Web",
    link: "https://vaultd.app",
    github: "https://github.com/alexmorgandev/vaultd",
    featured: false,
    stars: 204,
  },
  {
    id: "7",
    title: "Inkwell CMS",
    description:
      "A headless CMS built for developers who write. Markdown-first, Git-backed, with a clean editorial UI and a GraphQL content API.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0b5f9464936448e5b84e127dd2769949.jpg",
    technologies: ["Next.js", "GraphQL", "MDX", "PostgreSQL"],
    category: "OSS",
    link: "https://inkwell.dev",
    github: "https://github.com/alexmorgandev/inkwell",
    featured: false,
    stars: 567,
  },
  {
    id: "8",
    title: "Orbit UI Kit",
    description:
      "A Figma UI kit with 200+ components, auto-layout grids, and dark/light mode variants. Designed for product teams moving fast.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/5464b76d0ed34f509c04440f6378d1f0.png",
    technologies: ["Figma", "Variables", "Auto Layout"],
    category: "Design",
    link: "https://www.figma.com/@alexmorgan/orbit",
    featured: false,
  },
  {
    id: "9",
    title: "Chrono",
    description:
      "Lightweight open-source time-tracking CLI for developers. Integrates with GitHub issues, Jira, and Linear. Exports to CSV or JSON.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/db8cc9dd0ad3413981716f9ad5ddce51.jpg",
    technologies: ["Go", "Cobra CLI", "SQLite", "REST APIs"],
    category: "OSS",
    link: "https://chrono-cli.dev",
    github: "https://github.com/alexmorgandev/chrono",
    featured: false,
    stars: 438,
  },
];

const FILTER_TABS = ["All", "Web", "Design", "OSS"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

// ─── ProjectCard ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const t = useTranslations();
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10",
        "bg-[hsl(var(--card))] shadow-[0_2px_8px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.04)]",
        "transition-shadow duration-300",
        "hover:shadow-[0_8px_32px_rgba(139,92,246,0.18),0_2px_8px_rgba(0,0,0,0.4),0_0_0_1px_rgba(139,92,246,0.2)]",
        project.featured && "md:col-span-2",
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-[hsl(var(--muted))]",
          project.featured ? "h-56 sm:h-64" : "h-44",
        )}
      >
        <img
          src={project.image}
          alt={t("projects.card.imageAlt", { title: project.title })}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm border border-white/10">
          {project.category}
        </span>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-[var(--accent)]/90 px-3 py-1 text-xs font-semibold text-black backdrop-blur-sm">
            {t("projects.card.featured")}
          </span>
        )}

        {/* Stars */}
        {project.stars !== undefined && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-sm border border-white/10">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            {project.stars.toLocaleString("en-US")}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--muted-foreground))]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/8">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("projects.card.visitAriaLabel", { title: project.title })}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {t("projects.card.visit")}
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("projects.card.githubAriaLabel", { title: project.title })}
              className="flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              {t("projects.card.source")}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const t = useTranslations();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* ── Hero ── */}
      <Reveal>
        <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-36">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-[100px]"
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--accent)]"
            >
              {t("projects.hero.eyebrow")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="relative inline-block text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl md:text-6xl"
            >
              {t("projects.hero.title")}
              {/* Animated underline */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                style={{ originX: 0 }}
                className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/30"
                aria-hidden="true"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
              className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-lg"
            >
              {t("projects.hero.subtitle")}
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* ── Filter tabs ── */}
      <Reveal delay={0.05}>
        <section className="px-6 pb-10">
          <div className="mx-auto max-w-6xl">
            <div
              role="tablist"
              aria-label={t("projects.filter.ariaLabel")}
              className="flex flex-wrap items-center gap-2"
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeFilter === tab}
                  onClick={() => setActiveFilter(tab)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold border transition-all duration-200",
                    activeFilter === tab
                      ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_16px_rgba(139,92,246,0.35)]"
                      : "bg-white/5 text-[hsl(var(--muted-foreground))] border-white/10 hover:border-white/20 hover:text-[hsl(var(--foreground))]",
                  )}
                >
                  {tab === "All"
                    ? t("projects.filter.all")
                    : tab === "Web"
                    ? t("projects.filter.web")
                    : tab === "Design"
                    ? t("projects.filter.design")
                    : t("projects.filter.oss")}
                  <span
                    className={cn(
                      "ml-2 rounded-full px-1.5 py-0.5 text-xs",
                      activeFilter === tab
                        ? "bg-black/20 text-black"
                        : "bg-white/10 text-[hsl(var(--muted-foreground))]",
                    )}
                  >
                    {tab === "All"
                      ? PROJECTS.length
                      : PROJECTS.filter((p) => p.category === tab).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Projects grid ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center text-[hsl(var(--muted-foreground))]"
            >
              {t("projects.empty")}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <Reveal>
        <section className="relative overflow-hidden border-t border-white/8 px-6 py-24">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-[var(--accent)]/8 blur-[80px]"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
              {t("projects.cta.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-lg">
              {t("projects.cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(139,92,246,0.6)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                {t("projects.cta.button")}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="https://github.com/alexmorgandev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-[hsl(var(--foreground))] transition-all duration-300 hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                {t("projects.cta.github")}
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}