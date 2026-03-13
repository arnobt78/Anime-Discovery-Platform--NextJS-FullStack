// =============================================================================
// SERVER ACTIONS (app/action.tsx)
// =============================================================================
// "use server" = every exported async function runs on the server only.
// They can be called from Client Components (e.g. LoadMore) without creating API routes.
// Next.js serializes arguments and return values automatically.
// =============================================================================
"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

// Pagination: 8 anime per page. Must match Shikimori API limit param.
const MAX_LIMIT = 8;

/**
 * Server Action: Fetches anime data from Shikimori API
 * @param page - Page number for pagination
 * @returns Array of AnimeCard React components (JSX)
 * 
 * This function:
 * 1. Fetches data from external API on the server
 * 2. Transforms the data into React components
 * 3. Returns JSX that can be rendered directly
 * 
 * Benefits of Server Actions:
 * - Runs on server (no API route needed)
 * - Can be called from Client Components
 * - Automatically handles serialization
 * - Better security (API keys stay on server)
 */
export async function fetchAnime(page: number) {
  // Shikimori API: GET /animes. Public, no auth. order=popularity for trending list.
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=popularity`
  );

  const data = await response.json();

  // Return JSX (AnimeCard components), not raw JSON. Server Actions can return serializable
  // data or React Server Component payloads; here we return pre-rendered card elements.
  return data.map((anime: AnimeProp, index: number) => (
    <AnimeCard key={anime.id} anime={anime} index={index} />
  ));
}
