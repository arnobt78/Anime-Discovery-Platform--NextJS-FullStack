// =============================================================================
// LOAD MORE / INFINITE SCROLL (components/LoadMore.tsx)
// =============================================================================
// Client Component. Fetches next pages with the same filters as the initial load.
// When initialFilters change, parent passes new key so this component remounts with fresh state.
// =============================================================================
"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

import { fetchAnime } from "../app/action";
import type { AnimeFilters } from "@/types/anime";

// fetchAnime returns JSX.Element[]; we store and render them in the grid below.
export type AnimeCard = JSX.Element;

function LoadMore({ initialFilters }: { initialFilters?: AnimeFilters | null }) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const nextPageRef = useRef(2); // Page 1 is server-rendered; next fetch is page 2.

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 500;
      const timeoutId = setTimeout(() => {
        const page = nextPageRef.current;
        fetchAnime(page, initialFilters ?? undefined).then((res) => {
          setData((prev) => [...prev, ...res]);
          nextPageRef.current = page + 1;
        });
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, initialFilters]);

  return (
    <>
      {/* Same grid classes as page.tsx so new cards align with initial cards */}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      {/* ref attached here: when this div scrolls into view, useInView sets inView = true */}
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && isLoading && (
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
