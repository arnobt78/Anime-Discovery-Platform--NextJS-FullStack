// =============================================================================
// ANIME CARD (components/AnimeCard.tsx)
// =============================================================================
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Clapperboard, PlayCircle, Star, Tv } from "lucide-react";

import type { AnimeProp } from "@/types/anime";
import { MotionDiv } from "./Motion";

const stagger = 0.25;
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export type { AnimeProp };

interface Prop {
  anime: AnimeProp;
  index: number;
}

/**
 * Renders one anime card. Whole card is a link to /anime/[id] detail page.
 */
function AnimeCard({ anime, index }: Prop) {
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * stagger,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded relative w-full"
    >
      <Link href={`/anime/${anime.id}`} className="block rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FFAD49] focus:ring-offset-2 focus:ring-offset-[#0F1117]">
        {/* Parent must be relative when using Image with fill */}
        <div className="relative w-full h-[37vh]">
        {/* image.original is already a full URL from GraphQL mapping */}
        <Image
          src={anime.image.original}
          alt={anime.name}
          fill
          className="rounded-xl object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        {/* Row 1: Title only, full width, truncated */}
        <h2 className="font-bold text-white text-xl line-clamp-1 min-w-0 w-full truncate" title={anime.name}>
          {anime.name}
        </h2>
        {/* Row 2: Badges — kind (with icon), then genre pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="inline-flex items-center gap-1 py-1 px-2 bg-[#161921] rounded-sm">
            {anime.kind?.toLowerCase() === "tv" ? (
              <Tv className="w-4 h-4 text-white shrink-0" aria-hidden />
            ) : (
              <Clapperboard className="w-4 h-4 text-white shrink-0" aria-hidden />
            )}
            <p className="text-white text-sm font-bold capitalize">
              {anime.kind}
            </p>
          </div>
          {anime.genres && anime.genres.length > 0 && anime.genres.slice(0, 2).map((g) => (
            <span
              key={g.id}
              className="py-0.5 px-2 rounded bg-[#161921] text-white/80 text-xs"
            >
              {g.name}
            </span>
          ))}
        </div>
        {/* Row 3: Episodes + score with icons, then status (Released) at the end */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <Clapperboard className="w-5 h-5 text-white shrink-0" aria-hidden />
            <p className="text-base text-white font-bold">
              {anime.episodes ?? anime.episodes_aired ?? "—"}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Star className="w-5 h-5 text-[#FFAD49] shrink-0" aria-hidden />
            <p className="text-base font-bold text-[#FFAD49]">{anime.score}</p>
          </div>
          {anime.status && (
            <span className="inline-flex items-center gap-1 py-0.5 px-1.5 bg-white/10 rounded text-white/80 text-xs capitalize">
              {anime.status.toLowerCase() === "ongoing" ? (
                <PlayCircle className="w-3.5 h-3.5 shrink-0" aria-hidden />
              ) : (
                <CalendarCheck className="w-3.5 h-3.5 shrink-0" aria-hidden />
              )}
              {anime.status}
            </span>
          )}
        </div>
      </div>
      </Link>
    </MotionDiv>
  );
}

export default AnimeCard;
