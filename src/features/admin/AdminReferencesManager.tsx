"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Award,
  Star,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Save,
  Globe,
  Building,
  MapPin,
} from "lucide-react";
import { LOCALES, Locale, LOCALE_METADATA } from "@/lib/i18n";

export function AdminReferencesManager({ initialReferences }: { initialReferences: any[] }) {
  const [references, setReferences] = useState(initialReferences);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReference, setEditingReference] = useState<any | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<Locale>("tr");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [position, setPosition] = useState("");
  const [rating, setRating] = useState(5);
  const [serviceScope, setServiceScope] = useState("Biyomedikal Bakım & Servis");
  const [sector, setSector] = useState("Özel Hastane");
  const [city, setCity] = useState("Ankara");
  const [logoUrl, setLogoUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [translations, setTranslations] = useState<
    Record<Locale, { quote: string; projectDesc: string }>
  >(() => {
    const map: any = {};
    for (const loc of LOCALES) {
      map[loc] = { quote: "", projectDesc: "" };
    }
    return map;
  });

  const openCreateModal = () => {
    setEditingReference(null);
    setCompanyName("");
    setClientName("");
    setPosition("Başhekim / Satınalma Müdürü");
    setRating(5);
    setServiceScope("Biyomedikal Bakım & Teknik Servis");
    setSector("Özel Hastane Grubu");
    setCity("Ankara");
    setLogoUrl("");
    setSortOrder((references.length + 1) * 1);
    setIsActive(true);

    const map: any = {};
    for (const loc of LOCALES) {
      map[loc] = { quote: "", projectDesc: "" };
    }
    setTranslations(map);
    setActiveLangTab("tr");
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (r: any) => {
    setEditingReference(r);
    setCompanyName(r.companyName || "");
    setClientName(r.clientName || "");
    setPosition(r.position || "");
    setRating(r.rating ?? 5);
    setServiceScope(r.serviceScope || "");
    setSector(r.sector || "");
    setCity(r.city || "");
    setLogoUrl(r.logoUrl || "");
    setSortOrder(r.sortOrder ?? 0);
    setIsActive(r.isActive ?? true);

    const map: any = {};
    for (const loc of LOCALES) {
      const found = r.translations?.find((t: any) => t.locale === loc);
      map[loc] = {
        quote: found?.quote || "",
        projectDesc: found?.projectDesc || "",
      };
    }
    setTranslations(map);
    setActiveLangTab("tr");
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleTranslationChange = (
    loc: Locale,
    field: "quote" | "projectDesc",
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

    const primaryQuote =
      translations.tr.quote || translations.en.quote || "Cebeci Medikal hizmet kalitesinden memnunuz.";
    const primaryProjectDesc = translations.tr.projectDesc || "";

    const translationsPayload = LOCALES.map((loc) => ({
      locale: loc,
      quote: translations[loc].quote || primaryQuote,
      projectDesc: translations[loc].projectDesc || primaryProjectDesc,
    }));

    const payload = {
      companyName,
      clientName,
      position,
      rating: Number(rating),
      serviceScope,
      sector,
      city,
      logoUrl,
      sortOrder: Number(sortOrder),
      isActive,
      translations: translationsPayload,
    };

    try {
      const url = editingReference
        ? `/api/admin/references/${editingReference.id}`
        : "/api/admin/references";
      const method = editingReference ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "İşlem sırasında bir hata oluştu.");
      } else {
        if (editingReference) {
          setReferences((prev) =>
            prev.map((r) => (r.id === editingReference.id ? data.reference : r))
          );
          setSuccessMsg("Referans başarıyla güncellendi.");
        } else {
          setReferences((prev) => [...prev, data.reference]);
          setSuccessMsg("Yeni referans başarıyla eklendi.");
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

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" referansını silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/references/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReferences((prev) => prev.filter((r) => r.id !== id));
        setSuccessMsg("Referans silindi.");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert("Referans silinemedi.");
      }
    } catch {
      alert("Bağlantı hatası.");
    }
  };

  // Filter & Search
  const filtered = references.filter((r) => {
    const q = search.toLowerCase().trim();
    const trQuote = r.translations?.find((t: any) => t.locale === "tr")?.quote || "";
    const matchSearch =
      !q ||
      r.companyName.toLowerCase().includes(q) ||
      (r.clientName && r.clientName.toLowerCase().includes(q)) ||
      (r.position && r.position.toLowerCase().includes(q)) ||
      (r.sector && r.sector.toLowerCase().includes(q)) ||
      (r.city && r.city.toLowerCase().includes(q)) ||
      (r.serviceScope && r.serviceScope.toLowerCase().includes(q)) ||
      trQuote.toLowerCase().includes(q);

    const matchRating = ratingFilter === "ALL" || String(r.rating) === ratingFilter;
    const matchStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "ACTIVE"
        ? r.isActive !== false
        : r.isActive === false;

    return matchSearch && matchRating && matchStatus;
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
              placeholder="Kurum adı, yetkili, şehir, sektör veya yorumda ara..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">Tüm Puanlar (⭐)</option>
            <option value="5">5 Yıldız ⭐⭐⭐⭐⭐</option>
            <option value="4">4 Yıldız ⭐⭐⭐⭐</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value="ACTIVE">Aktif Referanslar</option>
            <option value="INACTIVE">Pasif</option>
          </select>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Referans Ekle</span>
        </button>
      </div>

      {/* References Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/40 text-left text-foreground-muted">
                <th className="p-4 font-semibold">Kurum Adı</th>
                <th className="p-4 font-semibold">Yetkili / Pozisyon</th>
                <th className="p-4 font-semibold">Sektör / Şehir</th>
                <th className="p-4 font-semibold">Puan</th>
                <th className="p-4 font-semibold">Hizmet Kapsamı</th>
                <th className="p-4 font-semibold">Müşteri Yorumu (TR)</th>
                <th className="p-4 font-semibold">Durum</th>
                <th className="p-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((r) => {
                  const trQuote = r.translations?.find((t: any) => t.locale === "tr")?.quote || "-";

                  return (
                    <tr key={r.id} className="hover:bg-surface-2/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-foreground">{r.companyName}</div>
                      </td>
                      <td className="p-4 text-foreground-muted">
                        {r.clientName ? `${r.clientName} (${r.position || ""})` : "-"}
                      </td>
                      <td className="p-4 text-foreground-muted">
                        {r.sector} • {r.city}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-primary">{r.serviceScope || "-"}</td>
                      <td className="p-4 text-foreground-muted italic max-w-xs truncate">
                        &ldquo;{trQuote}&rdquo;
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.isActive !== false
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-surface-2 text-foreground-muted"
                          }`}
                        >
                          {r.isActive !== false ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(r)}
                            className="p-1.5 rounded-lg bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary transition-colors"
                            title="Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(r.id, r.companyName)}
                            className="p-1.5 rounded-lg bg-surface-2 hover:bg-red-500/20 text-foreground-muted hover:text-red-400 transition-colors"
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
                  <td colSpan={8} className="p-8 text-center text-foreground-muted">
                    Arama kriterlerinize uygun referans bulunamadı.
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
          <div className="w-full max-w-2xl bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  {editingReference ? "Referansı Düzenle" : "Yeni Referans Ekle"}
                </h2>
                <p className="text-xs text-foreground-muted mt-0.5">
                  Hastane/klinik referans bilgileri, hizmet kapsamı ve müşteri değerlendirmesi.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">
                    Kurum Adı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Örn: Özel Lokman Hekim Hastanesi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Yetkili / Pozisyon</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Örn: Dr. Ahmet Yılmaz (Biyomedikal Sorumlusu)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Hizmet Kapsamı</label>
                  <input
                    type="text"
                    value={serviceScope}
                    onChange={(e) => setServiceScope(e.target.value)}
                    placeholder="Örn: Periyodik Bakım & Koter Revizyonu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Sektör / Şehir</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      placeholder="Örn: Özel Hastane"
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Örn: Ankara"
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Değerlendirme Puanı (1-5)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value={5}>5 Yıldız ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Yıldız ⭐⭐⭐⭐</option>
                    <option value={3}>3 Yıldız ⭐⭐⭐</option>
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
              </div>

              {/* Multilingual Tabs */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span>Müşteri Yorumu Çevirileri (İsteğe Bağlı)</span>
                  </label>
                  <span className="text-[11px] text-foreground-muted">
                    Boş diller ana dilden devralınır.
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {LOCALES.map((loc) => {
                    const meta = LOCALE_METADATA[loc];
                    const isFilled = !!translations[loc].quote;
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
                      Müşteri Yorumu ({LOCALE_METADATA[activeLangTab].name})
                    </label>
                    <textarea
                      rows={3}
                      value={translations[activeLangTab].quote}
                      onChange={(e) => handleTranslationChange(activeLangTab, "quote", e.target.value)}
                      placeholder="Cebeci Medikal hakkındaki kurum değerlendirmesi..."
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
                  <span>{editingReference ? "Güncelle" : "Referansı Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
