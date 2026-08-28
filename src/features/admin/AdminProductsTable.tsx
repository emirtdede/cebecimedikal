"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit2, Trash2, Plus, Search, ExternalLink, RefreshCw } from "lucide-react";
import { useAdminLanguage } from "./AdminLanguageContext";
import { getAdminUi } from "@/lib/admin-translations";

export function AdminProductsTable({ initialProducts }: { initialProducts: any[] }) {
  const { locale, dict } = useAdminLanguage();
  const a = dict.admin || {};
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(getAdminUi("confirmDelete", locale))) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Operation failed.");
      }
    } catch {
      alert("Network error.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter((p) => {
    const trTrans = p.translations?.find((t: any) => t.locale === "tr");
    const enTrans = p.translations?.find((t: any) => t.locale === "en");
    const title = trTrans?.title || enTrans?.title || p.translations?.[0]?.title || p.slug;
    const matchSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      (p.model && p.model.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={getAdminUi("searchProductPlaceholder", locale)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">{getAdminUi("allStatuses", locale)}</option>
            <option value="PUBLISHED">{getAdminUi("published", locale)}</option>
            <option value="DRAFT">{getAdminUi("draft", locale)}</option>
          </select>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{getAdminUi("addNewProduct", locale)}</span>
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/40 text-left text-foreground-muted">
                <th className="p-4 font-semibold">{getAdminUi("image", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("productName", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("category", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("brandModel", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("condition", locale)}</th>
                <th className="p-4 font-semibold">{getAdminUi("publishStatus", locale)}</th>
                <th className="p-4 font-semibold text-right">{getAdminUi("actions", locale)}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((prod) => {
                  let img = "";
                  try {
                    const parsedImgs = JSON.parse(prod.images);
                    img = parsedImgs[0] || "";
                  } catch {
                    img = prod.images;
                  }

                  const trTrans = prod.translations?.find((t: any) => t.locale === "tr");
                  const enTrans = prod.translations?.find((t: any) => t.locale === "en");
                  const title = trTrans?.title || enTrans?.title || prod.translations?.[0]?.title || prod.slug;

                  const catTrTrans = prod.category?.translations?.find((t: any) => t.locale === "tr");
                  const catEnTrans = prod.category?.translations?.find((t: any) => t.locale === "en");
                  const catName = catTrTrans?.name || catEnTrans?.name || prod.category?.translations?.[0]?.name || prod.category?.slug || "-";

                  return (
                    <tr key={prod.id} className="hover:bg-surface-2/40 transition-colors">
                      <td className="p-4">
                        <div className="w-12 h-12 rounded-lg bg-surface-2 overflow-hidden border border-border flex items-center justify-center relative">
                          {img ? (
                            <Image src={img} alt={title} width={48} height={48} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-foreground-muted">Yok</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-foreground">{title}</div>
                        <div className="text-[11px] font-mono text-foreground-muted">/{prod.slug}</div>
                      </td>
                      <td className="p-4 text-foreground-muted">{catName}</td>
                      <td className="p-4 text-foreground">
                        <div>{prod.brand}</div>
                        <div className="text-[11px] text-foreground-muted">{prod.model || "-"}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          prod.condition === "NEW" ? "bg-primary/20 text-primary" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {prod.condition === "NEW" ? "Sıfır" : "2. El"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          prod.status === "PUBLISHED"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-surface-2 text-foreground-muted"
                        }`}>
                          {prod.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/tr/urunler/${prod.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-2"
                            title="Sitede Görüntüle"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/products/${prod.id}/edit`}
                            className="p-1.5 rounded-lg text-foreground-muted hover:text-primary hover:bg-surface-2"
                            title="Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(prod.id, title)}
                            disabled={deletingId === prod.id}
                            className="p-1.5 rounded-lg text-foreground-muted hover:text-red-400 hover:bg-surface-2 disabled:opacity-50"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-foreground-muted">
                    Eşleşen ürün bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
