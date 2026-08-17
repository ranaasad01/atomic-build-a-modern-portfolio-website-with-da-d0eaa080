"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, MapPin, Mail, Calendar, Briefcase } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    id: "exp-1",
    role: "Senior Full-Stack Engineer",
    company: "Vercel",
    period: "2022 – Present",
    description:
      "Lead development of Next.js-based infrastructure tooling used by over 300,000 developers. Architected a real-time deployment dashboard, reduced cold-start latency by 40%, and mentored a team of five engineers.",
    tags: ["Next.js", "TypeScript", "Go", "PostgreSQL"],
  },
  {
    id: "exp-2",
    role: "Full-Stack Developer",
    company: "Stripe",
    period: "2020 – 2022",
    description:
      "Built and maintained the Stripe Dashboard's analytics surface, shipping features used by millions of merchants. Collaborated cross-functionally with design and data science to deliver a redesigned revenue reporting module.",
    tags: ["React", "Ruby on Rails", "GraphQL", "Redis"],
  },
  {
    id: "exp-3",
    role: "Frontend Engineer",
    company: "Figma",
    period: "2018 – 2020",
    description:
      "Contributed to the core canvas rendering engine and plugin API. Shipped the first iteration of Figma's component properties panel and improved rendering performance by 25% through WebGL optimizations.",
    tags: ["TypeScript", "WebGL", "C++", "React"],
  },
  {
    id: "exp-4",
    role: "Junior Developer",
    company: "Freelance",
    period: "2016 – 2018",
    description:
      "Designed and built over 20 client websites and web applications across e-commerce, SaaS, and media verticals. Established strong foundations in responsive design, accessibility, and performance optimization.",
    tags: ["JavaScript", "PHP", "WordPress", "Sass"],
  },
];

