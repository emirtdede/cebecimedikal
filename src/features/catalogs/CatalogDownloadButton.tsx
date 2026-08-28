"use client";

import { useState } from "react";
import { FileText, Check, Loader2, ExternalLink, Download } from "lucide-react";
import { getOrCreateVisitorId, getOrCreateSessionId, trackClientEvent } from "@/features/analytics/AnalyticsTracker";

export function CatalogDownloadButton({
  catalogId,
  fileUrl,
  title,
  initialCount = 0,
  btnText = "PDF İncele & İndir",
}: {
  catalogId: string;
  fileUrl: string;
  title: string;
  initialCount?: number;
  btnText?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(initialCount);
  const [opened, setOpened] = useState(false);

  const handleOpenCatalog = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();

    try {
      await fetch("/api/catalogs/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ catalogId, visitorId, sessionId }),
      });
      setDownloadCount((prev) => prev + 1);
    } catch {}

    trackClientEvent("catalog_download", { label: title });

    // Open/download PDF
    window.open(fileUrl, "_blank");

    setLoading(false);
    setOpened(true);
    setTimeout(() => setOpened(false), 3500);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleOpenCatalog}
        disabled={loading}
        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center gap-2 focus:outline-none flex-shrink-0 cursor-pointer active:scale-95"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : opened ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        <span>{opened ? "Açıldı & İndirildi" : btnText}</span>
      </button>

      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        onClick={() => trackClientEvent("catalog_direct_download", { label: title })}
        className="p-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-foreground hover:text-primary transition-all flex items-center justify-center"
        title="Doğrudan İndir"
        aria-label="Doğrudan İndir"
      >
        <Download className="w-4 h-4" />
      </a>
    </div>
  );
}
