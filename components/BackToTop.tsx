"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 400;

/**
 * Back-to-top button: fixed bottom-right, visible after scrolling down.
 * Smooth scroll to top on click. No API calls.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 py-2 px-4 rounded-lg bg-[#FFAD49] text-[#0F1117] font-semibold text-sm shadow-lg hover:bg-[#ffb85c] focus:outline-none focus:ring-2 focus:ring-[#FFAD49] focus:ring-offset-2 focus:ring-offset-[#0F1117]"
      aria-label="Back to top"
    >
      Back to top
    </button>
  );
}
