# Anime Discovery Platform – Next.js, GraphQL & REST, Server-Side Rendering FullStack Project (with infinite scroll, server actions)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![Shikimori API](https://img.shields.io/badge/Shikimori-GraphQL%20%2B%20REST-blue)](https://shikimori.one/api/doc)

A modern, server-rendered anime discovery platform built with **Next.js 15 App Router**. Browse anime with infinite scroll, search and filters (kind, score, status, order), and click through to full detail pages. Data is fetched via **Shikimori GraphQL** for the list (and detail when available), with **REST fallback** for single-anime detail. Poster and screenshots open in a 90vh lightbox with download; video thumbnails and Lucide icons are used across the UI. No backend, database, or auth—ideal for learning Server Components, Server Actions, GraphQL, and SEO.

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

**Anime Vault** is a production-ready anime discovery platform built with **Next.js 15 App Router**. It is intended for **educational use**—teaching Server Components, Client Components, Server Actions, GraphQL, REST fallback, infinite scroll, and SEO in one codebase.

**What this project showcases:**

- **Server-Side Rendering (SSR)** — Initial HTML is rendered on the server for fast loads and better SEO.
- **Server Actions** — Server-side functions called from the client (e.g. `fetchAnime`) without custom API routes for data.
- **GraphQL + REST** — List and detail use Shikimori GraphQL; detail falls back to REST when GraphQL returns no data.
- **Infinite Scroll** — More anime load as you scroll via the Intersection Observer API.
- **Search & Filters** — Kind, score, status, order; state in URL for shareable links.
- **Detail Pages** — Per-anime route with poster, metadata, genres, studios, videos, screenshots, and lightbox + download.
- **Framer Motion & Lucide** — Staggered card animations and Lucide React icons for badges and actions.
- **TypeScript & Tailwind** — Full type safety and utility-first styling.

No backend database or auth; data comes from the public **Shikimori API**. Suitable for learning Next.js 15, GraphQL, and reusing patterns in other projects.

---

## ✨ Features

### Core Features

- 🎨 **Modern UI/UX** — Dark-themed interface with smooth animations and Lucide icons.
- 🏠 **Home** — Anime grid with infinite scroll, search bar, and filters (Kind, Score, Status, Order).
- 📄 **Detail Pages** — Full anime info: poster (clickable → 90vh lightbox + download), score, episodes, genres, studios, description, videos, screenshots (clickable → lightbox + download), next episode, external links.
- 🔄 **Infinite Scroll** — Automatic loading of more anime as you scroll; respects current filters.
- 🚀 **Server-Side Rendering** — Fast first paint and SEO-friendly HTML; dynamic metadata per anime.
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile.
- 🎭 **Framer Motion** — Staggered card animations on the home grid.
- 🔍 **Real-Time Data** — Shikimori GraphQL for list (and detail when supported); REST fallback for detail.
- ⚡ **Images** — Next.js `Image` where possible; poster/screenshots lightbox with download via API proxy.
- 📊 **SEO** — Metadata, Open Graph, Twitter cards, web manifest.

### Technical Features

- Next.js 15 App Router: `/` (home), `/anime/[id]` (detail), `/api/download-image` (image download proxy).
- Server Actions for list fetching; GraphQL in `lib/shikimori-graphql.ts`; REST fallback for single anime.
- Client Components: `LoadMore`, `SearchFilters`, `BackToTop`, `PosterLightbox`, `ScreenshotsGallery`, `Motion`.
- Filters and search reflected in URL; Back to top button after scroll.
- PWA-ready manifest and theme color.

---

## 🛠 Technology Stack

### Core Technologies

| Technology       | Version | Purpose                                     |
| ---------------- | ------- | ------------------------------------------- |
| **Next.js**      | 15      | App Router, SSR, Server Actions, API routes |
| **React**        | 18      | UI library and component model              |
| **TypeScript**   | 5       | Static typing and better DX                 |
| **Tailwind CSS** | 3       | Utility-first CSS and responsive design     |

### Key Libraries

