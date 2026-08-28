import { db } from "@/lib/db";
import { AdminReferencesManager } from "@/features/admin/AdminReferencesManager";

export default async function AdminReferencesPage() {
  const references = await db.reference.findMany({
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Referans Yönetimi ({references.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Hastaneler, klinikler ve kurumsal müşteri değerlendirmelerini ekleyin, düzenleyin ve yönetin.
        </p>
      </div>

      <AdminReferencesManager initialReferences={references} />
    </div>
  );
}
