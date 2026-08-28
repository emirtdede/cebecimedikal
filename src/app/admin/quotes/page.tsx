import { db } from "@/lib/db";
import { AdminQuotesTable } from "@/features/admin/AdminQuotesTable";

export default async function AdminQuotesPage() {
  const quotes = await db.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Teklif Talepleri ({quotes.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Hastaneler ve sağlık kuruluşlarından gelen fiyat teklifi ve tedarik taleplerini yönetin.
        </p>
      </div>

      <AdminQuotesTable initialQuotes={quotes} />
    </div>
  );
}
