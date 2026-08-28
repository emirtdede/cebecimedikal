"use client";

import { useEffect } from "react";
import { CorporateErrorView } from "@/components/common/CorporateErrorView";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical application error:", error);
  }, [error]);

  return (
    <CorporateErrorView
      statusCode={500}
      errorDigest={error.digest}
      onRetry={reset}
    />
  );
}
