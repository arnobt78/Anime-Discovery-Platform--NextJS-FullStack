/**
 * Filter dropdown options for anime list (kind, score, status, order).
 */

export const KIND_OPTIONS = [
  { value: "", label: "All" },
  { value: "tv", label: "TV" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
  { value: "ona", label: "ONA" },
  { value: "special", label: "Special" },
] as const;

export const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "ongoing", label: "Airing" },
  { value: "released", label: "Released" },
] as const;

export const SCORE_OPTIONS = [
  { value: "", label: "Any score" },
  { value: "7", label: "7+" },
  { value: "8", label: "8+" },
  { value: "9", label: "9+" },
] as const;

export const ORDER_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "ranked", label: "Ranked" },
  { value: "name", label: "Name" },
  { value: "score", label: "Score" },
] as const;