const SKILL_CATEGORIES = [
  {
    id: "sk-1",
    category: "Frontend",
    icon: "◈",
    skills: [
      { name: "React / Next.js", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
      { name: "WebGL / Three.js", level: 3 },
    ],
  },
  {
    id: "sk-2",
    category: "Backend",
    icon: "◉",
    skills: [
      { name: "Node.js", level: 5 },
      { name: "Go", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "Redis", level: 4 },
      { name: "GraphQL", level: 4 },
    ],
  },
  {
    id: "sk-3",
    category: "Infrastructure",
    icon: "◎",
    skills: [
      { name: "AWS / GCP", level: 4 },
      { name: "Docker / K8s", level: 4 },
      { name: "CI/CD Pipelines", level: 5 },
      { name: "Terraform", level: 3 },
      { name: "Observability", level: 4 },
    ],
  },
  {
    id: "sk-4",
    category: "Design",
    icon: "◇",
    skills: [
      { name: "Figma", level: 5 },
      { name: "Design Systems", level: 5 },
      { name: "Motion Design", level: 4 },
      { name: "Accessibility", level: 5 },
      { name: "User Research", level: 3 },
    ],
  },
];

const MAX_SEGMENTS = 5;

// ─── Sub-components ──────────────────────────────────────────────────────────

function SegmentedBar({ level, max = MAX_SEGMENTS }: { level: number; max?: number }) {
  return (
    <div className="flex gap-1" aria-label={`Proficiency ${level} of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            i < level
              ? "bg-[var(--brand-accent)]"
              : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

const timelineConnector: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ── 1. Split-panel intro ─────────────────────────────────────────── */}
      <Reveal>
        <section className="relative overflow-hidden border-b border-white/8 py-24 md:py-32">
          {/* Subtle radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[600px] w-[600px] rounded-full bg-[var(--brand-accent)]/5 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">

              {/* Left: bio text */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="order-2 lg:order-1"
              >
                <motion.p
                  variants={fadeInUp}
                  className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]"
                >
                  {t("about.eyebrow")}
                </motion.p>

                <motion.h1
                  variants={fadeInUp}
                  className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
                >
                  {t("about.heading")}
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="mb-5 text-lg leading-relaxed text-white/70"
                >
                  {t("about.bio1")}
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="mb-8 text-lg leading-relaxed text-white/70"
                >
                  {t("about.bio2")}
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4 text-sm text-white/50"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                    {BRAND.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                    {BRAND.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                    {t("about.availability")}
                  </span>
                </motion.div>
              </motion.div>

              {/* Right: avatar */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="order-1 flex justify-center lg:order-2 lg:justify-end"
              >
                <div className="relative">
                  {/* Decorative ring */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-4 rounded-full border border-[var(--brand-accent)]/20"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -inset-8 rounded-full border border-white/5"
                  />

                  {/* Avatar image */}
                  <div className="relative h-64 w-64 overflow-hidden rounded-full border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)] md:h-80 md:w-80">
                    <img
                      src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/549e7208a14b4096a1630ae03ea75e6b.jpg"
                      alt={`${BRAND.name} portrait`}
                      className="h-full w-full object-cover"
                    />
                    {/* Subtle gradient overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-transparent"
                    />
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-full border border-white/10 bg-[var(--card)] px-4 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
                    <span className="text-xs font-medium text-white/80">{t("about.badge")}</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </Reveal>

      {/* ── 2. Work experience timeline ──────────────────────────────────── */}
      <Reveal>
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <div className="mb-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                {t("about.expEyebrow")}
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t("about.expHeading")}
              </h2>
            </div>

            <div className="relative">
              {/* Vertical connector line */}
              <motion.div
                variants={timelineConnector}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="absolute left-[11px] top-2 hidden h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-[var(--brand-accent)]/60 via-white/10 to-transparent md:block"
                aria-hidden="true"
              />

              <div className="space-y-12">
                {EXPERIENCES.map((exp, i) => (
                  <Reveal key={exp.id} delay={i * 0.08}>
                    <div className="relative flex gap-8">
                      {/* Timeline dot */}
                      <div className="relative hidden shrink-0 md:block">
                        <div className="mt-1.5 h-6 w-6 rounded-full border-2 border-[var(--brand-accent)] bg-[var(--background)] shadow-[0_0_12px_var(--brand-accent)] flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
                        </div>
                      </div>

                      {/* Content card */}
                      <div className="flex-1 rounded-2xl border border-white/8 bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[var(--brand-accent)]/30 hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.4)]">
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                            <p className="text-[var(--brand-accent)] font-medium">{exp.company}</p>
                          </div>
                          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {exp.period}
                          </span>
                        </div>

                        <p className="mb-4 leading-relaxed text-white/60">{exp.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[var(--brand-accent)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--brand-accent)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

          </div>
        </section>
      </Reveal>

      {/* ── 3. Skills grid ───────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-t border-white/8 bg-white/[0.02] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">

            <div className="mb-16 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                  {t("about.skillsEyebrow")}
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {t("about.skillsHeading")}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/50">
                {t("about.skillsSubtext")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {SKILL_CATEGORIES.map((cat, i) => (
                <Reveal key={cat.id} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="rounded-2xl border border-white/8 bg-[var(--card)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-[var(--brand-accent)]/25"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="text-2xl text-[var(--brand-accent)]" aria-hidden="true">
                        {cat.icon}
                      </span>
                      <h3 className="font-semibold text-white">{cat.category}</h3>
                    </div>

                    <div className="space-y-4">
                      {cat.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-sm text-white/70">{skill.name}</span>
                            <span className="text-xs text-white/30">{skill.level}/{MAX_SEGMENTS}</span>
                          </div>
                          <SegmentedBar level={skill.level} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>
      </Reveal>

      {/* ── 4. CTA strip ─────────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-t border-white/8 py-20 md:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
              {t("about.ctaEyebrow")}
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              {t("about.ctaHeading")}
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-white/60">
              {t("about.ctaSubtext")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--brand-accent-fg)] shadow-[0_4px_24px_var(--brand-accent-glow)] transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  {t("about.ctaBtn")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  {t("about.ctaSecondary")}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>

    </main>
  );
}