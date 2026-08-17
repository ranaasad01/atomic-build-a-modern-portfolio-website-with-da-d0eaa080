"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Star, Code, Layout, Terminal, Sparkles, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ChevronRight, Activity } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND, socialLinks } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline data ─────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Pulse Analytics",
    description:
      "Real-time data visualization platform processing 2M+ events per day. Built with Next.js, ClickHouse, and WebSockets for live dashboards.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/66e172dce01441978a51b35b0b5d3cb1.png",
    technologies: ["Next.js", "TypeScript", "ClickHouse", "WebSockets"],
    link: "/projects",
    accent: "from-violet-500/20 to-indigo-500/10",
  },
  {
    id: 2,
    title: "Forma Design System",
    description:
      "Open-source component library with 60+ accessible primitives, dark mode support, and Figma token sync. Used by 400+ developers.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e84cc0bed2564849b7604d3eb2342f9d.png",
    technologies: ["React", "Radix UI", "Storybook", "Figma API"],
    link: "/projects",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: 3,
    title: "Relay CMS",
    description:
      "Headless content platform with visual block editor, multi-tenant support, and edge-cached delivery via Cloudflare Workers.",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/38e19361399449ff80f4f84a1cc1a6db.jpg",
    technologies: ["Remix", "Prisma", "Cloudflare Workers", "PostgreSQL"],
    link: "/projects",
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

const SKILLS = [
  { label: "TypeScript", level: 95 },
  { label: "React / Next.js", level: 93 },
  { label: "Node.js", level: 88 },
  { label: "PostgreSQL", level: 82 },
  { label: "System Design", level: 80 },
  { label: "UI / UX", level: 78 },
];

const SERVICES = [
  {
    id: "frontend",
    icon: Layout,
    title: "Frontend Engineering",
    description:
      "Pixel-perfect interfaces built with React and Next.js. Performance-first, accessible by default, and delightful to use.",
  },
  {
    id: "backend",
    icon: Terminal,
    title: "Backend & APIs",
    description:
      "Scalable REST and GraphQL APIs, event-driven architectures, and database design that grows with your product.",
  },
  {
    id: "systems",
    icon: Activity,
    title: "Systems & DevOps",
    description:
      "CI/CD pipelines, containerized deployments, observability stacks, and infrastructure that stays out of your way.",
  },
  {
    id: "design",
    icon: Sparkles,
    title: "Design Systems",
    description:
      "Cohesive component libraries, token-based theming, and Figma-to-code workflows that keep design and dev in sync.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Alex shipped our entire data pipeline and dashboard in six weeks. The code quality was exceptional and the product felt polished from day one.",
    name: "Priya Nair",
    role: "CTO, Luminary Health",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya%20Nair",
  },
  {
    id: 2,
    quote:
      "Working with Alex felt like having a senior engineer and a product designer in one. Every decision was thoughtful and well-reasoned.",
    name: "Marcus Webb",
    role: "Founder, Stackline",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus%20Webb",
  },
  {
    id: 3,
    quote:
      "The design system Alex built cut our frontend development time in half. It's become the foundation every new product is built on.",
    name: "Sofia Delgado",
    role: "Head of Product, Orbit",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia%20Delgado",
  },
];

const STATS = [
  { value: "8+", label: "Years of experience" },
  { value: "40+", label: "Projects shipped" },
  { value: "18", label: "Open-source packages" },
  { value: "99%", label: "Client satisfaction" },
];

// ─── Social icon helper ───────────────────────────────────────────────────────

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "GitHub") return <Github className="h-5 w-5" aria-hidden="true" />;
  if (platform === "Twitter") return <Twitter className="h-5 w-5" aria-hidden="true" />;
  if (platform === "LinkedIn") return <Linkedin className="h-5 w-5" aria-hidden="true" />;
  return <Mail className="h-5 w-5" aria-hidden="true" />;
}

// ─── Bespoke hero variants ────────────────────────────────────────────────────

const heroHeading: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const heroSub: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.18 },
  },
};

const heroCta: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.34 },
  },
};

const heroStats: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.52 },
  },
};

