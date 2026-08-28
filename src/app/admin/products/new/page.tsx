import { db } from "@/lib/db";
import { AdminProductForm } from "@/features/admin/AdminProductForm";

export default async function AdminNewProductPage() {
  const categories = await db.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });

  return <AdminProductForm categories={categories} />;
}
