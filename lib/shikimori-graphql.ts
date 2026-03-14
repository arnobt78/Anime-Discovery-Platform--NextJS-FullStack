/**
 * Shikimori GraphQL API client (educational).
 *
 * Why GraphQL: single endpoint, request only the fields you need, and variables
 * map cleanly to our filters (search, kind, score, status, order). Good for
 * learning. Try queries at: https://shikimori.one/api/doc/graphql
 */

import { ANIMES_API, GRAPHQL_ENDPOINT, MAX_ANIME_LIMIT, SHIKIMORI_BASE } from "./api";
import type { AnimeDetail, AnimeFilters, AnimeProp } from "@/types/anime";

/** GraphQL may return full URLs (e.g. shikimori.io) or paths. Always return a single full URL. */
function toFullImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SHIKIMORI_BASE}${url}`;
}

const USER_AGENT = "AnimeVault/1.0 (https://github.com/anime-vault)";

/** Raw GraphQL list item (camelCase from API) */
interface GraphQLAnimeListItem {
  id: number;
  name: string;
  russian?: string | null;
  kind?: string;
  status?: string;
  rating?: string;
  score?: string;
  episodes?: number;
  episodesAired?: number;
  poster?: { originalUrl: string } | null;
  genres?: { id: number; name: string }[];
}

/** Raw GraphQL detail (camelCase) */
interface GraphQLAnimeDetailRaw {
  id: number;
  name: string;
  russian?: string | null;
  kind?: string;
  status?: string;
  rating?: string;
  score?: string;
  episodes?: number;
  episodesAired?: number;
  duration?: number;
  description?: string | null;
  descriptionHtml?: string | null;
  url?: string;
  poster?: { originalUrl: string } | null;
  airedOn?: { year?: number; month?: number; day?: number; date?: string } | null;
  releasedOn?: { year?: number; month?: number; day?: number; date?: string } | null;
  studios?: { id: number; name: string; imageUrl?: string }[];
  genres?: { id: number; name: string; russian?: string }[];
  externalLinks?: { id: number; kind: string; url: string }[];
  synonyms?: string[];
  english?: string[] | null;
  japanese?: string[] | null;
  nextEpisodeAt?: string | null;
  updatedAt?: string;
  screenshots?: { originalUrl: string }[];
  videos?: { id: number; url: string; imageUrl: string; name?: string; kind?: string }[];
}

/** Generic GraphQL request. Returns data or throws. */
export async function graphqlRequest<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors[0].message);
  if (json.data == null) throw new Error("No data");
  return json.data as T;
}

/**
 * List query: animes with pagination and filters.
 * Variables (page, limit, search, kind, score, status, order) map directly to
 * our AnimeFilters; the UI search params are passed through to the API.
 * Shikimori schema uses enum types (e.g. AnimeKindString) for kind/status/order.
 */
const ANIME_LIST_QUERY = `
  query AnimeList($page: Int, $limit: Int, $search: String, $kind: AnimeKindString, $score: Int, $status: AnimeStatusString, $order: OrderEnum) {
    animes(page: $page, limit: $limit, search: $search, kind: $kind, score: $score, status: $status, order: $order) {
      id
      name
      russian
      kind
      status
      rating
      score
      episodes
      episodesAired
      poster { originalUrl }
      genres { id name }
    }
  }
`;

/** Detail query: single anime by ids (limit 1). */
const ANIME_DETAIL_QUERY = `
  query AnimeDetail($ids: [ID!]) {
    animes(ids: $ids, limit: 1) {
      id
      name
      russian
      kind
      status
      rating
      score
      episodes
      episodesAired
      duration
      description
      descriptionHtml
      url
      poster { originalUrl }
      airedOn { year month day date }
      releasedOn { year month day date }
      studios { id name imageUrl }
      genres { id name russian }
      externalLinks { id kind url }
      synonyms
      english
      japanese
      nextEpisodeAt
      updatedAt
      screenshots { originalUrl }
      videos { id url imageUrl name kind }
    }
  }
