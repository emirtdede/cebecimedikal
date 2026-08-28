"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export function AdminSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setErrorMsg("Ayarlar kaydedilemedi.");
      }
    } catch {
      setErrorMsg("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Ayarlar başarıyla güncellendi.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Corporate Information */}
      <div className="p-6 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-foreground">Kurumsal İletişim Bilgileri</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Firma Ünvanı</label>
            <input
              type="text"
              value={settings.site_name || "CEBECİ MEDİKAL"}
              onChange={(e) => handleChange("site_name", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Birincil Telefon (Santral / Satış)</label>
            <input
              type="text"
              value={settings.phone_primary || "+90 506 606 15 40"}
              onChange={(e) => handleChange("phone_primary", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">İkincil Telefon (Teknik Servis)</label>
            <input
              type="text"
              value={settings.phone_secondary || "+90 506 835 57 41"}
              onChange={(e) => handleChange("phone_secondary", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">WhatsApp Numarası (Ülke kodu ile, başında + olmadan)</label>
            <input
              type="text"
              value={settings.whatsapp || "905066061540"}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">E-posta Adresi</label>
            <input
              type="email"
              value={settings.email || "cbcmedikal@gmail.com"}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Açık Adres</label>
            <input
              type="text"
              value={settings.address || "Fevzi Çakmak Mahallesi, Cumhuriyet Bulvarı No: 83/A, Sincan / Ankara"}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">Google Maps Embed URL</label>
          <input
            type="text"
            value={settings.google_maps_embed || ""}
            onChange={(e) => handleChange("google_maps_embed", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs font-mono text-foreground focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Social Media & System Flags */}
      <div className="p-6 rounded-3xl bg-surface border border-border space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-foreground">Sosyal Medya & Sistem Seçenekleri</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Facebook URL</label>
            <input
              type="text"
              value={settings.social_facebook || "https://www.facebook.com/cebeci.medikal/"}
              onChange={(e) => handleChange("social_facebook", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Instagram URL</label>
            <input
              type="text"
              value={settings.social_instagram || "https://www.instagram.com/cbcmedikal"}
              onChange={(e) => handleChange("social_instagram", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">Varsayılan Kurumsal Tema</label>
            <select
              value={settings.default_theme || "navy"}
              onChange={(e) => handleChange("default_theme", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-foreground focus:outline-none focus:border-primary"
            >
              <option value="navy">Lacivert (Navy - #07141C)</option>
              <option value="white">Beyaz (White - #F7F9FA)</option>
              <option value="black">Siyah (Black - #050607)</option>
              <option value="green">Yeşil (Green - #061612)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Tüm Ayarları Kaydet</span>
        </button>
      </div>
    </form>
  );
}
