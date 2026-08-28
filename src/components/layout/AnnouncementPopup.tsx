"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X, ExternalLink, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { Dictionary } from "@/lib/dictionary";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/i18n";

interface Announcement {
  id: string;
  title: string | null;
  message: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  linkUrl: string | null;
  linkText: string | null;
  contentType: string;
  dismissible: boolean;
  showOnce: boolean;
  delaySeconds: number;
}

export function AnnouncementPopup({ dict }: { dict?: Dictionary }) {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const locale = isValidLocale(currentLocale) ? currentLocale : DEFAULT_LOCALE;

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch(`/api/announcements?locale=${locale}`);
        const data = await res.json();

        if (data.announcements && data.announcements.length > 0) {
          // Filter out already-dismissed "showOnce" announcements
          const dismissedIds = JSON.parse(
            localStorage.getItem("cbc_dismissed_announcements") || "[]"
          );
          const filtered = data.announcements.filter(
            (a: Announcement) => !(a.showOnce && dismissedIds.includes(a.id))
          );

          if (filtered.length > 0) {
            setAnnouncements(filtered);

            // Delay before showing
            const delay = (filtered[0].delaySeconds || 3) * 1000;
            setTimeout(() => {
              setIsVisible(true);
              requestAnimationFrame(() => setIsEntering(true));
            }, delay);
          }
        }
      } catch {
        // Silently fail - popup is non-critical
      }
    }

    fetchAnnouncements();
  }, []);

  const dismiss = useCallback(() => {
    const current = announcements[currentIndex];

    // Mark as dismissed if showOnce
    if (current?.showOnce) {
      const dismissedIds = JSON.parse(
        localStorage.getItem("cbc_dismissed_announcements") || "[]"
      );
      dismissedIds.push(current.id);
      localStorage.setItem(
        "cbc_dismissed_announcements",
        JSON.stringify(dismissedIds)
      );
    }

    // If there are more announcements, show next
    if (currentIndex < announcements.length - 1) {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsExiting(false);
        setIsEntering(true);
      }, 300);
    } else {
      // Exit animation
      setIsExiting(true);
      setIsEntering(false);
      setTimeout(() => {
        setIsDismissed(true);
        setIsVisible(false);
      }, 400);
    }
  }, [announcements, currentIndex]);

  if (!isVisible || isDismissed || announcements.length === 0) return null;

  const current = announcements[currentIndex];
  const hasText = current.title || current.message;
  const hasImage = current.imageUrl;
  const hasVideo = current.videoUrl;
  const hasLink = current.linkUrl;

  return (
    <div
      className={`
        fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-[90] 
        w-[285px] max-w-[calc(100vw-32px)]
        transition-all duration-500 ease-out
        ${isEntering && !isExiting
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : "opacity-0 translate-y-6 -translate-x-4 scale-95"
        }
      `}
      role="dialog"
      aria-label="Bilgilendirme"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-surface/95 backdrop-blur-xl">
        {/* Decorative top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-hover to-primary/60" />

        {/* Dismiss button */}
        {current.dismissible && (
          <button
            onClick={dismiss}
            className="absolute top-2.5 right-2.5 z-10 w-6.5 h-6.5 rounded-lg bg-bg/60 backdrop-blur-sm border border-border/40 text-foreground-muted hover:text-foreground hover:bg-bg/80 transition-all duration-200 flex items-center justify-center group cursor-pointer"
            aria-label={dict?.nav?.close || dict?.common?.close || "Close"}
          >
            <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        )}

        {/* Image content */}
        {hasImage && (
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <img
              src={current.imageUrl!}
              alt={current.title || (dict?.common as any)?.info || "Info"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Image overlay gradient for text readability */}
            {hasText && (
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            )}
          </div>
        )}

        {/* Video content */}
        {hasVideo && !hasImage && (
          <div className="relative w-full aspect-video overflow-hidden bg-bg">
            <video
              src={current.videoUrl!}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-2.5 right-2.5 z-10 w-6.5 h-6.5 rounded-lg bg-bg/60 backdrop-blur-sm border border-border/40 text-foreground-muted hover:text-foreground transition-all flex items-center justify-center cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
            {/* Video overlay gradient */}
            {hasText && (
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            )}
          </div>
        )}

        {/* Text content area */}
        {hasText && (
          <div className={`p-4 sm:p-4.5 ${hasImage || hasVideo ? "pt-3" : "pt-4.5"}`}>
            {current.title && (
              <h3 className="text-xs sm:text-[13px] font-bold text-foreground leading-snug mb-1.5 pr-6">
                {current.title}
              </h3>
            )}
            {current.message && (
              <p className="text-[11px] sm:text-[11.5px] text-foreground-muted leading-relaxed">
                {current.message}
              </p>
            )}
          </div>
        )}

        {/* Action area */}
        <div className="px-4 sm:px-4.5 pb-3.5 flex items-center justify-between gap-3">
          {/* Link button */}
          {hasLink && (
            <a
              href={current.linkUrl!}
              target={current.linkUrl?.startsWith("http") ? "_blank" : undefined}
              rel={current.linkUrl?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
            >
              <span>{current.linkText || (dict?.common as any)?.view || dict?.products?.viewDetails || "View"}</span>
              {current.linkUrl?.startsWith("http") ? (
                <ExternalLink className="w-3 h-3" />
              ) : (
                <ArrowRight className="w-3 h-3" />
              )}
            </a>
          )}

          {/* Multi-announcement counter */}
          {announcements.length > 1 && (
            <span className="text-[10px] text-foreground-muted ml-auto">
              {currentIndex + 1} / {announcements.length}
            </span>
          )}
        </div>

        {/* Subtle ambient glow */}
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/8 rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>
  );
}
