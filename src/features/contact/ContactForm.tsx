"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, User, Building, Mail, Phone, Tag } from "lucide-react";
import { Dictionary } from "@/lib/dictionary";
import { getOrCreateVisitorId, getOrCreateSessionId } from "@/features/analytics/AnalyticsTracker";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();

    try {
      const res = await fetch("/api/contact", {
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
        setErrorMsg(data.error || dict.contact.error);
      } else {
        setSuccess(true);
      }
    } catch {
      setErrorMsg(dict.contact.error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-border text-center space-y-4 animate-slide-up shadow-xl">
        <div className="w-16 h-16 rounded-full bg-primary/15 text-primary mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">
          Mesajınız Başarıyla İletildi
        </h3>
        <p className="text-sm text-foreground-muted max-w-md mx-auto leading-relaxed">
          {dict.contact.success}
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setFormData({
                fullName: "",
                company: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
                honeypot: "",
              });
            }}
            className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface border border-border text-xs font-semibold text-foreground transition-colors"
          >
            Yeni Mesaj Gönder
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-surface border border-border shadow-xl space-y-6 h-full flex flex-col justify-between">
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          {dict.contact.formTitle}
        </h2>

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
          name="website_hp_contact"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.contact.fullName} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Örn: Dr. Ahmet Yılmaz"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.contact.company}
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Kurum / Klinik Adı"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.contact.email} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ornek@hastane.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-foreground">
            {dict.contact.phone} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="05XX XXX XX XX"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-foreground">
          {dict.contact.subject} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Tag className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Mesajınızın konusu"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-foreground">
          {dict.contact.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Talebinizi, teknik servis ihtiyacınızı veya iletmek istediğiniz detayları yazınız..."
          className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
        />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{dict.contact.submitting}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{dict.contact.submit}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
