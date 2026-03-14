/**
 * Shared TypeScript types for anime data (Shikimori API) and filters.
 */

/** List item shape (GraphQL list or normalized REST) */
export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
  /** From GraphQL list; optional for backward compatibility */
  genres?: { id: number; name: string }[];
  status?: string;
  rating?: string;
}

/** Filters for the anime list API (query params) */
export interface AnimeFilters {
  search?: string;
  kind?: string;
  score?: string;
  genre?: string;
  status?: string;
  order?: string;
}

/** Full anime detail (GraphQL or REST normalized) */
export interface AnimeDetail {
  id: number;
  name: string;
  russian?: string | null;
  image?: { original: string } | null;
  url?: string;
  kind?: string;
  score?: string;
  status?: string;
  episodes?: number;
  episodes_aired?: number;
  duration?: number;
  rating?: string;
  description?: string | null;
  description_html?: string | null;
  aired_on?: string | null;
  released_on?: string | null;
  genres?: { id: number; name: string; russian?: string }[];
  studios?: { id: number; name: string; image_url?: string }[];
  external_links?: { id: number; kind: string; url: string }[];
  synonyms?: string[];
  english?: string[] | null;
  japanese?: string[] | null;
  screenshots?: { original: string }[];
  videos?: { id: number; url: string; image_url: string; name?: string; kind?: string }[];
  next_episode_at?: string | null;
  updated_at?: string;
}
