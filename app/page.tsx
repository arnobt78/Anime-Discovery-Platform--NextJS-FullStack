// =============================================================================
// HOME PAGE (app/page.tsx) — Single route: "/"
// =============================================================================
// Server Component. Reads searchParams for search/filters and fetches first page.
// SearchFilters (client) updates URL; LoadMore (client) fetches next pages with same filters.
// =============================================================================
import { Suspense } from "react";
import { fetchAnime } from "./action";
import type { AnimeFilters } from "@/types/anime";

import LoadMore from "../components/LoadMore";
import { SearchFilters } from "../components/SearchFilters";
import { BackToTop } from "../components/BackToTop";

function searchParamsToFilters(
  sp: { get: (k: string) => string | null }
): AnimeFilters | null {
  const search = sp.get("search");
  const kind = sp.get("kind");
  const score = sp.get("score");
  const genre = sp.get("genre");
  const status = sp.get("status");
  const order = sp.get("order");
  if (!search && !kind && !score && !genre && !status && !order) return null;
  return {
    search: search ?? undefined,
    kind: kind ?? undefined,
    score: score ?? undefined,
    genre: genre ?? undefined,
    status: status ?? undefined,
    order: order ?? "popularity",
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const get = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] ?? null : (v ?? null);
  };
  const filters = searchParamsToFilters({ get });
  const data = await fetchAnime(1, filters);

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Anime</h2>
      <Suspense fallback={<div className="h-20 animate-pulse rounded bg-[#161921]/50" />}>
        <SearchFilters />
      </Suspense>
      {data.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-white/80 text-lg mb-2">No anime found.</p>
          <p className="text-white/50 text-sm">
            Try different search terms or clear filters.
          </p>
        </div>
      ) : (
        <>
          <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {data}
          </section>
          <LoadMore
            key={JSON.stringify(filters ?? {})}
            initialFilters={filters ?? undefined}
          />
        </>
      )}
      <BackToTop />
    </main>
  );
}