// ─── Page component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-[92vh] flex items-center overflow-hidden px-6 pt-24 pb-20 md:px-12 lg:px-20"
      >
        {/* Radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--brand-accent)]/8 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[100px]" />
        </div>

        {/* Subtle grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-center">
            {/* Left: copy */}
            <div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={heroHeading}>
                  <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--brand-accent)]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand-accent)] opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
                    </span>
                    {t("hero.badge")}
                  </span>
                  <h1 className="mt-4 text-5xl font-bold tracking-tight text-[var(--foreground)] text-balance md:text-6xl lg:text-7xl">
                    {t("hero.heading1")}
                    <br />
                    <span className="text-[var(--brand-accent)]">
                      {t("hero.heading2")}
                    </span>
                    <br />
                    {t("hero.heading3")}
                  </h1>
                </motion.div>

                <motion.p
                  variants={heroSub}
                  className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted-foreground)]"
                >
                  {t("hero.subtext")}
                </motion.p>

                <motion.div
                  variants={heroCta}
                  className="mt-10 flex flex-wrap items-center gap-4"
                >
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] px-6 py-3 text-sm font-semibold text-[var(--brand-accent-fg)] shadow-[0_0_24px_rgba(99,102,241,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_36px_rgba(99,102,241,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
                  >
                    {t("hero.cta_primary")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
                  >
                    {t("hero.cta_secondary")}
                  </Link>
                </motion.div>

                <motion.div
                  variants={heroStats}
                  className="mt-14 flex flex-wrap gap-8"
                >
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold text-[var(--foreground)]">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right: code card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
                {/* Window chrome */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-white/30">portfolio.tsx</span>
                </div>
                <pre className="overflow-x-auto text-sm leading-relaxed">
                  <code>
                    <span className="text-violet-400">const</span>
                    <span className="text-white"> developer </span>
                    <span className="text-violet-400">=</span>
                    <span className="text-white"> {"{"}</span>
                    {"\n"}
                    <span className="text-white">  name: </span>
                    <span className="text-emerald-400">&quot;Alex Rivera&quot;</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    <span className="text-white">  role: </span>
                    <span className="text-emerald-400">&quot;Full-Stack Engineer&quot;</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    <span className="text-white">  stack: [</span>
                    {"\n"}
                    <span className="text-emerald-400">    &quot;TypeScript&quot;</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    <span className="text-emerald-400">    &quot;React&quot;</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    <span className="text-emerald-400">    &quot;Node.js&quot;</span>
                    <span className="text-white">,</span>
                    {"\n"}
                    <span className="text-emerald-400">    &quot;PostgreSQL&quot;</span>
                    {"\n"}
                    <span className="text-white">  ],</span>
                    {"\n"}
                    <span className="text-white">  available: </span>
                    <span className="text-amber-400">true</span>
                    {"\n"}
                    <span className="text-white">{"}"}</span>
                  </code>
                </pre>
                <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
                  <Code className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                  <span className="text-xs text-white/40">
                    {t("hero.code_caption")}
                  </span>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-8 rounded-xl border border-white/10 bg-[var(--card)] px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {t("hero.floating_badge")}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="services"
          className="border-t border-white/5 bg-white/[0.02] px-6 py-24 md:px-12 lg:px-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                {t("services.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                {t("services.heading")}
              </h2>
              <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
                {t("services.subtext")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {SERVICES.map((svc) => {
                const Icon = svc.icon;
                return (
                  <motion.div
                    key={svc.id}
                    variants={scaleIn}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-[var(--brand-accent)]/30 hover:bg-white/[0.06]"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] transition-colors duration-300 group-hover:bg-[var(--brand-accent)]/20">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 font-semibold text-[var(--foreground)]">
                      {svc.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {svc.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Featured Projects ─────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="projects"
          className="px-6 py-24 md:px-12 lg:px-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                  {t("projects.eyebrow")}
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                  {t("projects.heading")}
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-accent)] transition-colors hover:text-[var(--brand-accent)]/80"
              >
                {t("projects.view_all")}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {FEATURED_PROJECTS.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.1}>
                  <motion.article
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_32px_-8px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-white/15"
                  >
                    {/* Image */}
                    <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.accent}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
                        {project.title}
                      </h3>
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="mb-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-[var(--muted-foreground)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={project.link}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-accent)] transition-colors hover:text-[var(--brand-accent)]/80"
                      >
                        {t("projects.view_case_study")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-t border-white/5 bg-white/[0.02] px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              {/* Left: copy */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                  {t("skills.eyebrow")}
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                  {t("skills.heading")}
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--muted-foreground)]">
                  {t("skills.subtext")}
                </p>
                <Link
                  href="/about"
                  className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  {t("skills.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>

              {/* Right: skill bars */}
              <div className="space-y-5">
                {SKILLS.map((skill, i) => (
                  <Reveal key={skill.label} delay={i * 0.07}>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--foreground)]">
                          {skill.label}
                        </span>
                        <span className="text-xs text-[var(--muted-foreground)]">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                        <motion.div
                          className="h-full rounded-full bg-[var(--brand-accent)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.07 }}
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 py-24 md:px-12 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                {t("testimonials.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                {t("testimonials.heading")}
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-6 md:grid-cols-3"
            >
              {TESTIMONIALS.map((t_item) => (
                <motion.figure
                  key={t_item.id}
                  variants={fadeInUp}
                  className="flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.2)]"
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    &ldquo;{t_item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <img
                      src={t_item.avatar}
                      alt={t_item.name}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {t_item.name}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {t_item.role}
                      </p>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="contact"
          className="px-6 pb-28 pt-8 md:px-12 lg:px-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--brand-accent)]/20 bg-gradient-to-br from-[var(--brand-accent)]/10 via-[var(--brand-accent)]/5 to-transparent p-12 text-center shadow-[0_0_80px_rgba(99,102,241,0.12)] md:p-20">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
              >
                <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--brand-accent)]/10 blur-[80px]" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                {t("cta.eyebrow")}
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-[var(--foreground)] text-balance md:text-5xl">
                {t("cta.heading")}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[var(--muted-foreground)] leading-relaxed">
                {t("cta.subtext")}
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--brand-accent-fg)] shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
                >
                  {t("cta.button_primary")}
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
                >
                  {BRAND.email}
                </a>
              </div>

              {/* Social links */}
              <div className="mt-10 flex items-center justify-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--muted-foreground)] transition-colors duration-200 hover:border-[var(--brand-accent)]/40 hover:text-[var(--brand-accent)]"
                  >
                    <SocialIcon platform={social.platform} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}