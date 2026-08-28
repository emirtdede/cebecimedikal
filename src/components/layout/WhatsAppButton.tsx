"use client";

import { MessageCircle } from "lucide-react";
import { trackClientEvent } from "@/features/analytics/AnalyticsTracker";

export function WhatsAppButton({
  phoneNumber = "905066061540",
  message = "Merhaba, Cebeci Medikal hakkında bilgi ve teklif almak istiyorum.",
  label = "WhatsApp İletişim",
}: {
  phoneNumber?: string;
  message?: string;
  label?: string;
}) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    trackClientEvent("whatsapp_click", { label: message });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold">
        {label}
      </span>
    </a>
  );
}
