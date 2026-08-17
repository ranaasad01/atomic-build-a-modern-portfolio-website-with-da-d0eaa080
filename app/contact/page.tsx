"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Send, CheckCircle, AlertCircle, User, MessageSquare, FileText } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND, socialLinks } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline types ─────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// ─── Social icon map ──────────────────────────────────────────────────────────
const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  GitHub: <Github className="h-5 w-5" aria-hidden="true" />,
  LinkedIn: <Linkedin className="h-5 w-5" aria-hidden="true" />,
  Twitter: <Twitter className="h-5 w-5" aria-hidden="true" />,
  Dribbble: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
    </svg>
  ),
};

// ─── FormInput component ──────────────────────────────────────────────────────
interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

function FormInput({ id, label, type = "text", value, onChange, error, placeholder, icon }: FormInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]/80">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/40 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={[
            "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/30",
            "transition-all duration-200 outline-none",
            icon ? "pl-10" : "",
            focused
              ? "border-[var(--brand-accent)] ring-2 ring-[var(--brand-accent)]/20"
              : error
              ? "border-red-500/60 ring-2 ring-red-500/10"
              : "border-white/10 hover:border-white/20",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── FormTextarea component ───────────────────────────────────────────────────
interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
}

function FormTextarea({ id, label, value, onChange, error, placeholder, rows = 5 }: FormTextareaProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]/80">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        rows={rows}
        className={[
          "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/30",
          "transition-all duration-200 outline-none resize-none",
          focused
            ? "border-[var(--brand-accent)] ring-2 ring-[var(--brand-accent)]/20"
            : error
            ? "border-red-500/60 ring-2 ring-red-500/10"
            : "border-white/10 hover:border-white/20",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const t = useTranslations();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const setField = (field: keyof FormState) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = t("contact.form.errors.nameRequired");
    else if (form.name.trim().length < 2) newErrors.name = t("contact.form.errors.nameTooShort");

    if (!form.email.trim()) newErrors.email = t("contact.form.errors.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = t("contact.form.errors.emailInvalid");

    if (!form.subject.trim()) newErrors.subject = t("contact.form.errors.subjectRequired");

    if (!form.message.trim()) newErrors.message = t("contact.form.errors.messageRequired");
    else if (form.message.trim().length < 20)
      newErrors.message = t("contact.form.errors.messageTooShort");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((res) => setTimeout(res, 1800));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const socialIconColors: Record<string, string> = {
    GitHub: "from-slate-700 to-slate-900",
    LinkedIn: "from-blue-600 to-blue-800",
    Twitter: "from-sky-500 to-sky-700",
    Dribbble: "from-pink-500 to-pink-700",
  };

  return (
    <main className="min-h-screen bg-[var(--background)] pt-28 pb-20">
      {/* ── Hero heading ── */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 mb-20 text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-4 inline-block rounded-full border border-[var(--brand-accent)]/30 bg-[var(--brand-accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]"
          >
            {t("contact.eyebrow")}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.05] text-[var(--foreground)]"
          >
            {t("contact.heading.line1")}{" "}
            <span className="bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-muted)] bg-clip-text text-transparent">
              {t("contact.heading.accent")}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl mx-auto text-lg text-[var(--foreground)]/60 leading-relaxed text-pretty"
          >
            {t("contact.subheading")}
          </motion.p>
        </section>
      </Reveal>

      {/* ── Two-column layout ── */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* ── Left: Contact form ── */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_2px_4px_rgba(0,0,0,0.12),0_16px_48px_-12px_rgba(0,0,0,0.4)]">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">
                {t("contact.form.heading")}
              </h2>
              <p className="text-sm text-[var(--foreground)]/50 mb-8">
                {t("contact.form.subheading")}
              </p>

              {status === "success" ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-accent)]/15 ring-2 ring-[var(--brand-accent)]/30">
                    <CheckCircle className="h-8 w-8 text-[var(--brand-accent)]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {t("contact.form.success.heading")}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/60 max-w-xs">
                    {t("contact.form.success.body")}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-[var(--foreground)]/70 hover:border-[var(--brand-accent)]/40 hover:text-[var(--brand-accent)] transition-all duration-200"
                  >
                    {t("contact.form.success.again")}
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput
                      id="name"
                      label={t("contact.form.nameLabel")}
                      value={form.name}
                      onChange={setField("name")}
                      error={errors.name}
                      placeholder={t("contact.form.namePlaceholder")}
                      icon={<User className="h-4 w-4" />}
                    />
                    <FormInput
                      id="email"
                      label={t("contact.form.emailLabel")}
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      error={errors.email}
                      placeholder={t("contact.form.emailPlaceholder")}
                      icon={<Mail className="h-4 w-4" />}
                    />
                  </div>
                  <FormInput
                    id="subject"
                    label={t("contact.form.subjectLabel")}
                    value={form.subject}
                    onChange={setField("subject")}
                    error={errors.subject}
                    placeholder={t("contact.form.subjectPlaceholder")}
                    icon={<FileText className="h-4 w-4" />}
                  />
                  <FormTextarea
                    id="message"
                    label={t("contact.form.messageLabel")}
                    value={form.message}
                    onChange={setField("message")}
                    error={errors.message}
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={6}
                  />

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                    className="mt-1 flex items-center justify-center gap-2.5 rounded-xl bg-[var(--brand-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--brand-accent-fg)] shadow-[0_4px_24px_-4px_var(--brand-accent)] transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        {t("contact.form.submitting")}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </Reveal>

          {/* ── Right: Social + availability ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Availability card */}
            <Reveal>
              <div className="rounded-2xl border border-[var(--brand-accent)]/20 bg-[var(--brand-accent)]/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-accent)] opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--brand-accent)]" />
                  </span>
                  <span className="text-sm font-semibold text-[var(--brand-accent)]">
                    {t("contact.availability.status")}
                  </span>
                </div>
                <p className="text-sm text-[var(--foreground)]/70 leading-relaxed">
                  {t("contact.availability.body")}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[var(--foreground)]/50">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{t("contact.availability.timezone")}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-[var(--foreground)]/50">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{BRAND.location}</span>
                </div>
              </div>
            </Reveal>

            {/* Direct email */}
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-widest mb-3">
                  {t("contact.directEmail.label")}
                </h3>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="group flex items-center gap-3 text-[var(--foreground)] hover:text-[var(--brand-accent)] transition-colors duration-200"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-accent)]/10 group-hover:bg-[var(--brand-accent)]/20 transition-colors duration-200">
                    <Mail className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium">{BRAND.email}</span>
                </a>
              </div>
            </Reveal>

            {/* Social links */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-sm font-semibold text-[var(--foreground)]/60 uppercase tracking-widest mb-4">
                  {t("contact.social.heading")}
                </h3>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col gap-3"
                >
                  {socialLinks.map((link, i) => (
                    <motion.li key={link.platform} variants={fadeInUp}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.platform} — ${link.handle}`}
                        className="group flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 hover:border-[var(--brand-accent)]/30 hover:bg-[var(--brand-accent)]/5 transition-all duration-200"
                      >
                        <div
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${
                            socialIconColors[link.platform] ?? "from-slate-600 to-slate-800"
                          } text-white shadow-sm`}
                        >
                          {SOCIAL_ICON_MAP[link.platform] ?? (
                            <MessageSquare className="h-5 w-5" aria-hidden="true" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-accent)] transition-colors duration-200">
                            {link.platform}
                          </p>
                          <p className="text-xs text-[var(--foreground)]/50 truncate">{link.handle}</p>
                        </div>
                        <svg
                          className="ml-auto h-4 w-4 flex-shrink-0 text-[var(--foreground)]/20 group-hover:text-[var(--brand-accent)]/60 transition-colors duration-200"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>

            {/* Response time note */}
            <Reveal delay={0.15}>
              <p className="text-xs text-[var(--foreground)]/40 text-center leading-relaxed px-2">
                {t("contact.responseNote")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Minimal footer strip ── */}
      <Reveal>
        <div className="mx-auto max-w-6xl px-6 mt-24">
          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--foreground)]/30">
              {t("contact.footerStrip.copy", { name: BRAND.name })}
            </p>
            <p className="text-xs text-[var(--foreground)]/30">
              {t("contact.footerStrip.tagline")}
            </p>
          </div>
        </div>
      </Reveal>
    </main>
  );
}