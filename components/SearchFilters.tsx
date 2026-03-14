"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { MdSearch } from "react-icons/md";
import type { AnimeFilters } from "@/types/anime";
import {
  KIND_OPTIONS,
  SCORE_OPTIONS,
  STATUS_OPTIONS,
  ORDER_OPTIONS,
} from "@/lib/filter-options";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("search") ?? "",
  );

  const updateUrl = useCallback(
    (updates: Partial<AnimeFilters>) => {
      const params = new URLSearchParams(searchParams.toString());
      const keys: (keyof AnimeFilters)[] = [
        "search",
        "kind",
        "score",
        "genre",
        "status",
        "order",
      ];
      keys.forEach((key) => {
        const v = updates[key];
        if (v != null && v !== "") params.set(key, v);
        else params.delete(key);
      });
      router.replace(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ search: searchInput.trim() || undefined });
  };

  const hasActiveFilters =
    !!searchParams.get("search") ||
    !!searchParams.get("kind") ||
    !!searchParams.get("score") ||
    !!searchParams.get("status");

  const handleClearFilters = () => {
    setSearchInput("");
    router.replace("/", { scroll: false });
  };

  return (
    <div className="w-full max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Left: Filters label + 3 dropdowns + Clear button */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-white/70 text-sm font-medium py-2 px-0">
          Filters:
        </span>
        <Select
          value={searchParams.get("kind") ?? ""}
          onChange={(e) => updateUrl({ kind: e.target.value || undefined })}
          aria-label="Filter by kind"
        >
          {KIND_OPTIONS.map((o) => (
            <option key={o.value || "all"} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <Select
          value={searchParams.get("score") ?? ""}
          onChange={(e) => updateUrl({ score: e.target.value || undefined })}
          aria-label="Filter by minimum score"
        >
          {SCORE_OPTIONS.map((o) => (
            <option key={o.value || "any"} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <Select
          value={searchParams.get("status") ?? ""}
          onChange={(e) => updateUrl({ status: e.target.value || undefined })}
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value || "all"} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        <Select
          value={searchParams.get("order") ?? "popularity"}
          onChange={(e) =>
            updateUrl({
              order: (e.target.value as AnimeFilters["order"]) || "popularity",
            })
          }
          aria-label="Sort order"
        >
          {ORDER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClearFilters}
            className="!py-2 !px-4"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Right: Search bar + Search button (wider, up to max-w-2xl) */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex gap-2 w-full max-w-md sm:flex-1 sm:min-w-0"
      >
        <div className="relative flex-1 min-w-0">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search anime..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 pr-4"
            aria-label="Search anime"
          />
        </div>
        <Button type="submit" className="flex-shrink-0">
          Search
        </Button>
      </form>
    </div>
  );
}
