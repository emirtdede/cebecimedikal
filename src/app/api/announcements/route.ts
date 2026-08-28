import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "ann-welcome",
    title: "Cebeci Medikal'e Hoş Geldiniz!",
    message:
      "Tıbbi cihaz tedariki, garantili 2. el revizyonlu cihazlar ve 7/24 biyomedikal teknik servis ihtiyaçlarınız için bize her an ulaşabilirsiniz.",
    imageUrl: null,
    videoUrl: null,
    linkUrl: "/tr/teklif",
    linkText: "Hızlı Fiyat Teklifi Al",
    contentType: "TEXT",
    position: "BOTTOM_LEFT",
    isActive: true,
    priority: 10,
    dismissible: true,
    showOnce: false,
    delaySeconds: 2,
  },
];

export async function GET() {
  try {
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

      return NextResponse.json({
        announcements: valid.length > 0 ? valid : announcements,
      });
    }

    return NextResponse.json({ announcements: DEFAULT_ANNOUNCEMENTS });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({ announcements: DEFAULT_ANNOUNCEMENTS });
  }
}
