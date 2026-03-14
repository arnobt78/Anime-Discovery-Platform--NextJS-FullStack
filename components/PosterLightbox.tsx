"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { downloadImage } from "@/lib/download-image";

interface PosterLightboxProps {
  src: string | null;
  alt: string;
}

export function PosterLightbox({ src, alt }: PosterLightboxProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!src) {
    return (
      <div className="w-[225px] aspect-[225/350] rounded-xl bg-[#161921] flex items-center justify-center text-white/50 text-sm">
        No image
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative w-full max-w-[225px] aspect-[225/350] rounded-xl overflow-hidden bg-[#161921] focus:outline-none focus:ring-2 focus:ring-[#FFAD49] focus:ring-offset-2 focus:ring-offset-[#0F1117] cursor-pointer"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="225px"
          priority
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Poster preview"
        >
          <div
            className="flex flex-col w-full max-w-4xl rounded-xl overflow-hidden bg-[#161921]"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end gap-2 p-2 shrink-0 border-b border-white/10">
              <button
                type="button"
                onClick={() =>
                  downloadImage(
                    src,
                    `poster-${alt.replace(/\s+/g, "-").slice(0, 30)}.jpg`
                  )
                }
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
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
