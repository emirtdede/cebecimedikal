import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DEFAULT_LOCALE, isValidLocale, Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const localeParam = searchParams.get("locale") || DEFAULT_LOCALE;
    const locale = isValidLocale(localeParam) ? (localeParam as Locale) : "tr";
    const dict = getDictionary(locale);

    const announcements = await db.announcement.findMany({
      where: {
        isActive: true,
      },
      orderBy: { priority: "desc" },
    });

    if (announcements && announcements.length > 0) {
      const now = new Date();
      const valid = announcements.filter((a) => {
        if (a.startDate && new Date(a.startDate) > now) return false;
        if (a.endDate && new Date(a.endDate) < now) return false;
        return true;
      });

      if (valid.length > 0) {
        const localizedAnnouncements = valid.map((a) => {
          if (locale !== "tr") {
            return {
              ...a,
              title: dict.announcement?.title || a.title,
              message: dict.announcement?.message || a.message,
              linkUrl: `/${locale}/teklif`,
              linkText: dict.announcement?.buttonText || a.linkText,
            };
          }
          return a;
        });

        return NextResponse.json({ announcements: localizedAnnouncements });
      }
    }

    const defaultAnn = [
      {
        id: "ann-welcome",
        title: dict.announcement?.title || "Cebeci Medikal'e Hoş Geldiniz!",
        message: dict.announcement?.message || "Tıbbi cihaz tedariki, garantili 2. el revizyonlu cihazlar ve 7/24 biyomedikal teknik servis ihtiyaçlarınız için bize her an ulaşabilirsiniz.",
        imageUrl: null,
        videoUrl: null,
        linkUrl: `/${locale}/teklif`,
        linkText: dict.announcement?.buttonText || "Hızlı Fiyat Teklifi Al →",
        contentType: "TEXT",
        position: "BOTTOM_LEFT",
        isActive: true,
        priority: 10,
        dismissible: true,
        showOnce: false,
        delaySeconds: 2,
      },
    ];

    return NextResponse.json({ announcements: defaultAnn });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({
      announcements: [
        {
          id: "ann-welcome",
          title: "Cebeci Medikal",
          message: "Tıbbi Cihaz & Biyomedikal Hizmetleri",
          linkUrl: "/tr/teklif",
          linkText: "Teklif Al",
          contentType: "TEXT",
          position: "BOTTOM_LEFT",
          isActive: true,
          priority: 10,
          dismissible: true,
          showOnce: false,
          delaySeconds: 2,
        },
      ],
    });
  }
}
