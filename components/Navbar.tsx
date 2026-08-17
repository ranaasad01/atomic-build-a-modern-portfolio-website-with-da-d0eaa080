"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { navLinks, BRAND } from "@/lib/data";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navT = t.raw("nav") as Record<string, string>;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-[var(--foreground)] font-bold text-lg tracking-tight hover:text-[var(--primary)] transition-colors duration-200 focus-visible:outline-[var(--primary)]"
          aria-label={`${BRAND.name} — home`}
        >
          <span className="text-[var(--primary)]">{"{"}</span>
          {BRAND.name.split(" ")[0]}
          <span className="text-[var(--primary)]">{"}"}</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.key}>
                <Link
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {navT[link.key] ?? link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-[var(--primary)]/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--primary)] text-white hover:bg-[var(--accent)] transition-all duration-200 shadow-[0_0_16px_rgba(168,85,247,0.3)] hover:shadow-[0_0_24px_rgba(217,70,239,0.4)]"
          >
            {t("nav.hire")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[var(--background)]/95 backdrop-blur-xl border-b border-[var(--border)]"
          >
            <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1" role="list">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.key}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-[var(--primary)] bg-[var(--primary)]/10"
                          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {navT[link.key] ?? link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="block px-4 py-3 rounded-xl text-sm font-semibold bg-[var(--primary)] text-white text-center hover:bg-[var(--accent)] transition-all duration-200"
                >
                  {t("nav.hire")}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}