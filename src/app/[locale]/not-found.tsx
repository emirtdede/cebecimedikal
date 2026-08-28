"use client";

import { useParams, usePathname } from "next/navigation";
import { CorporateErrorView } from "@/components/common/CorporateErrorView";
import { isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";

export default function LocaleNotFound() {
  const params = useParams();
  const pathname = usePathname();
  let locale = params?.locale as string;
  if (!locale && pathname) {
    const firstSeg = pathname.split("/")[1];
    if (isValidLocale(firstSeg)) locale = firstSeg;
  }
  const currentLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

  return <CorporateErrorView statusCode={404} locale={currentLocale} />;
}
