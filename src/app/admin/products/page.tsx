import { db } from "@/lib/db";
import { AdminProductsTable } from "@/features/admin/AdminProductsTable";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: {
        include: {
          translations: true,
        },
      },
      translations: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Ürün Yönetimi ({products.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Tüm medikal cihazları, 2. el ekipmanları ve teknik özellikleri 6 dilde yönetin.
        </p>
      </div>

      <AdminProductsTable initialProducts={products} />
    </div>
  );
}
