"use client";

import { usePathname } from "next/navigation";
import { CorporateErrorView } from "@/components/common/CorporateErrorView";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  let locale = DEFAULT_LOCALE;
  if (pathname) {
    const firstSeg = pathname.split("/")[1];
    if (isValidLocale(firstSeg)) locale = firstSeg;
  }
  return <CorporateErrorView statusCode={404} locale={locale} />;
}
