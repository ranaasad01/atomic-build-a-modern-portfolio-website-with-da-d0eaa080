import type { Metadata } from "next";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: {
    default: "Alex Rivera — Full-Stack Developer",
    template: "%s | Alex Rivera",
  },
  description:
    "Full-Stack Developer crafting high-performance web products at the intersection of clean code and thoughtful design. Available for freelance and full-time roles.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Alex Rivera" }],
  creator: "Alex Rivera",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Alex Rivera — Full-Stack Developer",
    description:
      "Crafting digital experiences that leave a mark. Full-Stack Developer specializing in React, Next.js, and TypeScript.",
    siteName: "Alex Rivera Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Rivera — Full-Stack Developer",
    description:
      "Crafting digital experiences that leave a mark. Full-Stack Developer specializing in React, Next.js, and TypeScript.",
    creator: "@alexmorgandev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}