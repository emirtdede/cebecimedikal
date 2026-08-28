import { notFound } from "next/navigation";
import { isValidLocale, Locale } from "@/lib/i18n";
import { CorporateErrorView } from "@/components/common/CorporateErrorView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Hata ${code} | Cebeci Medikal`,
    robots: { index: false, follow: false },
  };
}

export default async function ErrorCodePage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale, code } = await params;
  if (!isValidLocale(locale)) notFound();

  const numCode = parseInt(code, 10);
  if (![400, 401, 403, 404, 500, 503].includes(numCode)) {
    notFound();
  }

  return (
    <CorporateErrorView
      statusCode={numCode as 400 | 401 | 403 | 404 | 500 | 503}
      locale={locale}
    />
  );
}
