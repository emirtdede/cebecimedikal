import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const faq = await db.faq.findUnique({
      where: { id },
      include: { translations: true },
    });

    if (!faq) return NextResponse.json({ error: "SSS bulunamadı" }, { status: 404 });

    return NextResponse.json({ faq });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const { category, sortOrder, isActive, translations } = body;

    const existing = await db.faq.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "SSS bulunamadı" }, { status: 404 });

    await db.faq.update({
      where: { id },
      data: {
        category: category !== undefined ? category : existing.category,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
        isActive: isActive !== undefined ? Boolean(isActive) : existing.isActive,
      },
    });

    // Update translations
    if (translations && Array.isArray(translations)) {
      for (const t of translations) {
        if (!t.locale) continue;
        await db.faqTranslation.upsert({
          where: {
            faqId_locale: {
              faqId: id,
              locale: t.locale,
            },
          },
          update: {
            question: t.question || "",
            answer: t.answer || "",
          },
          create: {
            faqId: id,
            locale: t.locale,
            question: t.question || "",
            answer: t.answer || "",
          },
        });
      }
    }

    const updated = await db.faq.findUnique({
      where: { id },
      include: { translations: true },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "FAQ_UPDATED",
        entityType: "Faq",
        entityId: id,
        details: JSON.stringify({ question: updated?.translations[0]?.question }),
      },
    });

    return NextResponse.json({ success: true, faq: updated });
  } catch (error: any) {
    console.error("Error updating faq:", error);
    return NextResponse.json({ error: error.message || "SSS güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const faq = await db.faq.findUnique({ where: { id } });

    if (!faq) return NextResponse.json({ error: "SSS bulunamadı" }, { status: 404 });

    await db.faq.delete({ where: { id } });

    // Audit Log
    await db.auditLog.create({
      data: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: "FAQ_DELETED",
        entityType: "Faq",
        entityId: id,
        details: JSON.stringify({ faqId: id }),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting faq:", error);
    return NextResponse.json({ error: "SSS silinemedi" }, { status: 500 });
  }
}
