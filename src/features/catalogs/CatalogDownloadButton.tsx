"use client";

import { useState } from "react";
import { FileText, Check, Loader2, ExternalLink } from "lucide-react";
import { getOrCreateVisitorId, getOrCreateSessionId, trackClientEvent } from "@/features/analytics/AnalyticsTracker";

export function CatalogDownloadButton({
  catalogId,
  fileUrl,
  title,
  initialCount,
}: {
  catalogId: string;
  fileUrl: string;
  title: string;
  initialCount: number;
}) {
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleOpenCatalog = async () => {
    setLoading(true);
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();

    try {
      await fetch("/api/catalogs/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catalogId, visitorId, sessionId }),
      });
    } catch {}

    trackClientEvent("catalog_view", { label: title });

    // Open PDF in new tab
    window.open(fileUrl, "_blank");

    setLoading(false);
    setOpened(true);
    setTimeout(() => setOpened(false), 3000);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <span className="text-xs text-foreground-muted flex items-center gap-1.5">
        <FileText className="w-3.5 h-3.5 text-primary" />
        <span>Resmi Ürün Dokümanı</span>
      </span>
      <button
        type="button"
        onClick={handleOpenCatalog}
        disabled={loading}
        className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 focus:outline-none"
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : opened ? (
          <Check className="w-3.5 h-3.5 text-white" />
        ) : (
          <ExternalLink className="w-3.5 h-3.5" />
        )}
        <span>{opened ? "Açıldı" : "PDF İncele"}</span>
      </button>
    </div>
  );
}
