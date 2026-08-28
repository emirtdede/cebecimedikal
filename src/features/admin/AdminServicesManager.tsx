"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Save,
  Globe,
  Cpu,
  ShieldCheck,
  Briefcase,
  Activity,
} from "lucide-react";
import { LOCALES, Locale, LOCALE_METADATA } from "@/lib/i18n";

const AVAILABLE_SERVICE_ICONS = ["Wrench", "ShieldCheck", "Cpu", "Briefcase", "Activity"];

export function AdminServicesManager({ initialServices }: { initialServices: any[] }) {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<Locale>("tr");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("Wrench");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [translations, setTranslations] = useState<
    Record<Locale, { title: string; shortDescription: string; description: string }>
  >(() => {
    const map: any = {};
    for (const loc of LOCALES) {
      map[loc] = { title: "", shortDescription: "", description: "" };
    }
    return map;
  });

  const openCreateModal = () => {
    setEditingService(null);
    setSlug("");
    setIcon("Wrench");
    setSortOrder((services.length + 1) * 1);
    setIsActive(true);
    const map: any = {};
    for (const loc of LOCALES) {
      map[loc] = { title: "", shortDescription: "", description: "" };
    }
    setTranslations(map);
    setActiveLangTab("tr");
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (s: any) => {
    setEditingService(s);
    setSlug(s.slug);
    setIcon(s.icon || "Wrench");
    setSortOrder(s.sortOrder ?? 0);
    setIsActive(s.isActive ?? true);

    const map: any = {};
    for (const loc of LOCALES) {
      const found = s.translations?.find((t: any) => t.locale === loc);
      map[loc] = {
        title: found?.title || "",
        shortDescription: found?.shortDescription || "",
        description: found?.description || "",
      };
    }
    setTranslations(map);
    setActiveLangTab("tr");
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleTranslationChange = (
    loc: Locale,
    field: "title" | "shortDescription" | "description",
    val: string
  ) => {
    setTranslations((prev) => ({
      ...prev,
      [loc]: {
        ...prev[loc],
        [field]: val,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const primaryTitle = translations.tr.title || translations.en.title || slug;
    const primaryShortDesc = translations.tr.shortDescription || "";
    const primaryDesc = translations.tr.description || "";

    const translationsPayload = LOCALES.map((loc) => ({
      locale: loc,
      title: translations[loc].title || primaryTitle,
      shortDescription: translations[loc].shortDescription || primaryShortDesc,
      description: translations[loc].description || primaryDesc,
    }));

    const payload = {
      slug,
      icon,
      sortOrder: Number(sortOrder),
      isActive,
      translations: translationsPayload,
    };

    try {
      const url = editingService
        ? `/api/admin/services/${editingService.id}`
        : "/api/admin/services";
      const method = editingService ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "İşlem sırasında bir hata oluştu.");
      } else {
        if (editingService) {
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? data.service : s))
          );
          setSuccessMsg("Hizmet başarıyla güncellendi.");
        } else {
          setServices((prev) => [...prev, data.service]);
          setSuccessMsg("Yeni hizmet başarıyla oluşturuldu.");
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

  const handleDelete = async (s: any) => {
    const trTitle = s.translations?.find((t: any) => t.locale === "tr")?.title || s.slug;
    if (!confirm(`"${trTitle}" hizmetini silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/services/${s.id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((item) => item.id !== s.id));
        setSuccessMsg("Hizmet silindi.");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert("Hizmet silinemedi.");
      }
    } catch {
      alert("Bağlantı hatası.");
    }
  };

  // Filter & Search
  const filtered = services.filter((s) => {
    const trTitle = s.translations?.find((t: any) => t.locale === "tr")?.title || "";
    const enTitle = s.translations?.find((t: any) => t.locale === "en")?.title || "";
    const matchSearch =
      trTitle.toLowerCase().includes(search.toLowerCase()) ||
      enTitle.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase()) ||
      (s.icon && s.icon.toLowerCase().includes(search.toLowerCase()));

    const matchStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "ACTIVE"
        ? s.isActive !== false
        : s.isActive === false;

    return matchSearch && matchStatus;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Hizmet adı, slug veya ikon ara..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value="ACTIVE">Aktif Hizmetler</option>
            <option value="INACTIVE">Pasif Hizmetler</option>
          </select>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 self-stretch sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Hizmet Ekle</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/60 text-left text-foreground-muted text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-12 text-center">Sıra</th>
                <th className="py-3.5 px-4">Hizmet Başlığı (TR)</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">İkon</th>
                <th className="py-3.5 px-4 text-center">Durum</th>
                <th className="py-3.5 px-4">Diller</th>
                <th className="py-3.5 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((s) => {
                  const trTrans = s.translations?.find((t: any) => t.locale === "tr");
                  const enTrans = s.translations?.find((t: any) => t.locale === "en");
                  const trTitle = trTrans?.title || enTrans?.title || s.translations?.[0]?.title || s.slug;
                  const locales = s.translations?.map((t: any) => t.locale) || ["tr"];

                  return (
                    <tr key={s.id} className="hover:bg-surface-2/40 transition-colors">
                      <td className="py-4 px-4 text-center font-mono font-bold text-primary">{s.sortOrder}</td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-foreground">{trTitle}</div>
                        {trTrans?.shortDescription && (
                          <div className="text-[11px] text-foreground-muted line-clamp-1 mt-0.5">
                            {trTrans.shortDescription}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 font-mono text-foreground-muted">/{s.slug}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-surface-2 border border-border text-[10px] font-mono text-primary font-bold">
                          {s.icon || "Wrench"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            s.isActive !== false
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-surface-2 text-foreground-muted border border-border"
                          }`}
                        >
                          {s.isActive !== false ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {locales.map((loc: string) => (
                            <span
                              key={loc}
                              className="px-1.5 py-0.5 rounded bg-surface-2 border border-border text-[9px] font-mono font-bold uppercase text-foreground-muted"
                            >
                              {loc}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(s)}
                            className="p-2 rounded-xl bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary border border-border/80 transition-colors"
                            title="Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(s)}
                            className="p-2 rounded-xl bg-surface-2 hover:bg-red-500/20 text-foreground-muted hover:text-red-400 border border-border/80 transition-colors"
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
                    Arama kriterlerinize uygun hizmet bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  {editingService ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
                </h2>
                <p className="text-xs text-foreground-muted mt-0.5">
                  Teknik servis / periyodik bakım hizmeti tanımlayın ve 6 dilde detaylandırın.
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-foreground">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    placeholder="ornek-hizmet-slug"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">İkon</label>
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                  >
                    {AVAILABLE_SERVICE_ICONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Görüntüleme Sırası</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2 flex items-center gap-3 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                    />
                    <span>Hizmet Sitede Aktif Olsun</span>
                  </label>
                </div>
              </div>

              {/* Multilingual Tabs */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span>Hizmet Başlık ve Açıklama Çevirileri (İsteğe Bağlı)</span>
                  </label>
                  <span className="text-[11px] text-foreground-muted">
                    Boş diller ana dilden otomatik devralınır.
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {LOCALES.map((loc) => {
                    const meta = LOCALE_METADATA[loc];
                    const isFilled = !!translations[loc].title;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setActiveLangTab(loc)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                          activeLangTab === loc
                            ? "bg-primary text-white shadow-sm"
                            : "bg-surface-2 hover:bg-surface border border-border text-foreground-muted"
                        }`}
                      >
                        <span>{meta.flag}</span>
                        <span>{meta.name}</span>
                        {isFilled && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-2xl bg-surface-2/60 border border-border space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-foreground">
                      Hizmet Başlığı ({LOCALE_METADATA[activeLangTab].name})
                    </label>
                    <input
                      type="text"
                      value={translations[activeLangTab].title}
                      onChange={(e) => handleTranslationChange(activeLangTab, "title", e.target.value)}
                      placeholder={`Örn: Biyomedikal Teknik Servis (${activeLangTab.toUpperCase()})`}
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-foreground">
                      Kısa Özet Açıklama ({LOCALE_METADATA[activeLangTab].name})
                    </label>
                    <input
                      type="text"
                      value={translations[activeLangTab].shortDescription}
                      onChange={(e) => handleTranslationChange(activeLangTab, "shortDescription", e.target.value)}
                      placeholder="Hizmet hakkında 1-2 cümlelik kısa özet..."
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-foreground">
                      Detaylı Hizmet Açıklaması ({LOCALE_METADATA[activeLangTab].name})
                    </label>
                    <textarea
                      rows={3}
                      value={translations[activeLangTab].description}
                      onChange={(e) => handleTranslationChange(activeLangTab, "description", e.target.value)}
                      placeholder="Hizmet kapsamı, süreçler ve avantajlar..."
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
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
                  <span>{editingService ? "Güncelle" : "Hizmeti Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
