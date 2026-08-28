import { db } from "@/lib/db";
import { AdminCatalogsManager } from "@/features/admin/AdminCatalogsManager";

export default async function AdminCatalogsPage() {
  const catalogs = await db.catalog.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Katalog Yönetimi ({catalogs.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          PDF medikal ürün ve teknik servis kataloglarını ekleyin, düzenleyin, indirme istatistiklerini takip edin.
        </p>
      </div>

      <AdminCatalogsManager initialCatalogs={catalogs} />
    </div>
  );
}
