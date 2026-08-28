"use client";

import { useEffect } from "react";
import { CorporateErrorView } from "@/components/common/CorporateErrorView";

export default function RootGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root global error:", error);
  }, [error]);

  return (
    <html lang="tr" className="dark">
      <body className="bg-[#09151c] text-white min-h-screen flex items-center justify-center">
        <CorporateErrorView
          statusCode={500}
          errorDigest={error.digest}
          onRetry={reset}
        />
      </body>
    </html>
  );
}
