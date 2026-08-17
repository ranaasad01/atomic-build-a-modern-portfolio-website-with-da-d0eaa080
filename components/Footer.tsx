"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail } from 'lucide-react';
import { BRAND, navLinks } from "@/lib/data";

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={18} aria-hidden="true" />,
  linkedin: <Linkedin size={18} aria-hidden="true" />,
  twitter: <Twitter size={18} aria-hidden="true" />,
  mail: <Mail size={18} aria-hidden="true" />,
};

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const navT = t.raw("nav") as Record<string, string>;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const footerSocials = [
    {
      key: "github",
      label: "GitHub",
      url: "https://github.com/alexmorgandev",
      icon: socialIcons.github,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/alexmorgandev",
      icon: socialIcons.linkedin,
    },
    {
      key: "twitter",
      label: "Twitter",
      url: "https://twitter.com/alexmorgandev",
      icon: socialIcons.twitter,
    },
    {
      key: "mail",
      label: "Email",
      url: `mailto:${BRAND.email}`,
      icon: socialIcons.mail,
    },
  ];

  return (
    <footer
      className="border-t border-[var(--border)] bg-[var(--card)]"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block text-xl font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
            >
              <span className="text-[var(--primary)]">{"{"}</span>
              {BRAND.name.split(" ")[0]}
              <span className="text-[var(--primary)]">{"}"}</span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {footerSocials.map((social) => (
                <motion.a
                  key={social.key}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={social.label}
                  className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider">
              {t("footer.navHeading")}
            </h3>
            <ul className="space-y-2" role="list">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider">
              {t("footer.contactHeading")}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              {t("footer.contactBody")}
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              <Mail size={14} aria-hidden="true" />
              {BRAND.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}