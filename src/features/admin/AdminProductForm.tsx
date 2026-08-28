"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Globe,
  CheckCircle2,
  X,
  Code2,
  TableProperties,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Check,
  Star,
  Link as LinkIcon,
  Tag,
  Box,
} from "lucide-react";
import Link from "next/link";
import { LOCALES, Locale, LOCALE_METADATA } from "@/lib/i18n";

interface SpecItem {
  id: string;
  key: string;
  value: string;
}

const COMMON_SPEC_SUGGESTIONS = [
  "Ekran Boyutu",
  "Standart Parametreler",
  "Opsiyonel Modüller",
  "Aritmi & ST Analizi",
  "Batarya Ömrü",
  "Hafıza & Trend",
  "Yazıcı",
  "Güç Kaynağı",
  "Ağırlık & Boyutlar",
  "Garanti Süresi",
];

const COMMON_APP_PRESETS = [
  "Genel ve Cerrahi Yoğun Bakım Üniteleri",
  "Koroner Yoğun Bakım (KVC)",
  "Ameliyathane ve Anestezi Ayılma Odaları (PACU)",
  "Acil Servis Müdahale ve Triyaj Alanları",
  "Yenidoğan Yoğun Bakım (NICU)",
  "Kardiyoloji & Anjiyografi",
  "Radyoloji ve Teşhis Merkezleri",
  "Biyokimya ve Klinik Laboratuvar",
  "Fizik Tedavi ve Rehabilitasyon",
  "Poliklinik ve Muayenehaneler",
];

const COMMON_PRODUCT_IMAGES = [
  "/images/products/hastabasi-monitoru-1.webp",
  "/images/products/hastabasi-monitoru-2.webp",
  "/images/products/anestezi-cihazi-1.webp",
  "/images/products/defibrilator-1.webp",
  "/images/products/ekg-cihazi-1.webp",
  "/images/products/elektrokoter-1.webp",
  "/images/products/ultrason-1.webp",
  "/images/products/ventilator-1.webp",
  "/images/products/kuvoz-1.webp",
  "/images/products/otoklav-1.webp",
];

