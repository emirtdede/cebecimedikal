import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminProductForm } from "@/features/admin/AdminProductForm";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id },
      include: { translations: true },
    }),
    db.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { translations: true },
    }),
  ]);

  if (!product) notFound();

  return <AdminProductForm categories={categories} initialData={product} />;
}
