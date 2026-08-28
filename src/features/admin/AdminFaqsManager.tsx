"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Save,
  Globe,
} from "lucide-react";
import { LOCALES, Locale, LOCALE_METADATA } from "@/lib/i18n";

export function AdminFaqsManager({ initialFaqs }: { initialFaqs: any[] }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<Locale>("tr");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [category, setCategory] = useState("Teknik Servis");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [translations, setTranslations] = useState<
    Record<Locale, { question: string; answer: string }>
  >(() => {
    const map: any = {};
    for (const loc of LOCALES) {
      map[loc] = { question: "", answer: "" };
    }
    return map;
  });

  const categoriesList = Array.from(new Set(faqs.map((f) => f.category).filter(Boolean)));

  const openCreateModal = () => {
    setEditingFaq(null);
    setCategory("Teknik Servis");
    setSortOrder((faqs.length + 1) * 1);
    setIsActive(true);

    const map: any = {};
    for (const loc of LOCALES) {
      map[loc] = { question: "", answer: "" };
    }
    setTranslations(map);
    setActiveLangTab("tr");
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (f: any) => {
    setEditingFaq(f);
    setCategory(f.category || "Genel");
    setSortOrder(f.sortOrder ?? 0);
    setIsActive(f.isActive ?? true);

    const map: any = {};
    for (const loc of LOCALES) {
      const found = f.translations?.find((t: any) => t.locale === loc);
      map[loc] = {
        question: found?.question || "",
        answer: found?.answer || "",
      };
    }
    setTranslations(map);
    setActiveLangTab("tr");
    setErrorMsg(null);
    setIsModalOpen(true);
  };

  const handleTranslationChange = (
    loc: Locale,
    field: "question" | "answer",
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

    const primaryQuestion =
      translations.tr.question || translations.en.question || "Sıkça Sorulan Soru";
    const primaryAnswer = translations.tr.answer || translations.en.answer || "";

    const translationsPayload = LOCALES.map((loc) => ({
      locale: loc,
      question: translations[loc].question || primaryQuestion,
      answer: translations[loc].answer || primaryAnswer,
    }));

    const payload = {
      category,
      sortOrder: Number(sortOrder),
      isActive,
      translations: translationsPayload,
    };

    try {
      const url = editingFaq
        ? `/api/admin/faqs/${editingFaq.id}`
        : "/api/admin/faqs";
      const method = editingFaq ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "İşlem sırasında bir hata oluştu.");
      } else {
        if (editingFaq) {
          setFaqs((prev) =>
            prev.map((f) => (f.id === editingFaq.id ? data.faq : f))
          );
          setSuccessMsg("Soru başarıyla güncellendi.");
        } else {
          setFaqs((prev) => [...prev, data.faq]);
          setSuccessMsg("Yeni soru başarıyla eklendi.");
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

  const handleDelete = async (id: string, qTitle: string) => {
    if (!confirm(`Bu soruyu silmek istediğinize emin misiniz?`)) return;

    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        setSuccessMsg("Soru silindi.");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        alert("Soru silinemedi.");
      }
    } catch {
      alert("Bağlantı hatası.");
    }
  };

  // Filter & Search
  const filtered = faqs.filter((f) => {
    const q = search.toLowerCase().trim();
    const trTrans = f.translations?.find((t: any) => t.locale === "tr");
    const enTrans = f.translations?.find((t: any) => t.locale === "en");
    const question = trTrans?.question || enTrans?.question || "";
    const answer = trTrans?.answer || enTrans?.answer || "";

    const matchSearch =
      !q ||
      question.toLowerCase().includes(q) ||
      answer.toLowerCase().includes(q) ||
      (f.category && f.category.toLowerCase().includes(q));

    const matchCategory = categoryFilter === "ALL" || f.category === categoryFilter;
    const matchStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "ACTIVE"
        ? f.isActive !== false
        : f.isActive === false;

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Soru, cevap veya kategoride ara..."
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {categoriesList.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="ALL">Tüm Kategoriler</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value="ACTIVE">Aktif Sorular</option>
            <option value="INACTIVE">Pasif</option>
          </select>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 self-stretch sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni SSS Ekle</span>
        </button>
      </div>

      {/* FAQs Table */}
      <div className="rounded-2xl border border-border overflow-hidden bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-2/60 text-left text-foreground-muted text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-12 text-center">Sıra</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4 min-w-[220px]">Soru (TR)</th>
                <th className="py-3.5 px-4 min-w-[280px]">Cevap Özeti (TR)</th>
                <th className="py-3.5 px-4 text-center">Durum</th>
                <th className="py-3.5 px-4">Diller</th>
                <th className="py-3.5 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((f) => {
                  const trTrans = f.translations?.find((t: any) => t.locale === "tr");
                  const enTrans = f.translations?.find((t: any) => t.locale === "en");
                  const qText = trTrans?.question || enTrans?.question || f.translations?.[0]?.question || "-";
                  const aText = trTrans?.answer || enTrans?.answer || f.translations?.[0]?.answer || "-";
                  const locales = f.translations?.map((t: any) => t.locale) || ["tr"];

                  return (
                    <tr key={f.id} className="hover:bg-surface-2/40 transition-colors">
                      <td className="py-4 px-4 text-center font-mono font-bold text-primary">
                        {f.sortOrder}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] tracking-wide uppercase">
                          {f.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-foreground leading-snug">
                          {qText}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-foreground-muted text-[11px] leading-relaxed line-clamp-2">
                          {aText}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            f.isActive !== false
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-surface-2 text-foreground-muted border border-border"
                          }`}
                        >
                          {f.isActive !== false ? "Aktif" : "Pasif"}
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
                            onClick={() => openEditModal(f)}
                            className="p-2 rounded-xl bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary border border-border/80 transition-colors"
                            title="Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(f.id, qText)}
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
                    Arama kriterlerinize uygun SSS bulunamadı.
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
                  {editingFaq ? "Soruyu Düzenle" : "Yeni SSS Ekle"}
                </h2>
                <p className="text-xs text-foreground-muted mt-0.5">
                  Sıkça sorulan soru ve cevabını 6 dilde yapılandırın.
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
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Örn: Teknik Servis, Garanti, Satış"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
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
                    <span>Soru & Cevap Çevirileri (İsteğe Bağlı)</span>
                  </label>
                  <span className="text-[11px] text-foreground-muted">
                    Boş diller ana dilden devralınır.
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {LOCALES.map((loc) => {
                    const meta = LOCALE_METADATA[loc];
                    const isFilled = !!translations[loc].question;
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
                      Soru ({LOCALE_METADATA[activeLangTab].name})
                    </label>
                    <input
                      type="text"
                      value={translations[activeLangTab].question}
                      onChange={(e) => handleTranslationChange(activeLangTab, "question", e.target.value)}
                      placeholder="Soru cümlesi..."
                      className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-foreground">
                      Cevap ({LOCALE_METADATA[activeLangTab].name})
                    </label>
                    <textarea
                      rows={3}
                      value={translations[activeLangTab].answer}
                      onChange={(e) => handleTranslationChange(activeLangTab, "answer", e.target.value)}
                      placeholder="Detaylı yanıt metni..."
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
                  <span>{editingFaq ? "Güncelle" : "Soruyu Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
