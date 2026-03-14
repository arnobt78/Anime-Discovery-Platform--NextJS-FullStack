// =============================================================================
// ROOT LAYOUT (app/layout.tsx)
// =============================================================================
// Next.js 15 App Router - Root Layout Component
// This file defines the root layout that wraps all pages in the application.
// Every page (e.g. page.tsx) is rendered as the {children} between Hero and Footer.
// This is a Server Component by default — no "use client" needed.
// =============================================================================
import type { Metadata, Viewport } from "next";
// Next.js font optimization - automatically optimizes and self-hosts Google Fonts
import { DM_Sans } from "next/font/google";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

import "./globals.css";

// Configure DM Sans font with Latin subset
// Next.js will automatically optimize this font and add it to the page
const dmSans = DM_Sans({ subsets: ["latin"] });

// Comprehensive SEO metadata configuration
// This metadata object is used by Next.js to generate <head> tags for SEO optimization
export const metadata: Metadata = {
  // Base URL for all relative URLs in metadata (Open Graph, Twitter cards, etc.)
  // Production demo: https://anime-lover.vercel.app
  metadataBase: new URL("https://anime-lover.vercel.app"),
  // Title configuration with template support (project name from README)
  // template: nested pages can set title "About" → becomes "About | Anime Vault"
  title: {
    default: "Anime Vault | Anime Discovery Platform",
    template: "%s | Anime Vault",
  },
  description:
    "Discover and explore your favorite anime with Anime Vault. A modern, fully server-rendered anime listing and browsing platform featuring infinite scroll, real-time data from Shikimori API, and beautiful animations. Browse popular anime, view ratings, episodes, and more.",
  // SEO keywords for search engine optimization
  keywords: [
    "anime",
    "anime list",
    "anime browser",
    "anime database",
    "anime vault",
    "japanese animation",
    "anime discovery",
    "anime ratings",
    "anime episodes",
    "shikimori",
    "anime API",
    "anime streaming",
    "anime catalog",
    "anime search",
    "popular anime",
    "anime recommendations",
    "Next.js",
    "React",
    "Server Actions",
  ],
  authors: [
    {
      name: "Arnob Mahmud",
      url: "https://www.arnobmahmud.com",
    },
  ],
  creator: "Arnob Mahmud",
  publisher: "Arnob Mahmud",
  applicationName: "Anime Vault",
  referrer: "origin-when-cross-origin",
  // Robots meta tags - controls how search engines crawl and index the site
  robots: {
    index: true, // Allow indexing
    follow: true, // Follow links
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1, // Unlimited video preview
      "max-image-preview": "large", // Large image previews
      "max-snippet": -1, // Unlimited text snippets
    },
  },
  // Open Graph metadata for rich social media previews (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anime-lover.vercel.app",
    siteName: "Anime Vault",
    title: "Anime Vault | Modern Anime Discovery Platform",
    description:
      "Discover and explore your favorite anime with Anime Vault. Browse popular anime, view ratings, episodes, and more with a modern, performant interface.",
    images: [
      {
        url: "/anime.png",
        width: 1200,
        height: 630,
        alt: "Anime Vault | Modern Anime Discovery Platform",
      },
    ],
  },
  // Twitter Card metadata for rich Twitter previews
  twitter: {
    card: "summary_large_image",
    title: "Anime Vault | Modern Anime Discovery Platform",
    description:
      "Discover and explore your favorite anime with Anime Vault. Browse popular anime, view ratings, episodes, and more.",
    images: ["/anime.png"],
    creator: "@arnobt78",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  category: "entertainment",
  classification: "Anime Discovery Platform",
  other: {
    "theme-color": "#0F1117",
    "color-scheme": "dark",
    "author-email": "contact@arnobmahmud.com",
  },
};

// Viewport configuration for responsive design and mobile optimization
export const viewport: Viewport = {
  width: "device-width", // Use device width for responsive layout
  initialScale: 1, // No initial zoom
  maximumScale: 5, // Allow zoom up to 5x for accessibility
  userScalable: true, // Allow user to zoom
  themeColor: "#0F1117", // Browser theme color (dark background)
  colorScheme: "dark", // Prefer dark mode
};

// Root Layout Component — wraps every page. Receives { children } from the router.
// Server-rendered on each request; no client JS for the layout itself.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply optimized font class to body. suppressHydrationWarning avoids mismatch from browser extensions. */}
      <body className={dmSans.className} suppressHydrationWarning>
        <Providers>
          <main className="max-w-7xl mx-auto bg-[#0F1117]">
            <Hero />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
