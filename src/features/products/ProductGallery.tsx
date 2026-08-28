"use client";

import { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export function ProductGallery({
  images,
  title,
  zoomHint = "Büyütmek için görsele tıklayın",
  imageAlt = "Görsel",
}: {
  images: string[];
  title: string;
  zoomHint?: string;
  imageAlt?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = images[selectedIndex] || images[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Frame with Zoom Overlay */}
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-border bg-white p-2 group shadow-xl">
        <div
          className="relative h-[360px] sm:h-[480px] w-full rounded-xl overflow-hidden cursor-zoom-in bg-white flex items-center justify-center p-3"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={activeImage}
            alt={`${title} - ${imageAlt} ${selectedIndex + 1}`}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="px-4 py-2 rounded-full bg-black/70 text-white text-xs font-semibold flex items-center gap-2 backdrop-blur-md shadow-lg">
              <ZoomIn className="w-4 h-4 text-primary" />
              <span>{zoomHint}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Rail */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-surface-2 ${
                selectedIndex === idx
                  ? "border-primary shadow-md scale-105"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${title} - ${imageAlt} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Main Image */}
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <img
                src={activeImage}
                alt={title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Title caption */}
            <div className="mt-4 text-center text-white/90 text-sm font-semibold">
              {title} ({selectedIndex + 1} / {images.length})
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
