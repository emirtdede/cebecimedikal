import { db } from "@/lib/db";
import { AdminCategoriesManager } from "@/features/admin/AdminCategoriesManager";

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      translations: true,
      _count: { select: { products: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Kategori Yönetimi ({categories.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Tıbbi cihaz kategorilerini ekleyin, düzenleyin, sıralayın ve 6 dilde yönetin.
        </p>
      </div>

      <AdminCategoriesManager initialCategories={categories} />
    </div>
  );
}
