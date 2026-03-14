"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { downloadImage } from "@/lib/download-image";

interface ScreenshotItem {
  original: string;
}

interface ScreenshotsGalleryProps {
  screenshots: ScreenshotItem[];
}

export function ScreenshotsGallery({ screenshots }: ScreenshotsGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  if (!screenshots?.length) return null;

  return (
    <div className="mb-6">
      <h2 className="text-white font-semibold mb-2">Screenshots</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {screenshots.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            className="relative aspect-video rounded-lg overflow-hidden bg-[#161921] focus:outline-none focus:ring-2 focus:ring-[#FFAD49] focus:ring-offset-2 focus:ring-offset-[#0F1117] cursor-pointer"
          >
            <Image
              src={s.original}
              alt={`Screenshot ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Modal: 90vh, backdrop, image, download + close */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <div
            className="flex flex-col w-full max-w-5xl rounded-xl overflow-hidden bg-[#161921]"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end gap-2 p-2 shrink-0 border-b border-white/10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(
                    screenshots[selected].original,
                    `screenshot-${selected + 1}.jpg`
                  );
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFAD49] text-[#0F1117] font-semibold hover:bg-[#ffb85c] focus:outline-none focus:ring-2 focus:ring-white"
              >
                <Download className="w-5 h-5" aria-hidden />
                Download
              </button>
              <button
                type="button"
                onClick={close}
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFAD49]"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div
              className="relative w-full min-h-0 rounded-b-xl overflow-hidden"
              style={{ height: "calc(90vh - 52px)" }}
            >
              <Image
                src={screenshots[selected].original}
                alt={`Screenshot ${selected + 1} full size`}
                fill
                className="object-contain"
                sizes="90vw"
                unoptimized={screenshots[selected].original.includes("img.youtube")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