- **framer-motion** — Declarative animations; used in `AnimeCard` via `Motion` wrapper.
- **react-intersection-observer** — `useInView` for infinite-scroll trigger.
- **lucide-react** — Icons for badges (kind, status, score, episodes), download, close, etc.

### Development Tools

- **ESLint** + **eslint-config-next** — Linting (`npm run lint`).
- **PostCSS** + **Autoprefixer** — Tailwind.

### External API

- **Shikimori** — GraphQL for list (and detail when supported); REST fallback for single-anime detail. No API key. [GraphQL](https://shikimori.one/api/doc/graphql) · [API](https://shikimori.one/api/doc).

---

## 📁 Project Structure

```bash
anime-vault/
├── app/
│   ├── layout.tsx              # Root layout, metadata, Hero, Footer, Providers
│   ├── page.tsx                # Home: grid, SearchFilters, LoadMore, BackToTop
│   ├── action.tsx              # Server Action fetchAnime (GraphQL list)
│   ├── providers.tsx           # Client providers wrapper
│   ├── globals.css             # Tailwind + global styles
│   ├── anime/[id]/
│   │   ├── page.tsx            # Detail page (GraphQL → REST fallback, PosterLightbox, ScreenshotsGallery)
│   │   ├── loading.tsx         # Skeleton while loading
│   │   └── not-found.tsx       # 404 for missing anime
│   └── api/download-image/
│       └── route.ts            # GET proxy for image download (same-origin)
│
├── components/
│   ├── AnimeCard.tsx           # Card with Lucide icons (kind, status, score, episodes)
│   ├── LoadMore.tsx            # Infinite scroll + fetchAnime with filters
│   ├── SearchFilters.tsx      # Search + Kind, Score, Status, Order dropdowns
│   ├── BackToTop.tsx           # Fixed button after scroll
│   ├── PosterLightbox.tsx      # Clickable poster → 90vh modal + download
│   ├── ScreenshotsGallery.tsx  # Clickable screenshots → modal + download
│   ├── Hero.tsx, Footer.tsx    # Header and footer
│   ├── Motion.tsx              # Framer Motion wrapper
│   └── ui/                     # Input, Select, Button
│
├── lib/
│   ├── api.ts                  # SHIKIMORI_BASE, ANIMES_API, GRAPHQL_ENDPOINT, MAX_ANIME_LIMIT
│   ├── shikimori-graphql.ts    # GraphQL client, list/detail queries, REST fallback
│   ├── filter-options.ts       # KIND_OPTIONS, STATUS_OPTIONS, SCORE_OPTIONS, ORDER_OPTIONS
│   └── download-image.ts       # downloadImage(url, filename) → API proxy
│
├── types/
│   └── anime.ts                # AnimeProp, AnimeFilters, AnimeDetail
│
├── hooks/
│   └── useFiltersFromSearchParams.ts
│
├── public/                     # Static assets (logo, icons, manifest, etc.)
├── next.config.js              # images.remotePatterns (shikimori, img.youtube, etc.)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Important files:**

- **`app/layout.tsx`** — Global metadata, viewport, fonts; Hero + children + Footer.
- **`app/page.tsx`** — Home: reads URL params → filters, fetches first page via GraphQL, renders grid + SearchFilters + LoadMore + BackToTop.
- **`app/action.tsx`** — `fetchAnime(page, filters)` Server Action; calls `fetchAnimeListGraphQL`.
- **`app/anime/[id]/page.tsx`** — Detail: `fetchAnimeByIdGraphQL` then `fetchAnimeByIdREST` fallback; poster lightbox, videos, screenshots gallery, Lucide badges.
- **`lib/shikimori-graphql.ts`** — GraphQL requests, list/detail normalization, REST fallback for detail.
- **`components/AnimeCard.tsx`** — Single card (Lucide icons); links to `/anime/[id]`.
- **`components/LoadMore.tsx`** — Client: `useInView` + `fetchAnime(page, filters)`.

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

| Route                 | File                              | Description                                                                               |
| --------------------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| `/`                   | `app/page.tsx`                    | Home: search, filters, anime grid, infinite scroll, Back to top                           |
| `/anime/[id]`         | `app/anime/[id]/page.tsx`         | Detail: poster (lightbox + download), metadata, videos, screenshots (lightbox + download) |
| `/api/download-image` | `app/api/download-image/route.ts` | GET proxy for image download (allowed hosts: shikimori, img.youtube)                      |

List data is fetched via the **Server Action** `fetchAnime` in `app/action.tsx` (GraphQL). Detail data is fetched in `app/anime/[id]/page.tsx` (GraphQL with REST fallback).

---

## 📚 Project Walkthrough & Data Flow

### Architecture

1. **Server Components (default)** — `layout.tsx`, `page.tsx`, `Hero`, `Footer`, `AnimeCard` (when rendered from server). No `"use client"`.
2. **Client Components** — `LoadMore.tsx` and `Motion.tsx` use `"use client"` for hooks and browser APIs.
3. **Server Actions** — `fetchAnime` in `action.tsx` runs on the server and can be called from the client.

### Request Flow

**Home:** User visits `/` (optionally with `?search=...&kind=...&status=...&order=...`) → `page.tsx` reads params → `fetchAnime(1, filters)` (GraphQL list) → first 8 cards rendered → HTML sent → LoadMore and SearchFilters hydrate → scroll triggers `fetchAnime(2, filters)`, etc.

**Detail:** User clicks a card → `/anime/[id]` → `fetchAnimeByIdGraphQL(id)`; if empty, `fetchAnimeByIdREST(id)` → poster, metadata, videos, screenshots, links rendered. Poster and screenshots open in lightbox with download via `/api/download-image`.

### Why This Matters for Learning

- **Server Components** reduce client JS and improve first load.
- **Server Actions** replace the need for `/api` routes for this use case.
- **Infinite scroll** is implemented with a single Client Component and one Server Action.

---

## 🧩 Components Documentation

### 1. AnimeCard

**File:** `components/AnimeCard.tsx`  
**Type:** Client (uses `MotionDiv`; card is a `Link` to `/anime/[id]`).

**Purpose:** Renders one anime: poster, name, status + kind badges (Lucide), up to 2 genres, episodes (Clapperboard), score (Star).

**Props:** `anime: AnimeProp`, `index: number`. `AnimeProp` includes optional `genres`, `status`, `rating` from GraphQL.

**Behavior:** `MotionDiv` for fade-in; `image.original` is already a full URL from GraphQL mapping. Lucide icons: `Tv`/`Clapperboard` for kind, `PlayCircle`/`CalendarCheck` for status, `Star`, `Clapperboard` for score/episodes.

**Usage:** Rendered by `fetchAnime` in `action.tsx`; each card links to `/anime/${anime.id}`.

---

### 2. LoadMore

**File:** `components/LoadMore.tsx`  
**Type:** Client Component (`"use client"`).

**Purpose:** Renders an extra grid of anime cards and a “trigger” div. When the trigger enters the viewport, it fetches the next page and appends new cards.

**Behavior:** Uses `useInView` from `react-intersection-observer`. On `inView`, calls `fetchAnime(page)` (Server Action). Keeps a module-level `page` (starts at 2). Shows a spinner while loading. Uses a short delay (500 ms) before requesting to avoid rapid repeated calls.

**Usage:** In `app/page.tsx`, below the grid; pass `key={JSON.stringify(filters)}` and `initialFilters={filters}` so pagination resets when filters change.

```tsx
<LoadMore
  key={JSON.stringify(filters ?? {})}
  initialFilters={filters ?? undefined}
/>
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

### 5. SearchFilters

**File:** `components/SearchFilters.tsx`  
**Type:** Client Component.

**Purpose:** Search input + Kind, Score, Status, Order dropdowns; updates URL search params so the home page and LoadMore use the same filters. “Clear filters” resets to `/`.

---

### 6. BackToTop

**File:** `components/BackToTop.tsx`  
**Type:** Client Component.

**Purpose:** Fixed bottom-right “Back to top” button; visible after scrolling ~400px; smooth scroll to top. Rendered once on the home page.

---

### 7. PosterLightbox

**File:** `components/PosterLightbox.tsx`  
**Type:** Client Component.

**Purpose:** Clickable poster on the detail page; opens a 90vh modal with the image and Download / Close (Lucide). Download uses `downloadImage()` → API proxy so the file is saved. Escape or click outside to close.

---

### 8. ScreenshotsGallery

**File:** `components/ScreenshotsGallery.tsx`  
**Type:** Client Component.

**Purpose:** Grid of clickable screenshot thumbnails; clicking opens a 90vh modal with the image and Download / Close. Same download behavior as PosterLightbox.

---

### 9. Motion (MotionDiv)

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

### Shikimori GraphQL API

This project uses **Shikimori’s GraphQL API** for list and detail data (single endpoint, request only the fields you need). Queries, variables, and response handling live in **`lib/shikimori-graphql.ts`**—see that file for the full list/detail queries and how variables map to filters (search, kind, score, status, order). You can try queries in the [Shikimori GraphQL playground](https://shikimori.one/api/doc/graphql).

- **Endpoint:** `POST https://shikimori.one/api/graphql`
- **Auth:** None. Public API. Optional `User-Agent` (e.g. `AnimeVault/1.0`) is sent.

**Where it’s used:**

- **List:** `app/action.tsx` → `fetchAnimeListGraphQL(page, filters)` → renders `<AnimeCard />` for each item.
- **Detail:** `app/anime/[id]/page.tsx` → `fetchAnimeByIdGraphQL(id)` first; if that returns nothing, **REST fallback** `fetchAnimeByIdREST(id)` (GET `https://shikimori.one/api/animes/:id`). Detail page shows poster, metadata, genres, studios, description, videos (thumbnails unoptimized for any host), screenshots, next episode, external links.

**Image download:** For poster and screenshot lightboxes, the Download button uses `/api/download-image?url=...&filename=...` so the browser gets a same-origin response with `Content-Disposition: attachment` and saves the file instead of opening in a new tab. Allowed hosts: `shikimori.one`, `shikimori.io`, `img.youtube.com`.

There is no separate backend; the Next.js server runs Server Actions, the detail page, and the download-image API route.

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

### 5. Image Optimization and Download

Next.js `Image` is used for posters and screenshots; `next.config.js` `images.remotePatterns` allows Shikimori and img.youtube (http/https). Video thumbnails use `unoptimized` so any host (e.g. video.sibnet.ru) works without adding every domain. Poster and screenshot downloads go through `/api/download-image` so the response is same-origin and the browser saves the file instead of opening in a new tab.

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
  image: { original: "https://shikimori.io/.../1.jpg" }, // full URL from GraphQL mapping
  kind: "TV",
  episodes: 220,
  episodes_aired: 220,
  score: "8.3",
  genres: [{ id: 1, name: "Adventure" }], // optional
  status: "released", // optional
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

Anime, anime list, anime browser, anime database, Anime Vault, Japanese animation, anime discovery, anime ratings, Shikimori, Next.js 15, React 18, TypeScript, Server Components, Client Components, Server Actions, App Router, infinite scroll, Framer Motion, Tailwind CSS, SSR, SEO, responsive design, learning project, open source.

---

## 🎓 Conclusion

**Anime Vault** is a full example of a Next.js 15 App Router app: Server Components for layout and pages, Server Actions for list data, GraphQL + REST for Shikimori, and Client Components for filters, infinite scroll, lightboxes, and Back to top. No env vars are required; the Shikimori API is public.

**Takeaways:**

- Server Components reduce client JS and improve SEO; detail pages use dynamic metadata per anime.
- Server Actions power list fetching; GraphQL is used for list and detail with REST fallback when GraphQL returns no detail.
- Infinite scroll plus URL-based filters (search, kind, score, status, order) keep state shareable.
- Image download for cross-origin URLs can be handled with a same-origin API proxy and `Content-Disposition: attachment`.
- Lucide React and Framer Motion keep the UI consistent and animated.

**Possible next steps:** Favorites (e.g. localStorage), dark/light theme, or another data source while reusing the same patterns.

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