export function AdminProductForm({
  categories,
  initialData,
}: {
  categories: any[];
  initialData?: any;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [activeTab, setActiveTab] = useState<Locale>("tr");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form states (Empty by default for new device)
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || "");
  const [brand, setBrand] = useState(initialData?.brand || "Cebeci Medikal");
  const [model, setModel] = useState(initialData?.model || "");
  const [sku, setSku] = useState(initialData?.sku || "");
  const [condition, setCondition] = useState(initialData?.condition || "NEW");
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED");
  const [featured, setFeatured] = useState(initialData?.featured ?? false);

  // Auto-generate slug from model / brand if slug is empty or user types
  const handleModelChange = (val: string) => {
    setModel(val);
    if (!isEdit && (!slug || slug === model.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))) {
      const generated = val
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  };

  // 1. Images State (Empty by default for new device)
  const initialImages: string[] = (() => {
    try {
      if (initialData?.images) {
        const parsed = JSON.parse(initialData.images);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  })();

  const [imagesList, setImagesList] = useState<string[]>(initialImages);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imagesViewMode, setImagesViewMode] = useState<"visual" | "text">("visual");
  const [imagesRawText, setImagesRawText] = useState(initialImages.join("\n"));

  // 2. Technical Specs State (Empty by default for new device)
  const initialSpecItems: SpecItem[] = (() => {
    try {
      if (initialData?.technicalSpecs) {
        const parsed = JSON.parse(initialData.technicalSpecs);
        if (typeof parsed === "object" && parsed !== null && Object.keys(parsed).length > 0) {
          return Object.entries(parsed).map(([key, value], idx) => ({
            id: `spec-${idx}-${Date.now()}`,
            key,
            value: String(value),
          }));
        }
      }
    } catch {}
    return [];
  })();

  const [specItems, setSpecItems] = useState<SpecItem[]>(initialSpecItems);
  const [specsMode, setSpecsMode] = useState<"visual" | "json">("visual");
  const [specsJsonText, setSpecsJsonText] = useState(() => {
    const obj: Record<string, string> = {};
    initialSpecItems.forEach((s) => {
      if (s.key.trim()) obj[s.key.trim()] = s.value;
    });
    return Object.keys(obj).length > 0 ? JSON.stringify(obj, null, 2) : "{}";
  });

  // 3. Applications State (Empty by default for new device)
  const initialApps: string[] = (() => {
    try {
      if (initialData?.applications) {
        const parsed = JSON.parse(initialData.applications);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  })();

  const [appsList, setAppsList] = useState<string[]>(initialApps);
  const [newAppInput, setNewAppInput] = useState("");

  // 4. Translations (Empty by default for new device)
  const [translations, setTranslations] = useState<
    Record<Locale, { title: string; shortDescription: string; description: string }>
  >(() => {
    const map: any = {};
    for (const loc of LOCALES) {
      const found = initialData?.translations?.find((t: any) => t.locale === loc);
      map[loc] = {
        title: found?.title || "",
        shortDescription: found?.shortDescription || "",
        description: found?.description || "",
      };
    }
    return map;
  });

  const handleTranslationChange = (loc: Locale, field: string, val: string) => {
    setTranslations((prev) => ({
      ...prev,
      [loc]: {
        ...prev[loc],
        [field]: val,
      },
    }));
  };

  // Spec Item Handlers
  const addSpecItem = (key = "", value = "") => {
    const newItem: SpecItem = {
      id: `spec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      key,
      value,
    };
    const updated = [...specItems, newItem];
    setSpecItems(updated);
    updateSpecsJsonFromItems(updated);
  };

  const removeSpecItem = (id: string) => {
    const updated = specItems.filter((item) => item.id !== id);
    setSpecItems(updated);
    updateSpecsJsonFromItems(updated);
  };

  const updateSpecItem = (id: string, field: "key" | "value", text: string) => {
    const updated = specItems.map((item) => (item.id === id ? { ...item, [field]: text } : item));
    setSpecItems(updated);
    updateSpecsJsonFromItems(updated);
  };

  const updateSpecsJsonFromItems = (items: SpecItem[]) => {
    const obj: Record<string, string> = {};
    items.forEach((item) => {
      if (item.key.trim()) obj[item.key.trim()] = item.value;
    });
    setSpecsJsonText(JSON.stringify(obj, null, 2));
  };

  const handleSpecsJsonChange = (text: string) => {
    setSpecsJsonText(text);
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed === "object" && parsed !== null) {
        const items: SpecItem[] = Object.entries(parsed).map(([key, value], idx) => ({
          id: `spec-${idx}-${Date.now()}`,
          key,
          value: String(value),
        }));
        setSpecItems(items);
      }
    } catch {}
  };

  // Application Chips Handlers
  const addAppChip = (appName: string) => {
    const trimmed = appName.trim();
    if (!trimmed || appsList.includes(trimmed)) return;
    setAppsList((prev) => [...prev, trimmed]);
    setNewAppInput("");
  };

  const removeAppChip = (appToRemove: string) => {
    setAppsList((prev) => prev.filter((a) => a !== appToRemove));
  };

  // Image Gallery Handlers
  const addImage = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed || imagesList.includes(trimmed)) return;
    const updated = [...imagesList, trimmed];
    setImagesList(updated);
    setImagesRawText(updated.join("\n"));
    setNewImageUrl("");
  };

  const removeImage = (indexToRemove: number) => {
    const updated = imagesList.filter((_, idx) => idx !== indexToRemove);
    setImagesList(updated);
    setImagesRawText(updated.join("\n"));
  };

  const handleRawImagesTextChange = (text: string) => {
    setImagesRawText(text);
    const parsed = text
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setImagesList(parsed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    // Build specs payload
    let technicalSpecsPayload: Record<string, string> = {};
    if (specsMode === "visual") {
      specItems.forEach((item) => {
        if (item.key.trim()) technicalSpecsPayload[item.key.trim()] = item.value;
      });
    } else {
      try {
        technicalSpecsPayload = JSON.parse(specsJsonText);
      } catch {
        setErrorMsg("Teknik özellikler JSON formatı geçersiz.");
        setLoading(false);
        return;
      }
    }

    // Format translations payload with TR fallback priority
    const translationsPayload = LOCALES.map((loc) => ({
      locale: loc,
      title: translations[loc].title || translations.tr.title || slug,
      shortDescription: translations[loc].shortDescription || translations.tr.shortDescription,
      description: translations[loc].description || translations.tr.description,
    }));

    const payload = {
      slug,
      categoryId,
      brand,
      model,
      sku,
      condition,
      status,
      featured,
      images: imagesList.length > 0 ? imagesList : ["/images/products/hastabasi-monitoru-1.webp"],
      technicalSpecs: technicalSpecsPayload,
      applications: appsList,
      translations: translationsPayload,
    };

    try {
      const url = isEdit ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ürün kaydedilirken bir hata oluştu.");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "İşlem başarısız.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Top Header & Save Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2.5 rounded-xl bg-surface-2 hover:bg-primary/20 text-foreground-muted hover:text-primary border border-border transition-colors"
            title="Ürünler Listesine Dön"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {isEdit ? `Ürünü Düzenle: ${translations.tr.title || slug}` : "Yeni Tıbbi Cihaz Ekle"}
            </h1>
            <p className="text-xs sm:text-sm text-foreground-muted mt-0.5">
              Cihaz detaylarını, teknik özellikleri ve çok dilli açıklamaları yapılandırın.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 self-stretch sm:self-auto disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isEdit ? "Değişiklikleri Kaydet" : "Ürünü Yayınla"}</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* 1. SECTION: General Device Information (Balanced, Symmetrical Grid) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-border pb-3">
          <Layers className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Genel Cihaz Bilgileri
          </h2>
        </div>

        {/* 3x2 Symmetrical Form Field Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Col 1 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">
              Kategori <span className="text-red-400">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              {categories.map((c) => {
                const trName =
                  c.translations?.find((t: any) => t.locale === "tr")?.name ||
                  c.translations?.find((t: any) => t.locale === "en")?.name ||
                  c.translations?.[0]?.name ||
                  c.slug;
                return (
                  <option key={c.id} value={c.id}>
                    {trName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Col 2 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Marka</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Örn: Cebeci Medikal, GE, Philips"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Col 3 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => handleModelChange(e.target.value)}
              placeholder="Örn: CBC-M12 Pro"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Row 2 - Col 1 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-foreground">
                URL Slug <span className="text-red-400">*</span>
              </label>
              {slug && (
                <span className="text-[10px] font-mono text-primary truncate max-w-[150px]">
                  /urunler/{slug}
                </span>
              )}
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ornek-cihaz-modeli"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Row 2 - Col 2 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">SKU / Cihaz Kodu</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Örn: CBM-M12"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Row 2 - Col 3 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Cihaz Durumu</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="NEW">Sıfır Cihaz</option>
              <option value="SECOND_HAND">2. El (Revizyonlu & Garantili)</option>
            </select>
          </div>
        </div>

        {/* Row 3 - Publish Status & Featured Switch Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-border/80">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Yayın Durumu</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="PUBLISHED">Yayında (Published) - Sitede Görüntülenir</option>
              <option value="DRAFT">Taslak (Draft) - Gizli</option>
              <option value="REVIEW">İnceleme Bekliyor (Review)</option>
              <option value="ARCHIVED">Arşivlendi (Archived)</option>
            </select>
          </div>

          {/* Featured Toggle Card */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Öne Çıkarma Tercihi</label>
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-border hover:border-primary/40 transition-colors cursor-pointer select-none">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg ${featured ? "bg-amber-500/20 text-amber-400" : "bg-surface text-foreground-muted"}`}>
                  <Star className={`w-4 h-4 ${featured ? "fill-current" : ""}`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Ana Sayfada Öne Çıkar</div>
                  <div className="text-[10px] text-foreground-muted">Ana sayfa vitrininde 4 öne çıkan cihaz arasında yer alır.</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 2. SECTION: Technical Specifications (Key-Value Builder) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <TableProperties className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Teknik Özellikler ({specItems.length} Özellik)
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-2 border border-border self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSpecsMode("visual")}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                specsMode === "visual"
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <TableProperties className="w-3.5 h-3.5" />
              <span>Görsel Tablo Modu</span>
            </button>
            <button
              type="button"
              onClick={() => setSpecsMode("json")}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                specsMode === "json"
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>JSON Modu</span>
            </button>
          </div>
        </div>

        {specsMode === "visual" ? (
          <div className="space-y-4">
            <p className="text-xs text-foreground-muted">
              Cihazın ürün detay sayfasındaki teknik tablosunda görüntülenecek parametreleri satır satır ekleyin.
            </p>

            {/* Spec Rows */}
            {specItems.length > 0 ? (
              <div className="space-y-2.5">
                {specItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2.5 rounded-2xl bg-surface-2/70 border border-border hover:border-primary/40 transition-colors"
                  >
                    <span className="w-6 text-center font-mono text-[10px] font-bold text-foreground-muted">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={item.key}
                      onChange={(e) => updateSpecItem(item.id, "key", e.target.value)}
                      placeholder="Özellik Adı (Örn: Ekran Boyutu)"
                      className="flex-1 min-w-[140px] px-3 py-2 rounded-xl bg-surface border border-border text-xs font-semibold text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateSpecItem(item.id, "value", e.target.value)}
                      placeholder="Değer (Örn: 12.1 inç Renkli TFT LCD)"
                      className="flex-[2] min-w-[200px] px-3 py-2 rounded-xl bg-surface border border-border text-xs text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecItem(item.id)}
                      className="p-2 rounded-xl bg-surface hover:bg-red-500/20 text-foreground-muted hover:text-red-400 border border-border transition-colors"
                      title="Özelliği Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-surface-2/40 border border-dashed border-border text-center space-y-2">
                <p className="text-xs text-foreground-muted">
                  Henüz teknik özellik eklenmedi. Aşağıdaki butondan yeni satır ekleyebilir veya hazır önerilere tıklayabilirsiniz.
                </p>
              </div>
            )}

            {/* Add Row Button & Quick Suggestions */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => addSpecItem()}
                className="px-4 py-2 rounded-xl bg-surface-2 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold flex items-center gap-1.5 transition-colors self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Özellik Satırı Ekle</span>
              </button>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Hızlı Ekle:</span>
                </span>
                {COMMON_SPEC_SUGGESTIONS.slice(0, 5).map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => addSpecItem(sug, "")}
                    className="px-2 py-0.5 rounded-lg bg-surface-2 hover:bg-primary/20 border border-border text-[10px] text-foreground-muted hover:text-primary transition-colors"
                  >
                    +{sug}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-foreground-muted">
              Toplu teknik özellik verilerini doğrudan JSON formatında düzenleyebilirsiniz:
            </p>
            <textarea
              rows={8}
              value={specsJsonText}
              onChange={(e) => handleSpecsJsonChange(e.target.value)}
              className="w-full p-4 rounded-2xl bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-primary leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* 3. SECTION: Application Areas (Interactive Chip Manager) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-border pb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Kullanım Alanları ({appsList.length} Alan)
          </h2>
        </div>

        <p className="text-xs text-foreground-muted">
          Cihazın tıbbi kullanım ve servis alanlarını etiket olarak belirleyin. Ürün detay sayfasında yeşil onay rozetleri olarak listelenir.
        </p>

        {/* Active Application Chips */}
        <div className="flex flex-wrap items-center gap-2.5 min-h-[44px] p-3 rounded-2xl bg-surface-2/60 border border-border">
          {appsList.length > 0 ? (
            appsList.map((app) => (
              <span
                key={app}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-semibold shadow-sm animate-fade-in"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{app}</span>
                <button
                  type="button"
                  onClick={() => removeAppChip(app)}
                  className="p-0.5 rounded-full hover:bg-primary/20 text-primary/70 hover:text-red-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-xs text-foreground-muted italic">
              Henüz kullanım alanı eklenmedi. Aşağıdaki kutudan yazarak veya hazır önerilerden tıklayarak ekleyebilirsiniz.
            </span>
          )}
        </div>

        {/* Input to Add Custom Area */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newAppInput}
            onChange={(e) => setNewAppInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAppChip(newAppInput);
              }
            }}
            placeholder="Özel alan yazın (Örn: Koroner Yoğun Bakım) ve Enter'a basın..."
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="button"
            onClick={() => addAppChip(newAppInput)}
            className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Alan Ekle</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2 pt-1">
          <div className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Sık Kullanılan Tıbbi Alan Önerileri (Tıklayıp Ekleyin):</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {COMMON_APP_PRESETS.map((preset) => {
              const isSelected = appsList.includes(preset);
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => (isSelected ? removeAppChip(preset) : addAppChip(preset))}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-medium border transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-bold"
                      : "bg-surface-2 border-border text-foreground-muted hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  {isSelected ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                  <span>{preset}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. SECTION: Image Gallery Manager */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Görsel Galerisi ({imagesList.length} Görsel)
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-2 border border-border self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setImagesViewMode("visual")}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                imagesViewMode === "visual"
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Görsel Galeri</span>
            </button>
            <button
              type="button"
              onClick={() => setImagesViewMode("text")}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                imagesViewMode === "text"
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Metin / URL Modu</span>
            </button>
          </div>
        </div>

        {imagesViewMode === "visual" ? (
          <div className="space-y-4">
            {/* Visual Thumbnails Grid */}
            {imagesList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imagesList.map((url, idx) => (
                  <div
                    key={`${url}-${idx}`}
                    className="group relative rounded-2xl bg-white border border-border overflow-hidden p-2 flex flex-col justify-between aspect-square hover:border-primary transition-all shadow-sm"
                  >
                    <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={url}
                        alt={`Görsel ${idx + 1}`}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                      <span className="text-[10px] font-mono font-bold text-slate-600 truncate max-w-[100px]">
                        {idx === 0 ? "★ Kapak" : `#${idx + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="p-1 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                        title="Görseli Kaldır"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-surface-2/40 border border-dashed border-border text-center space-y-2">
                <p className="text-xs text-foreground-muted">
                  Henüz ürün görseli eklenmedi. Aşağıdaki alandan URL girebilir veya kütüphaneden hızlıca seçebilirsiniz.
                </p>
              </div>
            )}

            {/* Input to Add Image URL */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Görsel URL veya /images/products/dosya.webp yolunu giriniz..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs font-mono text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => addImage(newImageUrl)}
                className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Görsel Ekle</span>
              </button>
            </div>

            {/* Quick Medya Suggestions */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Medya Kütüphanesinden Hızlı Seçin:</span>
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {COMMON_PRODUCT_IMAGES.map((img) => {
                  const filename = img.split("/").pop();
                  const isAdded = imagesList.includes(img);
                  return (
                    <button
                      key={img}
                      type="button"
                      onClick={() => (isAdded ? removeImage(imagesList.indexOf(img)) : addImage(img))}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-mono border transition-colors flex items-center gap-1 ${
                        isAdded
                          ? "bg-primary/20 border-primary text-primary font-bold"
                          : "bg-surface-2 border-border text-foreground-muted hover:text-foreground"
                      }`}
                    >
                      {isAdded ? <Check className="w-3 h-3 text-primary" /> : <Plus className="w-3 h-3" />}
                      <span>{filename}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-foreground-muted">
              Görsel URL adreslerini alt alta giriniz (Her satıra bir adet):
            </p>
            <textarea
              rows={4}
              value={imagesRawText}
              onChange={(e) => handleRawImagesTextChange(e.target.value)}
              className="w-full p-4 rounded-2xl bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-primary leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* 5. SECTION: Multi-Language Content Tabs */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Çoklu Dil İçerikleri (6 Dil)
            </h2>
          </div>

          {/* Language Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveTab(loc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  activeTab === loc
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-2 text-foreground-muted hover:text-foreground"
                }`}
              >
                {LOCALE_METADATA[loc].flag} {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Inputs */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">
              Ürün Başlığı ({LOCALE_METADATA[activeTab].nativeName})
            </label>
            <input
              type="text"
              required={activeTab === "tr"}
              value={translations[activeTab].title}
              onChange={(e) => handleTranslationChange(activeTab, "title", e.target.value)}
              placeholder="Ürün adını giriniz..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">
              Kısa Açıklama ({LOCALE_METADATA[activeTab].nativeName})
            </label>
            <textarea
              rows={2}
              value={translations[activeTab].shortDescription}
              onChange={(e) => handleTranslationChange(activeTab, "shortDescription", e.target.value)}
              placeholder="Kartlarda görünecek özet açıklama..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">
              Detaylı Açıklama ({LOCALE_METADATA[activeTab].nativeName})
            </label>
            <textarea
              rows={5}
              value={translations[activeTab].description}
              onChange={(e) => handleTranslationChange(activeTab, "description", e.target.value)}
              placeholder="Ürünün detaylı klinik ve teknik tanıtımı..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
