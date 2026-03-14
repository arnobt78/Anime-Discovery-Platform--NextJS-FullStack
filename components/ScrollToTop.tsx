"use client";

import { useEffect } from "react";

/**
 * Scrolls the window to top when the component mounts.
 * Use on detail (and other) pages so the user sees the page from the top on navigation.
 */
export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
