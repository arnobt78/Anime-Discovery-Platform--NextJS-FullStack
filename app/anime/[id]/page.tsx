// =============================================================================
// ANIME DETAIL PAGE (app/anime/[id]/page.tsx)
// =============================================================================
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarCheck,
  Clapperboard,
  Film,
  PlayCircle,
  Star,
  Tag,
  Tv,
} from "lucide-react";

import type { ComponentType } from "react";
import type { AnimeDetail } from "@/types/anime";
import { SHIKIMORI_BASE } from "@/lib/api";
import {
  fetchAnimeByIdGraphQL,
  fetchAnimeByIdREST,
} from "@/lib/shikimori-graphql";
import { PosterLightbox } from "@/components/PosterLightbox";
import { ScreenshotsGallery } from "@/components/ScreenshotsGallery";
import { ScrollToTop } from "@/components/ScrollToTop";

const KIND_ICON: Record<string, ComponentType<{ className?: string }>> = {
  tv: Tv,
  movie: Film,
  ova: Clapperboard,
  ona: Clapperboard,
  special: Clapperboard,
};

async function getAnimeById(id: string): Promise<AnimeDetail | null> {
  const fromGraphQL = await fetchAnimeByIdGraphQL(id);
  if (fromGraphQL) return fromGraphQL;
  return fetchAnimeByIdREST(id);
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      dateStyle: "medium",
    });
  } catch {
    return iso;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const anime = await getAnimeById(id);
  if (!anime) return { title: "Anime Not Found | Anime Vault" };
  const description =
    anime.description?.replace(/<[^>]*>/g, "").slice(0, 160) || undefined;
  const imageUrl = anime.image?.original ?? null;
  return {
    title: `${anime.name} | Anime Vault`,
    description:
      description ||
      `Details for ${anime.name}. Score: ${anime.score ?? "N/A"}, Episodes: ${anime.episodes ?? anime.episodes_aired ?? "N/A"}.`,
    openGraph: imageUrl
      ? {
          images: [
            {
              url: imageUrl,
              width: 225,
              height: 350,
              alt: anime.name,
            },
          ],
        }
      : undefined,
  };
}

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const anime = await getAnimeById(id);
  if (!anime) notFound();

  const imageSrc = anime.image?.original ?? null;

  return (
    <main className="sm:p-16 py-16 px-8 max-w-7xl mx-auto">
      <ScrollToTop />
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 text-sm font-medium"
      >
        ← Back to Explore
      </Link>

      <article className="flex flex-col lg:flex-row gap-10">
        {/* Poster: clickable → 90vh modal with download */}
        <div className="flex-shrink-0">
          <PosterLightbox src={imageSrc} alt={anime.name} />
          <div className="mt-4 flex flex-wrap gap-2">
            {anime.kind && (() => {
              const Icon = KIND_ICON[anime.kind.toLowerCase()] ?? Clapperboard;
              return (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#161921] rounded text-white text-sm capitalize">
                  <Icon className="w-4 h-4 shrink-0" />
                  {anime.kind}
                </span>
              );
            })()}
            {anime.rating && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#161921] rounded text-white text-sm">
                <Tag className="w-4 h-4 shrink-0" />
                {anime.rating}
              </span>
            )}
            {anime.status && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#161921] rounded text-white text-sm capitalize">
                {anime.status.toLowerCase() === "ongoing" ? (
                  <PlayCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <CalendarCheck className="w-4 h-4 shrink-0" />
                )}
                {anime.status}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {anime.name}
          </h1>
          {anime.russian && (
            <p className="text-white/70 text-lg mb-4">{anime.russian}</p>
          )}
          {anime.english && anime.english.length > 0 && (
            <p className="text-white/60 text-sm mb-2">
              English:{" "}
              {Array.isArray(anime.english)
                ? anime.english.join(", ")
                : anime.english}
            </p>
          )}
          {anime.japanese && anime.japanese.length > 0 && (
            <p className="text-white/60 text-sm mb-4">
              Japanese:{" "}
              {Array.isArray(anime.japanese)
                ? anime.japanese.join(", ")
                : anime.japanese}
            </p>
          )}

          {/* Score & episodes */}
          <div className="flex flex-wrap gap-6 mb-6 items-center">
            {anime.score != null && (
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-[#FFAD49] shrink-0" aria-hidden />
                <span className="text-2xl font-bold text-[#FFAD49]">
                  {anime.score}
                </span>
              </div>
            )}
            {(anime.episodes != null || anime.episodes_aired != null) && (
              <div className="flex items-center gap-2">
                <Clapperboard className="w-6 h-6 text-white shrink-0" aria-hidden />
                <span className="text-xl font-bold text-white">
                  {anime.episodes ?? anime.episodes_aired} episodes
                </span>
              </div>
            )}
            {anime.duration != null && (
              <span className="text-white/80">{anime.duration} min/ep</span>
            )}
          </div>

          {/* Dates */}
          {(anime.aired_on || anime.released_on) && (
            <div className="mb-6 text-white/80 text-sm">
              {anime.aired_on && <p>Aired: {anime.aired_on}</p>}
              {anime.released_on && <p>Released: {anime.released_on}</p>}
            </div>
          )}

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="mb-6">
              <h2 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" aria-hidden />
                Genres
              </h2>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-2 py-1 bg-[#161921] rounded text-white/90 text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Studios */}
          {anime.studios && anime.studios.length > 0 && (
            <div className="mb-6">
              <h2 className="text-white font-semibold mb-2">Studios</h2>
              <p className="text-white/80">
                {anime.studios.map((s) => s.name).join(", ")}
              </p>
            </div>
          )}

          {/* Description */}
          {anime.description && (
            <div className="mb-6">
              <h2 className="text-white font-semibold mb-2">Description</h2>
              {anime.description_html ? (
                <div
                  className="text-white/80 prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: anime.description_html }}
                />
              ) : (
                <p className="text-white/80 whitespace-pre-wrap">
                  {anime.description}
                </p>
              )}
            </div>
          )}

          {/* Synonyms */}
          {anime.synonyms && anime.synonyms.length > 0 && (
            <div className="mb-6">
              <h2 className="text-white font-semibold mb-2">Synonyms</h2>
              <p className="text-white/70 text-sm">
                {anime.synonyms.join(", ")}
              </p>
            </div>
          )}

          {/* External links */}
          {anime.external_links && anime.external_links.length > 0 && (
            <div className="mb-6">
              <h2 className="text-white font-semibold mb-2">Links</h2>
              <ul className="flex flex-wrap gap-3">
                {anime.external_links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFAD49] hover:underline text-sm"
                    >
                      {link.kind}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Videos / Trailers (Option A) */}
          {anime.videos && anime.videos.length > 0 && (
            <div className="mb-6">
              <h2 className="text-white font-semibold mb-2">Videos / Trailers</h2>
              <div className="flex flex-wrap gap-4">
                {anime.videos.map((v) => (
                  <a
                    key={v.id}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg overflow-hidden bg-[#161921] hover:ring-2 hover:ring-[#FFAD49] focus:outline-none focus:ring-2 focus:ring-[#FFAD49] w-[min(100%,280px)]"
                  >
                    {v.image_url && (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={v.image_url}
                          alt={v.name || "Video"}
                          fill
                          className="object-cover"
                          sizes="280px"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="p-2 text-center">
                      <span className="text-[#FFAD49] text-sm font-medium">
                        {v.name || v.kind || "Watch"}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots: clickable gallery with 90vh modal + download */}
          {anime.screenshots && anime.screenshots.length > 0 && (
            <ScreenshotsGallery screenshots={anime.screenshots} />
          )}

          {/* Next episode (Option A) */}
          {anime.next_episode_at && (
            <p className="text-white/80 text-sm mb-4">
              Next episode: {formatDate(anime.next_episode_at)}
            </p>
          )}

          {/* Last updated (Option A) */}
          {anime.updated_at && (
            <p className="text-white/50 text-xs mb-4">
              Last updated: {formatDate(anime.updated_at)}
            </p>
          )}

          {/* Shikimori URL */}
          {anime.url && (
            <a
              href={`${SHIKIMORI_BASE}${anime.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-[#161921] text-white rounded-lg hover:bg-[#1e2230] text-sm font-medium"
            >
              View on Shikimori →
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
