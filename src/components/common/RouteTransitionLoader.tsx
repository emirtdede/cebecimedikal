"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Whenever route changes, trigger a rapid smooth medical pulse completion
    setIsLoading(true);
    setProgress(35);

    const t1 = setTimeout(() => {
      setProgress(75);
    }, 120);

    const t2 = setTimeout(() => {
      setProgress(100);
    }, 280);

    const t3 = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, searchParams]);

  if (!isLoading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
    >
      {/* Glowing Top Medical Pulse Bar */}
      <div
        className="h-1 bg-gradient-to-r from-primary via-[#45B890] to-[#29A37F] shadow-[0_0_12px_rgba(31,138,112,0.8)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: isLoading ? 1 : 0,
        }}
      />

      {/* Medical ECG Heartbeat Pulse Indicator on the leading edge */}
      {isLoading && (
        <div
          className="absolute top-0 -mt-1 h-3 w-8 rounded-full bg-primary/40 blur-sm transition-all duration-300 ease-out"
          style={{ left: `calc(${progress}% - 20px)` }}
        />
      )}
    </div>
  );
}
