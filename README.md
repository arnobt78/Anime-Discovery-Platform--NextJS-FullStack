# Anime Vault | Anime Listing Platform - Next.js Server-Side Rendered FullStack Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)
[![Shikimori API](https://img.shields.io/badge/Shikimori-API-blue)](https://shikimori.one/api/doc)

A modern, fully server-rendered anime listing and browsing platform built with **Next.js App Router**. Discover and explore anime with infinite scroll, beautiful animations, and real-time data from the Shikimori API. This project is designed for learning and instruction—demonstrating Server Components, Server Actions, infinite scroll, and SEO best practices in a single codebase.

**Live Demo:** [https://anime-lover.vercel.app/](https://anime-lover.vercel.app/)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables & .env](#-environment-variables--env)
- [How to Run](#-how-to-run)
- [Routes & Pages](#-routes--pages)
- [Project Walkthrough & Data Flow](#-project-walkthrough--data-flow)
- [Components Documentation](#-components-documentation)
- [API Integration & Backend](#-api-integration--backend)
- [Key Functionalities](#-key-functionalities)
- [Code Examples](#-code-examples)
- [Reusing Components in Other Projects](#-reusing-components-in-other-projects)
- [Deployment](#-deployment)
- [Keywords](#-keywords)
- [Conclusion](#-conclusion)
- [License](#license)

---

## 🎯 Project Overview

**Anime Vault** is a production-ready anime discovery platform that demonstrates modern web development practices using **Next.js 14 App Router**. It is intended for **educational use**—teaching Server Components, Client Components, Server Actions, infinite scroll, and SEO-friendly metadata in one place.

**What this project showcases:**

- **Server-Side Rendering (SSR)** — Initial HTML is rendered on the server for fast loads and better SEO.
- **Server Actions** — Server-side functions called from the client without separate API routes.
- **Infinite Scroll** — More anime load as you scroll, using the Intersection Observer API.
- **Framer Motion** — Staggered card animations for a polished UI.
- **TypeScript** — Full type safety across the codebase.
- **Tailwind CSS** — Utility-first, responsive styling.

No backend database or custom API is required; data comes from the public **Shikimori API**. The app is suitable for beginners learning Next.js 14 and for developers reusing its patterns in other projects.

---

## ✨ Features

### Core Features

- 🎨 **Modern UI/UX** — Dark-themed interface with smooth animations and gradient accents.
- 🔄 **Infinite Scroll** — Automatic loading of more anime as you reach the bottom.
- 🚀 **Server-Side Rendering** — Fast first paint and SEO-friendly HTML.
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile.
- 🎭 **Framer Motion Animations** — Staggered card entrance animations.
- 🔍 **Real-Time Data** — Live anime data from Shikimori API (popularity order).
- ⚡ **Optimized Images** — Next.js `Image` with optimization and lazy loading.
- 🎯 **TypeScript** — Type-safe props and API data.
- 📊 **SEO Optimized** — Metadata, Open Graph, Twitter cards, and a web manifest.

### Technical Features

- Next.js 14 App Router (single route: home).
- Server Actions for fetching anime (no `/api` routes).
- Client Components only where needed (e.g. `LoadMore` for scroll and state).
- Intersection Observer for scroll-based loading.
- Font optimization (DM Sans via Next.js font system).
- PWA-ready manifest and theme color.

---

## 🛠 Technology Stack

### Core Technologies

| Technology       | Version | Purpose                                              |
| ---------------- | ------- | ---------------------------------------------------- |
| **Next.js**      | 14.2.35 | React framework with App Router, SSR, Server Actions |
| **React**        | 18      | UI library and component model                       |
| **TypeScript**   | 5       | Static typing and better DX                          |
| **Tailwind CSS** | 3.3     | Utility-first CSS and responsive design              |

### Key Libraries

- **framer-motion** (^10.16.5) — Declarative animations (e.g. opacity, stagger). Used in `AnimeCard` and via the `Motion` wrapper.
- **react-intersection-observer** (^9.5.3) — `useInView` hook to detect when the “load more” trigger enters the viewport.

### Development Tools

- **ESLint** + **eslint-config-next** — Linting and Next.js rules (`npm run lint`).
- **PostCSS** + **Autoprefixer** — CSS processing and vendor prefixes for Tailwind.

### External API

- **Shikimori API** — Public REST API for anime data. No API key required. [Documentation](https://shikimori.one/api/doc).

---

## 📁 Project Structure

```bash
anime-vault/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx          # Root layout, metadata, Hero, Footer
│   ├── page.tsx            # Home page (Server Component)
│   ├── action.tsx          # Server Actions (fetchAnime)
│   ├── globals.css         # Tailwind + global styles
│   ├── _data.ts            # Optional static data (not used in production flow)
│   └── favicon.ico         # Site favicon
│
├── components/
│   ├── AnimeCard.tsx       # Single anime card (image, title, type, episodes, score)
│   ├── LoadMore.tsx        # Infinite scroll trigger and grid for new cards
│   ├── Hero.tsx            # Top hero section with logo and heading
│   ├── Footer.tsx          # Footer with copyright and social icons
│   └── Motion.tsx          # Framer Motion div wrapper
│
├── public/
│   ├── anime.png           # Hero/OG image
│   ├── hero.png            # Hero background (Tailwind bg-hero)
│   ├── logo.svg            # Site logo
│   ├── favicon.ico         # (also in app/) — icons
│   ├── site.webmanifest    # PWA manifest
│   ├── spinner.svg         # Loading spinner
│   ├── episodes.svg        # Episodes icon
│   ├── star.svg            # Rating icon
│   └── [twitter, instagram, tiktok].svg  # Social icons
│
├── next.config.js          # Next config (e.g. images.remotePatterns)
├── tailwind.config.ts      # Tailwind theme (e.g. hero background)
├── tsconfig.json           # TypeScript config
├── postcss.config.js       # PostCSS for Tailwind
└── package.json            # Scripts and dependencies
```

**Important files:**

- **`app/layout.tsx`** — Wraps all pages; defines metadata, viewport, fonts, and global layout (Hero + children + Footer).
- **`app/page.tsx`** — Home: fetches first page of anime on the server and renders the grid + `LoadMore`.
- **`app/action.tsx`** — Defines the `fetchAnime(page)` Server Action used by the home page and `LoadMore`.
- **`components/AnimeCard.tsx`** — Renders one anime; uses `MotionDiv` and Next.js `Image`.
- **`components/LoadMore.tsx`** — Client component: `useInView` + `fetchAnime` for infinite scroll.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later.
- **npm**, **yarn**, or **pnpm**.

### Installation

```bash
git clone https://github.com/yourusername/anime-vault.git
cd anime-vault
npm install
```

Then run the app (see [How to Run](#-how-to-run)). **No environment variables are required** to run the project; the Shikimori API is public and used without authentication.

---

## 🔐 Environment Variables & .env

**You do not need any environment variables to run this project.** The Shikimori API is public and does not require an API key. The app works out of the box after `npm install` and `npm run dev`.

**Optional:** If you later add features that need configuration (e.g. a custom API base URL or analytics), you can use a `.env.local` file:

1. Create `.env.local` in the project root (do not commit it).
2. Add variables. Use the `NEXT_PUBLIC_` prefix only for values that must be available in the browser.

Example (optional, not required for current features):

```env
# Optional: override API base (current code uses hardcoded Shikimori URL)
# NEXT_PUBLIC_API_URL=https://shikimori.one/api
```

1. Access in code:
   - **Server (Server Components, Server Actions):** `process.env.NEXT_PUBLIC_API_URL`
   - **Client:** same; only `NEXT_PUBLIC_*` is exposed to the client.

**Summary:** No `.env` is required. If you add one for optional settings, keep secrets server-side and document any new variables in this README.

---

## 🏃 How to Run

### Development

```bash
npm run dev
```

Starts the dev server at [http://localhost:3000](http://localhost:3000) with hot reload.

### Production Build

```bash
npm run build
npm start
```

Builds and runs the app in production mode.

### Linting

```bash
npm run lint
```

Runs ESLint (Next.js config) to check code quality.

---

## 🛤 Routes & Pages

This app uses the **App Router** with a single route:

| Route | File           | Description                        |
| ----- | -------------- | ---------------------------------- |
| `/`   | `app/page.tsx` | Home: anime grid + infinite scroll |

There are no API routes under `app/api/`. Data fetching is done via the **Server Action** `fetchAnime` in `app/action.tsx`, called from the server in `page.tsx` and from the client in `LoadMore.tsx`.

---

## 📚 Project Walkthrough & Data Flow

### Architecture

1. **Server Components (default)** — `layout.tsx`, `page.tsx`, `Hero`, `Footer`, `AnimeCard` (when rendered from server). No `"use client"`.
2. **Client Components** — `LoadMore.tsx` and `Motion.tsx` use `"use client"` for hooks and browser APIs.
3. **Server Actions** — `fetchAnime` in `action.tsx` runs on the server and can be called from the client.

### Request Flow

```bash
User visits /
    → layout.tsx wraps page with Hero + Footer
    → page.tsx (Server Component) runs on server
    → fetchAnime(1) runs on server → Shikimori API
    → First 8 anime cards rendered as HTML
    → HTML sent to browser
    → LoadMore hydrates (client)
    → User scrolls → useInView sees trigger
    → fetchAnime(2), fetchAnime(3), … called from client (still run on server)
    → New cards appended to the list
```

### Why This Matters for Learning

- **Server Components** reduce client JS and improve first load.
- **Server Actions** replace the need for `/api` routes for this use case.
- **Infinite scroll** is implemented with a single Client Component and one Server Action.

---

## 🧩 Components Documentation

### 1. AnimeCard

**File:** `components/AnimeCard.tsx`  
**Type:** Server Component (no `"use client"`).

**Purpose:** Renders one anime: poster image, name, kind (TV/Movie/OVA), episodes, and score.

**Props:**

```ts
interface Prop {
  anime: AnimeProp; // { id, name, image, kind, episodes, episodes_aired, score }
  index: number; // Used for stagger delay (index * 0.25s)
}
```

**Behavior:** Uses `MotionDiv` for fade-in and optional viewport trigger. Images from Shikimori use `https://shikimori.one${anime.image.original}`. Next.js `Image` with `fill` for responsive sizing.

**Usage:**

```tsx
import AnimeCard from "@/components/AnimeCard";

<AnimeCard anime={animeData} index={0} />;
```

---

### 2. LoadMore

**File:** `components/LoadMore.tsx`  
**Type:** Client Component (`"use client"`).

**Purpose:** Renders an extra grid of anime cards and a “trigger” div. When the trigger enters the viewport, it fetches the next page and appends new cards.

**Behavior:** Uses `useInView` from `react-intersection-observer`. On `inView`, calls `fetchAnime(page)` (Server Action). Keeps a module-level `page` (starts at 2). Shows a spinner while loading. Uses a short delay (500 ms) before requesting to avoid rapid repeated calls.

**Usage:** Place once below the initial anime grid (as in `app/page.tsx`):

```tsx
<LoadMore />
```

---

### 3. Hero

**File:** `components/Hero.tsx`  
**Type:** Server Component.

**Purpose:** Top section: logo, headline (“Explore The Diverse Realms of Anime Magic”), and hero image. Uses Tailwind `bg-hero` (from `tailwind.config.ts`) for background.

**Usage:** Rendered in `app/layout.tsx` above `{children}`.

---

### 4. Footer

**File:** `components/Footer.tsx`  
**Type:** Server Component.

**Purpose:** Footer with copyright text, logo, and social icons (Twitter, Instagram, TikTok).

**Usage:** Rendered in `app/layout.tsx` below `{children}`.

---

### 5. Motion (MotionDiv)

**File:** `components/Motion.tsx`  
**Type:** Client Component (`"use client"`).

**Purpose:** Re-exports `motion.div` from Framer Motion so the rest of the app can use animations without importing Framer in every file.

**Usage:**

```tsx
import { MotionDiv } from "@/components/Motion";

<MotionDiv
  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
  initial="hidden"
  animate="visible"
  transition={{ delay: 0.25 }}
>
  Content
</MotionDiv>;
```

---

## 🔌 API Integration & Backend

### Shikimori API

- **Base URL:** `https://shikimori.one/api`
- **Endpoint used:** `GET /animes?page={page}&limit=8&order=popularity`
- **Auth:** None. Public API.

**Parameters:**

| Param   | Value      | Description        |
| ------- | ---------- | ------------------ |
| `page`  | 1, 2, …    | Page number        |
| `limit` | 8          | Items per page     |
| `order` | popularity | Sort by popularity |

**Response:** Array of anime objects. Relevant fields: `id`, `name`, `image.original`, `kind`, `episodes`, `episodes_aired`, `score`.

**Where it’s used:** Only in `app/action.tsx` inside the `fetchAnime` Server Action. There is no separate backend; Next.js server runs the Server Action and talks to Shikimori.

### Example: Using the same endpoint elsewhere

```ts
const res = await fetch(
  "https://shikimori.one/api/animes?page=1&limit=8&order=popularity",
);
const animes = await res.json();
```

---

## 🎯 Key Functionalities

### 1. Server-Side Rendering (SSR)

The home page is a Server Component. `fetchAnime(1)` runs on the server; the first 8 anime are rendered to HTML and sent to the client. Benefits: smaller client bundle, better SEO, fast first paint.

### 2. Server Actions

`"use server"` in `action.tsx` makes `fetchAnime` a Server Action. It can be called from the client (e.g. `LoadMore`) without defining a route. Arguments and return values are serialized automatically.

### 3. Infinite Scroll

`LoadMore` uses `useInView` to detect when a trigger element is visible, then calls `fetchAnime(page)` and appends the returned React elements to local state. The same grid layout is used for initial (server) and loaded (client) cards.

### 4. Framer Motion

`AnimeCard` uses `MotionDiv` with simple opacity variants and a stagger delay based on `index`. Animations run when the component mounts (and optionally when in view, depending on `viewport` props).

### 5. Image Optimization

Next.js `Image` is used for poster images (Shikimori URLs) and local assets (icons, logo). `next.config.js` uses `images.remotePatterns` so Shikimori’s domain is allowed. Images are optimized and lazy-loaded by Next.js.

---

## 💻 Code Examples

### Calling a Server Action from a Client Component

```tsx
"use client";

import { fetchAnime } from "@/app/action";

export function MyLoader() {
  const [cards, setCards] = useState([]);

  const load = async () => {
    const next = await fetchAnime(2);
    setCards((prev) => [...prev, ...next]);
  };

  return <button onClick={load}>Load more</button>;
}
```

### Using the AnimeProp type

```ts
import type { AnimeProp } from "@/components/AnimeCard";

const anime: AnimeProp = {
  id: "1",
  name: "Naruto",
  image: { original: "/system/animes/original/1.jpg" },
  kind: "TV",
  episodes: 220,
  episodes_aired: 220,
  score: "8.3",
};
```

### Adding a simple static page

Create `app/about/page.tsx`:

```tsx
export default function About() {
  return (
    <div className="p-8 text-white">
      <h1>About Anime Vault</h1>
      <p>Learning project for Next.js 14 App Router.</p>
    </div>
  );
}
```

The page is available at `/about`. Layout (Hero + Footer) is shared automatically.

---

## 🔄 Reusing Components in Other Projects

### AnimeCard

1. Copy `AnimeCard.tsx` and `Motion.tsx`.
2. Install: `framer-motion`, `next`.
3. Adjust the `AnimeProp` interface to match your data (e.g. different field names or image structure).
4. Update image `src` if you use another API (e.g. full URL instead of `https://shikimori.one${...}`).
5. Reuse: `<AnimeCard anime={item} index={i} />`.

### LoadMore

1. Copy `LoadMore.tsx`.
2. Install: `react-intersection-observer`.
3. Replace `fetchAnime` with your own Server Action or async function that returns an array of React nodes (or items you map to cards).
4. Adjust the grid classes and loading UI to match your layout.
5. Ensure the parent passes or shares page state if you need a single source of truth.

### Hero / Footer

Copy the component files and any assets they reference (e.g. `logo.svg`, `hero.png`). Update text, links, and images to fit your project. Both are Server Components and need no extra dependencies beyond Next.js and Tailwind.

### Motion

Use `Motion.tsx` anywhere you need Framer Motion’s `motion.div` with a consistent import path. You can add `motion.section`, `motion.span`, etc. in the same file and re-export them.

---

## 🚀 Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. In Vercel, import the repo and deploy. Use default Next.js settings (build: `next build`, output: default).
3. No env vars are required for the current Shikimori-based flow.

### Other platforms

Run `npm run build` and then `npm start`. Set the Node version to 18+ if the platform allows. Static export is not used; the app uses Server Components and Server Actions and needs a Node server.

---

## 🏷 Keywords

Anime, anime list, anime browser, anime database, Anime Vault, Japanese animation, anime discovery, anime ratings, Shikimori, Next.js 14, React 18, TypeScript, Server Components, Client Components, Server Actions, App Router, infinite scroll, Framer Motion, Tailwind CSS, SSR, SEO, responsive design, learning project, open source.

---

## 🎓 Conclusion

**Anime Vault** is a small but complete example of a Next.js 14 App Router app: Server Components for the main UI, one Server Action for data, and a single Client Component for infinite scroll. It uses the public Shikimori API and requires no environment variables, so it’s easy to clone and run for learning or as a base for your own anime or listing projects.

**Takeaways:**

- Server Components reduce client JS and improve performance and SEO.
- Server Actions can replace custom API routes for many data-fetching needs.
- Infinite scroll can be implemented with one Client Component and the Intersection Observer.
- TypeScript and Tailwind help keep the codebase maintainable and consistent.

**Possible next steps:** Detail pages per anime, search/filters, favorites (e.g. localStorage or a backend), dark/light theme toggle, or switching to another data source while keeping the same patterns.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend it further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
