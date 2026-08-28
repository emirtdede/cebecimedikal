"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Save,
  Upload,
} from "lucide-react";

export function AdminMediaManager({ initialMedia }: { initialMedia: any[] }) {
  const [mediaList, setMediaList] = useState(initialMedia);
  const [search, setSearch] = useState("");
  const [formatFilter, setFormatFilter] = useState("ALL");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [size, setSize] = useState("250 KB");
  const [dimensions, setDimensions] = useState("1200x800");
  const [type, setType] = useState("image/webp");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCopy = (imgUrl: string) => {
    navigator.clipboard.writeText(imgUrl);
    setCopiedUrl(imgUrl);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;

    const newItem = {
      name,
      url,
      size,
      dimensions,
      type,
    };

    setMediaList((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
    setSuccessMsg("Medya kütüphanesine eklendi.");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleDelete = (itemUrl: string, itemName: string) => {
    if (!confirm(`"${itemName}" görselini silmek istediğinize emin misiniz?`)) return;
    setMediaList((prev) => prev.filter((m) => m.url !== itemUrl));
    setSuccessMsg("Medya silindi.");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const filtered = mediaList.filter((m) => {
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.url.toLowerCase().includes(q) ||
      m.type.toLowerCase().includes(q);

    const matchFormat =
      formatFilter === "ALL"
        ? true
        : m.type.toLowerCase().includes(formatFilter.toLowerCase());

    return matchSearch && matchFormat;
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
              placeholder="Dosya adı veya format ara..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none"
          >
            <option value="ALL">Tüm Formatlar</option>
            <option value="webp">WebP Görselleri</option>
            <option value="png">PNG Formatı</option>
            <option value="svg">SVG Vektörel</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            setName("");
            setUrl("");
            setSize("250 KB");
            setDimensions("1200x800");
            setType("image/webp");
            setIsModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Medya Ekle</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-surface overflow-hidden group shadow-sm flex flex-col justify-between"
            >
              <div className="h-36 w-full bg-surface-2 overflow-hidden flex items-center justify-center relative">
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm p-1 rounded-lg">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-white hover:text-primary transition-colors"
                    title="Görseli Aç"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.url)}
                    className="p-1 text-white hover:text-primary transition-colors"
                    title="URL Kopyala"
                  >
                    {copiedUrl === item.url ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.url, item.name)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <div className="font-bold text-xs text-foreground truncate" title={item.name}>
                  {item.name}
                </div>
                <div className="flex items-center justify-between text-[10px] text-foreground-muted font-mono">
                  <span>{item.dimensions}</span>
                  <span>{item.size}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center text-foreground-muted bg-surface rounded-2xl border border-border">
            Arama kriterlerinize uygun medya öğesi bulunamadı.
          </div>
        )}
      </div>

      {/* Add Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">Yeni Medya Ekle</h2>
                <p className="text-xs text-foreground-muted mt-0.5">
                  Görsel veya belge URL linkini ve özelliklerini girin.
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

            <form onSubmit={handleAddMedia} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-foreground">
                  Dosya Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: ultrason-cihazi-hd.webp"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-foreground">
                  Görsel URL / Dosya Yolu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... veya /images/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Boyut</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Örn: 320 KB"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-foreground">Çözünürlük</label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="Örn: 1200x800"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                  />
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
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Kütüphaneye Ekle</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