`;

function formatAiredReleased(obj: { year?: number; month?: number; day?: number; date?: string } | null | undefined): string | null {
  if (!obj) return null;
  if (obj.date) return obj.date;
  if (obj.year != null && obj.month != null && obj.day != null)
    return `${obj.year}-${String(obj.month).padStart(2, "0")}-${String(obj.day).padStart(2, "0")}`;
  return null;
}

/** Map GraphQL list response to AnimeProp[] (snake_case + image.original as full URL). */
export function mapListToAnimeProp(list: GraphQLAnimeListItem[]): AnimeProp[] {
  return list.map((a) => ({
    id: String(a.id),
    name: a.name,
    image: {
      original: toFullImageUrl(a.poster?.originalUrl),
    },
    kind: a.kind ?? "",
    episodes: a.episodes ?? 0,
    episodes_aired: a.episodesAired ?? a.episodes ?? 0,
    score: a.score ?? "",
    genres: a.genres,
    status: a.status,
    rating: a.rating,
  }));
}

/** Map GraphQL detail (first animes item) to AnimeDetail (snake_case). */
export function mapDetailToAnimeDetail(raw: GraphQLAnimeDetailRaw | null): AnimeDetail | null {
  if (!raw) return null;
  return {
    id: raw.id,
    name: raw.name,
    russian: raw.russian,
    kind: raw.kind,
    status: raw.status,
    rating: raw.rating,
    score: raw.score,
    episodes: raw.episodes,
    episodes_aired: raw.episodesAired,
    duration: raw.duration,
    description: raw.description,
    description_html: raw.descriptionHtml,
    url: raw.url,
    image: raw.poster ? { original: toFullImageUrl(raw.poster.originalUrl) } : null,
    aired_on: formatAiredReleased(raw.airedOn),
    released_on: formatAiredReleased(raw.releasedOn),
    studios: raw.studios?.map((s) => ({ id: s.id, name: s.name, image_url: s.imageUrl })),
    genres: raw.genres,
    external_links: raw.externalLinks,
    synonyms: raw.synonyms,
    english: raw.english,
    japanese: raw.japanese,
    next_episode_at: raw.nextEpisodeAt,
    updated_at: raw.updatedAt,
    screenshots: raw.screenshots?.map((s) => ({ original: toFullImageUrl(s.originalUrl) })),
    videos: raw.videos?.map((v) => ({
      id: v.id,
      url: v.url,
      image_url: toFullImageUrl(v.imageUrl),
      name: v.name,
      kind: v.kind,
    })),
  };
}

/** Fetch anime list via GraphQL. Variables from page + filters. */
export async function fetchAnimeListGraphQL(
  page: number,
  filters?: AnimeFilters | null
): Promise<AnimeProp[]> {
  const order = filters?.order || "popularity";
  const scoreParam = filters?.score?.trim();
  const scoreNum = scoreParam ? parseInt(scoreParam, 10) : NaN;
  const score = Number.isNaN(scoreNum) ? null : scoreNum;
  const variables: Record<string, unknown> = {
    page,
    limit: MAX_ANIME_LIMIT,
    order,
    search: filters?.search?.trim() || null,
    kind: filters?.kind || null,
    score,
    status: filters?.status || null,
  };
  const data = (await graphqlRequest<{ animes: GraphQLAnimeListItem[] }>(
    ANIME_LIST_QUERY,
    variables
  )) as { animes?: GraphQLAnimeListItem[] };
  const list = data.animes ?? [];
  return mapListToAnimeProp(list);
}

/** Fetch single anime by id via GraphQL. Returns null if not found or GraphQL fails. */
export async function fetchAnimeByIdGraphQL(
  id: string
): Promise<AnimeDetail | null> {
  try {
    const data = (await graphqlRequest<{ animes: GraphQLAnimeDetailRaw[] }>(
      ANIME_DETAIL_QUERY,
      { ids: [id] }
    )) as { animes?: GraphQLAnimeDetailRaw[] };
    const first = data.animes?.[0] ?? null;
    return mapDetailToAnimeDetail(first);
  } catch {
    return null;
  }
}

/** Fetch single anime by id via REST (fallback when GraphQL returns nothing). */
export async function fetchAnimeByIdREST(id: string): Promise<AnimeDetail | null> {
  try {
    const res = await fetch(`${ANIMES_API}/${id}`, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const raw = (await res.json()) as Record<string, unknown> & {
      image?: { original?: string } | null;
      screenshots?: { original: string }[] | null;
      videos?: { id: number; url: string; image_url?: string; name?: string; kind?: string }[] | null;
    };
    if (!raw || typeof raw.id === "undefined") return null;
    const imageOriginal = raw.image?.original;
    const detail: AnimeDetail = {
      ...raw,
      image: imageOriginal
        ? { original: toFullImageUrl(imageOriginal) }
        : raw.image ?? null,
      screenshots: raw.screenshots?.map((s) => ({
        original: toFullImageUrl(s.original),
      })),
      videos: raw.videos?.map((v) => ({
        id: v.id,
        url: v.url,
        image_url: toFullImageUrl(v.image_url) ?? v.image_url ?? "",
        name: v.name,
        kind: v.kind,
      })),
    } as AnimeDetail;
    return detail;
  } catch {
    return null;
  }
}
