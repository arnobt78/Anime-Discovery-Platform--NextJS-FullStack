// =============================================================================
// ANIME CARD (components/AnimeCard.tsx)
// =============================================================================
// Server Component: no "use client". Renders one anime (poster, title, kind, episodes, score).
// Used by fetchAnime() in action.tsx — receives data from Shikimori API.
// =============================================================================
import Image from "next/image";

import { MotionDiv } from "./Motion";

// Stagger: each card animates 0.25s after the previous for a cascade effect.
const stagger = 0.25;

// Framer Motion: opacity 0 → 1. "hidden" / "visible" are variant names used below.
const variants = {
  hidden: { opacity: 0 }, // Initial state (invisible)
  visible: { opacity: 1 }, // Final state (visible)
};

// Matches Shikimori API response. Export so action.tsx and others can type the data.
export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string; // Relative path on shikimori.one; we prefix with base URL below
  };
  kind: string; // Type of anime (TV, Movie, OVA, etc.)
  episodes: number; // Total planned episodes
  episodes_aired: number; // Episodes that have actually aired
  score: string; // User rating score
}

interface Prop {
  anime: AnimeProp;
  index: number;
}

/**
 * Renders one anime card. Image URL: Shikimori returns relative paths, so we prepend domain.
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
      viewport={{ amount: 0 }} // Start animation when any part of card enters viewport
      className="max-w-sm rounded relative w-full"
    >
      {/* Parent must be relative when using Image with fill */}
      <div className="relative w-full h-[37vh]">
        {/* next.config.js remotePatterns allows shikimori.one for optimization */}
        <Image
          src={`https://shikimori.one${anime.image.original}`}
          alt={anime.name}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
            {anime.name}
          </h2>
          <div className="py-1 px-2 bg-[#161921] rounded-sm">
            <p className="text-white text-sm font-bold capitalize">
              {anime.kind}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/episodes.svg"
              alt="episodes"
              width={20}
              height={20}
              className="object-contain"
            />
            {/* Fallback to episodes_aired if episodes is not available */}
            <p className="text-base text-white font-bold">
              {anime.episodes || anime.episodes_aired}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-base font-bold text-[#FFAD49]">{anime.score}</p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

export default AnimeCard;
