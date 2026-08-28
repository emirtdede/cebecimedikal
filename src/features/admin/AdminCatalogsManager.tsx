"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  FileDown,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Save,
  ExternalLink,
  FileText,
} from "lucide-react";

export function AdminCatalogsManager({ initialCatalogs }: { initialCatalogs: any[] }) {
  const [catalogs, setCatalogs] = useState(initialCatalogs);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCatalog, setEditingCatalog] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Ürün Kataloğu");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [fileSize, setFileSize] = useState("2.4 MB");
  const [version, setVersion] = useState("2026.1");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Get distinct categories
  const categoriesList = Array.from(new Set(catalogs.map((c) => c.category).filter(Boolean)));

  const openCreateModal = () => {
    setEditingCatalog(null);
    setTitle("");
    setCategory("Ürün Kataloğu");
    setDescription("");
    setFileUrl("/catalogs/cebeci_medikal_urun_katalogu_2026.pdf");
    setThumbnailUrl("");
    setFileSize("3.5 MB");
    setVersion("2026.1");
    setSortOrder((catalogs.length + 1) * 1);
    setIsActive(true);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCatalog(cat);
    setTitle(cat.title || "");
    setCategory(cat.category || "Ürün Kataloğu");
    setDescription(cat.description || "");
    setFileUrl(cat.fileUrl || "");
    setThumbnailUrl(cat.thumbnailUrl || "");
    setFileSize(cat.fileSize || "2.4 MB");
    setVersion(cat.version || "1.0");
    setSortOrder(cat.sortOrder ?? 0);
    setIsActive(cat.isActive ?? true);
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const payload = {
      title,
      category,
      description,
      fileUrl,
      thumbnailUrl,
      fileSize,
      version,
      sortOrder: Number(sortOrder),
      isActive,
    };

    try {
      const url = editingCatalog
        ? `/api/admin/catalogs/${editingCatalog.id}`
        : "/api/admin/catalogs";
      const method = editingCatalog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "İşlem sırasında bir hata oluştu.");
      } else {
        if (editingCatalog) {
          setCatalogs((prev) =>
            prev.map((c) => (c.id === editingCatalog.id ? data.catalog : c))
          );
          setSuccessMsg("Katalog başarıyla güncellendi.");
        } else {
          setCatalogs((prev) => [...prev, data.catalog]);
          setSuccessMsg("Yeni katalog başarıyla eklendi.");
        }
        setIsModalOpen(false);
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch {
      setErrorMsg("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, catTitle: string) => {
    if (!confirm(`"${catTitle}" kataloğunu silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/catalogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCatalogs((prev) => prev.filter((c) => c.id !== id));
        setSuccessMsg("Katalog silindi.");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert("Katalog silinemedi.");
      }
    } catch {
      alert("Bağlantı hatası.");
    }
  };

  // Filter & Search
  const filtered = catalogs.filter((c) => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (c.description && c.description.toLowerCase().includes(q)) ||
      c.fileUrl.toLowerCase().includes(q);

    const matchCategory = categoryFilter === "ALL" || c.category === categoryFilter;
    const matchStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "ACTIVE"
        ? c.isActive !== false
        : c.isActive === false;

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Action and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Katalog adı, kategori veya dosya yolunda ara..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {categoriesList.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
            >
              <option value="ALL">Tüm Kategoriler</option>
              {categoriesList.map((catName) => (
                <option key={catName} value={catName}>
                  {catName}
                </option>
              ))}
            </select>
          )}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value="ACTIVE">Aktif Kataloglar</option>
            <option value="INACTIVE">Pasif / Taslak</option>
          </select>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Katalog Ekle</span>
        </button>
      </div>

      {/* Catalogs Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/40 text-left text-foreground-muted">
                <th className="p-4 font-semibold">Sıra</th>
                <th className="p-4 font-semibold">Katalog Başlığı</th>
                <th className="p-4 font-semibold">Kategori</th>
                <th className="p-4 font-semibold">Dosya Boyutu</th>
                <th className="p-4 font-semibold">Sürüm</th>
                <th className="p-4 font-semibold">İndirme Sayısı</th>
                <th className="p-4 font-semibold">Durum</th>
                <th className="p-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-2/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary">{c.sortOrder}</td>
                    <td className="p-4">
                      <div className="font-bold text-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{c.title}</span>
                      </div>
                      {c.description && (
                        <div className="text-[11px] text-foreground-muted line-clamp-1 mt-0.5 ml-6">
                          {c.description}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px] uppercase">
                        {c.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-foreground-muted">{c.fileSize}</td>
                    <td className="p-4 font-mono text-foreground">{c.version || "1.0"}</td>
                    <td className="p-4 font-mono font-bold text-foreground">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-2">
                        <Download className="w-3 h-3 text-primary" />
                        <span>{c.downloadCount}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.isActive !== false
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-surface-2 text-foreground-muted"
                        }`}
                      >
                        {c.isActive !== false ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={c.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary transition-colors"
                          title="Dosyayı Görüntüle"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEditModal(c)}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary transition-colors"
                          title="Düzenle"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.id, c.title)}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-red-500/20 text-foreground-muted hover:text-red-400 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-foreground-muted">
                    Arama kriterlerinize uygun katalog bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  {editingCatalog ? "Kataloğu Düzenle" : "Yeni Katalog Ekle"}
                </h2>
                <p className="text-xs text-foreground-muted mt-0.5">
                  PDF katalog dosya linki ve açıklama detaylarını girin.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-surface-2 hover:bg-surface text-foreground-muted hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-foreground">
                  Katalog Başlığı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: 2026 Genel Medikal Cihaz Kataloğu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Kategori</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Örn: Ameliyathane, Yoğun Bakım, Genel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Dosya Boyutu</label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="Örn: 4.8 MB"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-foreground">
                  PDF Dosya URL / Yolu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="/catalogs/dosya-adi.pdf veya https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-foreground">Kısa Açıklama</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Katalog içeriği hakkında kısa bilgi..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Sürüm (Version)</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="Örn: 2026.1"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Sıralama</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                  />
                  <span>Katalog Sitede Aktif ve İndirilebilir Olsun</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-xs font-semibold text-foreground-muted"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{editingCatalog ? "Güncelle" : "Kataloğu Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
