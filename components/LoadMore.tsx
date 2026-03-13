// =============================================================================
// LOAD MORE / INFINITE SCROLL (components/LoadMore.tsx)
// =============================================================================
// Client Component: "use client" required because we use hooks (useState, useEffect, useInView).
// When the trigger (ref) scrolls into view, we call the fetchAnime Server Action and append
// the returned AnimeCard elements to local state. Page 1 is already rendered by page.tsx.
// =============================================================================
"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { fetchAnime } from "../app/action";

// Persists across re-renders. Starts at 2 because page 1 is fetched in app/page.tsx.
let page = 2;

// fetchAnime returns JSX.Element[]; we store and render them in the grid below.
export type AnimeCard = JSX.Element;

/**
 * Renders: (1) a grid of newly loaded cards, (2) a trigger div with ref, (3) spinner when loading.
 * When the trigger enters the viewport, we fetch the next page and append cards to data.
 */
function LoadMore() {
  const { ref, inView } = useInView(); // ref = attach to div; inView = true when that div is visible

  const [data, setData] = useState<AnimeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 500; // Small debounce so we don't fire multiple requests at once

      const timeoutId = setTimeout(() => {
        fetchAnime(page).then((res) => {
          setData([...data, ...res]); // Append new cards; data is in dependency array
          page++;
        });
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timeoutId); // Cleanup on unmount or when inView changes
    }
  }, [inView, data, isLoading]);

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
            />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
