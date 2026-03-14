// =============================================================================
// SERVER ACTIONS (app/action.tsx)
// =============================================================================
"use server";

import AnimeCard from "@/components/AnimeCard";
import type { AnimeFilters, AnimeProp } from "@/types/anime";
import { fetchAnimeListGraphQL } from "@/lib/shikimori-graphql";

/**
 * Server Action: Fetches anime list from Shikimori GraphQL API with optional search/filters.
 * @param page - Page number for pagination
 * @param filters - Optional search, kind, score, genre, status, order
 */
export async function fetchAnime(
  page: number,
  filters?: AnimeFilters | null
): Promise<JSX.Element[]> {
  const list = await fetchAnimeListGraphQL(page, filters);
  return list.map((anime: AnimeProp, index: number) => (
    <AnimeCard key={anime.id} anime={anime} index={index} />
  ));
}
