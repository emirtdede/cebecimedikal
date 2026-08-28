import { db } from "@/lib/db";
import { AdminSearchAnalyticsManager } from "@/features/admin/AdminSearchAnalyticsManager";

export default async function AdminSearchAnalyticsPage() {
  const searchQueries = await db.searchQuery.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Arama Analitiği
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Kullanıcıların site genelinde yaptığı arama sorguları, dilleri ve sonuç eşleşmelerini analiz edin.
        </p>
      </div>

      <AdminSearchAnalyticsManager initialQueries={searchQueries} />
    </div>
  );
}
