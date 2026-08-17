export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  featured?: boolean;
  category?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  handle: string;
}

export const BRAND = {
  name: "Alex Rivera",
  tagline: "Full-Stack Developer",
  email: "hello@alexrivera.dev",
  location: "San Francisco, CA",
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "About", href: "/about", key: "about" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "Contact", href: "/contact", key: "contact" },
];

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    platform: "GitHub",
    url: "https://github.com/alexmorgandev",
    handle: "github.com/alexmorgan",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/alexmorgandev",
    handle: "linkedin.com/in/alexmorgandev",
  },
  {
    id: "twitter",
    platform: "Twitter",
    url: "https://twitter.com/alexmorgandev",
    handle: "@alexmorgandev",
  },
  {
    id: "dribbble",
    platform: "Dribbble",
    url: "https://dribbble.com/alexmorgan",
    handle: "dribbble.com/alexmorgan",
  },
];
