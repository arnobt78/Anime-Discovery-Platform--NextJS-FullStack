"use client";

import { useSearchParams } from "next/navigation";
import type { AnimeFilters } from "@/types/anime";

/**
 * Returns current anime list filters from URL search params.
 * Use in client components that need filter values (e.g. to pass to LoadMore).
 */
export function useFiltersFromSearchParams(): AnimeFilters | null {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const kind = searchParams.get("kind");
  const score = searchParams.get("score");
  const genre = searchParams.get("genre");
  const status = searchParams.get("status");
  const order = searchParams.get("order");
  if (!search && !kind && !score && !genre && !status && !order)
    return null;
  return {
    search: search ?? undefined,
    kind: kind ?? undefined,
    score: score ?? undefined,
    genre: genre ?? undefined,
    status: status ?? undefined,
    order: order ?? "popularity",
  };
}

/**
 * Returns true if any filter (search, kind, score, etc.) is currently set.
 */
export function useHasActiveFilters(): boolean {
  const searchParams = useSearchParams();
  return (
    !!searchParams.get("search") ||
    !!searchParams.get("kind") ||
    !!searchParams.get("score") ||
    !!searchParams.get("genre") ||
    !!searchParams.get("status")
  );
}
