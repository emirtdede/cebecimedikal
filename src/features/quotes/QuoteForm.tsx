"use client";

import { useState, useRef, useEffect } from "react";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  MessageCircle,
  Building,
  User,
  MapPin,
  HelpCircle,
  Search,
  ChevronDown,
  Check,
  Package,
} from "lucide-react";
import { Dictionary } from "@/lib/dictionary";
import { getOrCreateVisitorId, getOrCreateSessionId } from "@/features/analytics/AnalyticsTracker";

export interface ServiceOption {
  id: string;
  slug: string;
  title: string;
}

export interface ProductOption {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  model?: string | null;
  images?: string[];
  category?: {
    name: string;
  };
}

export function QuoteForm({
  dict,
  initialProduct = "",
  initialTopic = "",
  services = [],
  products = [],
  whatsappNum = "905066061540",
}: {
  dict: Dictionary;
  initialProduct?: string;
  initialTopic?: string;
  services?: ServiceOption[];
  products?: ProductOption[];
  whatsappNum?: string;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    topic: initialTopic || dict.quote.topicDevice,
    productName: initialProduct,
    quantity: 1,
    message: initialProduct && (initialTopic === dict.quote.topicService || initialTopic === dict.quote.topicConsulting)
      ? `${initialProduct} hizmeti hakkında teknik servis ve teklif detayları almak istiyoruz.`
      : "",
    preferredChannel: "phone" as "phone" | "email" | "whatsapp",
    kvkkConsent: false,
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [quoteSuccess, setQuoteSuccess] = useState<string | null>(null);
  
  // Product Selector Dropdown State
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const productDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products.filter((p) => {
    if (!productSearchQuery.trim()) return true;
    const q = productSearchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.model && p.model.toLowerCase().includes(q)) ||
      (p.category?.name && p.category.name.toLowerCase().includes(q))
    );
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.kvkkConsent) {
      setErrorMsg(dict.quote.kvkkConsent);
      return;
    }

    setLoading(true);
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          visitorId,
          sessionId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || dict.quote.errorDesc);
      } else {
        setQuoteSuccess(data.quoteNumber);
      }
    } catch {
      setErrorMsg(dict.quote.errorDesc);
    } finally {
      setLoading(false);
    }
  };

  if (quoteSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border text-center space-y-6 animate-slide-up shadow-xl">
        <div className="w-16 h-16 rounded-full bg-primary/15 text-primary mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            {dict.quote.successTitle}
          </h3>
          <p className="text-sm text-foreground-muted max-w-md mx-auto leading-relaxed">
            {dict.quote.successDesc}
          </p>
        </div>
        <div className="inline-block px-6 py-3 rounded-2xl bg-surface-2 border border-primary/40 font-mono text-lg font-bold text-primary">
          {quoteSuccess}
        </div>
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setQuoteSuccess(null);
              setFormData({
                fullName: "",
                company: "",
                email: "",
                phone: "",
                city: "",
                topic: dict.quote.topicDevice,
                productName: "",
                quantity: 1,
                message: "",
                preferredChannel: "phone",
                kvkkConsent: false,
                honeypot: "",
              });
            }}
            className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-xs font-semibold text-foreground transition-colors"
          >
            {dict.quote.newRequest || "Yeni Talep Oluştur"}
          </button>
          <a
            href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent((dict.quote.whatsappTemplate || "Merhaba, {refNo} referans numaralı teklif talebim hakkında bilgi almak istiyorum.").replace("{refNo}", quoteSuccess || ""))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{dict.quote.chatWhatsApp || "WhatsApp ile İletişime Geç"}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-3xl bg-surface border border-border shadow-xl space-y-6">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Invisible Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_url_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.quote.fullName} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder={dict.quote.fullNamePlaceholder || "Dr. / Ad Soyad"}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Company / Hospital */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.quote.company} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder={dict.quote.institutionPlaceholder || "Hastane / Klinik Adı"}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.quote.email} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="doktor@hastane.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.quote.phone} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+90 5XX XXX XX XX"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.quote.city} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder={dict.quote.cityPlaceholder || "Şehir"}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Topic */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.quote.topic} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.topic}
            onChange={(e) => {
              const newTopic = e.target.value;
              setFormData((prev) => ({
                ...prev,
                topic: newTopic,
                productName:
                  newTopic === dict.quote.topicService && services.length > 0
                    ? services[0].title
                    : prev.productName,
              }));
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
          >
            <option value={dict.quote.topicDevice}>{dict.quote.topicDevice}</option>
            <option value={dict.quote.topicService}>{dict.quote.topicService}</option>
            <option value={dict.quote.topicConsulting}>{dict.quote.topicConsulting}</option>
            <option value={dict.quote.topicSecondHand}>{dict.quote.topicSecondHand}</option>
          </select>
        </div>

        {/* Dynamic Service Selector OR Product Name */}
        {formData.topic === dict.quote.topicService || formData.topic === dict.quote.topicConsulting ? (
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-xs font-bold text-foreground">
              {dict.quote.topicService} <span className="text-red-500">*</span>
            </label>
            {services.length > 0 ? (
              <select
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
              >
                <option value="">{dict.quote.selectServiceDefault || "-- Bir Hizmet Seçiniz --"}</option>
                {services.map((srv) => (
                  <option key={srv.id} value={srv.title}>
                    {srv.title}
                  </option>
                ))}
                <option value="Diğer / Özel Teknik Servis Talebi">{dict.quote.selectServiceOther || "Diğer / Özel Teknik Servis Talebi"}</option>
              </select>
            ) : (
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder={dict.quote.serviceTopicPlaceholder || "Talep ettiğiniz teknik servis veya danışmanlık konusu"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
              />
            )}
          </div>
        ) : (
          <>
            {/* Selected Product (Dynamic list from Database) */}
            <div className="space-y-1.5 relative" ref={productDropdownRef}>
              <label className="block text-xs font-bold text-foreground flex items-center justify-between">
                <span>{dict.quote.selectedProduct}</span>
                <span className="text-[10px] text-foreground-muted font-normal">
                  ({products.length} {dict.categories.productsCount})
                </span>
              </label>

              {/* Selector Button */}
              <div
                onClick={() => setIsProductDropdownOpen((prev) => !prev)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground hover:border-primary/50 cursor-pointer flex items-center justify-between transition-all select-none"
              >
                <span className={formData.productName ? "text-foreground font-medium truncate" : "text-foreground-muted truncate"}>
                  {formData.productName || dict.quote.selectProductDefault || "-- Listeden Bir Cihaz Seçiniz --"}
                </span>
                <ChevronDown className={`w-4 h-4 text-foreground-muted transition-transform duration-200 ${isProductDropdownOpen ? "rotate-180 text-primary" : ""}`} />
              </div>

              {/* Dropdown Menu Popup with Search and 5-item Scroll Window */}
              {isProductDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-2xl bg-surface border border-border/80 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
                  {/* Search Input Bar */}
                  <div className="p-2.5 border-b border-border/60 bg-surface-2/50">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        autoFocus
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        placeholder={dict.search?.placeholder || "Cihaz veya model ara..."}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-surface border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* Scrollable Products List (max-h-[220px] ~ 5 items visible at once) */}
                  <div className="max-h-[220px] overflow-y-auto p-1.5 space-y-1 custom-scrollbar">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((prod) => {
                        const isSelected = formData.productName === prod.title;
                        const thumb = prod.images && prod.images[0] ? prod.images[0] : null;
                        return (
                          <div
                            key={prod.id}
                            onClick={() => {
                              setFormData({ ...formData, productName: prod.title });
                              setIsProductDropdownOpen(false);
                              setProductSearchQuery("");
                            }}
                            className={`p-2 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                              isSelected
                                ? "bg-primary/15 text-primary border border-primary/30"
                                : "hover:bg-surface-2 text-foreground"
                            }`}
                          >
                            {/* Product Thumbnail */}
                            <div className="w-9 h-9 rounded-lg overflow-hidden bg-surface-2 border border-border/60 flex-shrink-0 flex items-center justify-center">
                              {thumb ? (
                                <img
                                  src={thumb}
                                  alt={prod.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <Package className="w-4 h-4 text-primary" />
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold truncate">
                                {prod.title}
                              </div>
                              <div className="text-[10px] text-foreground-muted truncate flex items-center gap-1.5 mt-0.5">
                                {prod.category?.name && <span>{prod.category.name}</span>}
                                {prod.brand && <span>• {prod.brand}</span>}
                              </div>
                            </div>

                            {/* Selected Checkmark */}
                            {isSelected && (
                              <Check className="w-4 h-4 text-primary flex-shrink-0 mr-1" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-6 text-center text-xs text-foreground-muted">
                        {dict.quote.noProductFound || "Aramanızla eşleşen cihaz bulunamadı."}
                      </div>
                    )}

                    {/* Custom device option */}
                    <div
                      onClick={() => {
                        setFormData({ ...formData, productName: dict.quote.selectProductOther || "Diğer / Listede Olmayan Özel Cihaz Talebi" });
                        setIsProductDropdownOpen(false);
                        setProductSearchQuery("");
                      }}
                      className="p-2 rounded-xl flex items-center gap-2 text-xs font-semibold text-primary hover:bg-primary/10 border-t border-border/40 cursor-pointer transition-colors mt-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{dict.quote.selectProductOther || "Diğer / Listede Olmayan Özel Cihaz Talebi"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                {dict.quote.quantity}
              </label>
              <input
                type="number"
                min={1}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-foreground">
          {dict.quote.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={dict.quote.notesPlaceholder || "Teknik şartname, cihaz konfigürasyonu veya servis detaylarını belirtiniz..."}
          className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
        />
      </div>

      {/* Preferred Contact Channel */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-foreground">
          {dict.quote.preferredChannel}
        </label>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-foreground">
            <input
              type="radio"
              name="preferredChannel"
              checked={formData.preferredChannel === "phone"}
              onChange={() => setFormData({ ...formData, preferredChannel: "phone" })}
              className="text-primary accent-primary"
            />
            <span>{dict.quote.channelPhone}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-foreground">
            <input
              type="radio"
              name="preferredChannel"
              checked={formData.preferredChannel === "email"}
              onChange={() => setFormData({ ...formData, preferredChannel: "email" })}
              className="text-primary accent-primary"
            />
            <span>{dict.quote.channelEmail}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-foreground">
            <input
              type="radio"
              name="preferredChannel"
              checked={formData.preferredChannel === "whatsapp"}
              onChange={() => setFormData({ ...formData, preferredChannel: "whatsapp" })}
              className="text-primary accent-primary"
            />
            <span>{dict.quote.channelWhatsapp}</span>
          </label>
        </div>
      </div>

      {/* KVKK Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-foreground-muted">
          <input
            type="checkbox"
            required
            checked={formData.kvkkConsent}
            onChange={(e) => setFormData({ ...formData, kvkkConsent: e.target.checked })}
            className="w-4 h-4 rounded text-primary border-border cursor-pointer accent-primary mt-0.5"
          />
          <span className="leading-relaxed">{dict.quote.kvkkConsent}</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{dict.quote.submitting}</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>{dict.quote.submit}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
