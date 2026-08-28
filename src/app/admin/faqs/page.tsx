import { db } from "@/lib/db";
import { AdminFaqsManager } from "@/features/admin/AdminFaqsManager";

export default async function AdminFaqsPage() {
  const faqs = await db.faq.findMany({
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Sıkça Sorulan Sorular ({faqs.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Hastaneler ve kliniklerin teknik servis, garanti ve cihaz tedariki ile ilgili sıkça sorduğu soruları yönetin.
        </p>
      </div>

      <AdminFaqsManager initialFaqs={faqs} />
    </div>
  );
}
