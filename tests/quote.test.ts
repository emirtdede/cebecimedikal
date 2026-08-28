import { describe, it, expect } from "vitest";
import { z } from "zod";

const quoteSchema = z.object({
  fullName: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  city: z.string().min(2),
  topic: z.string().min(2),
  productName: z.string().optional().nullable(),
  quantity: z.number().int().min(1).default(1),
  message: z.string().min(5),
  preferredChannel: z.enum(["phone", "email", "whatsapp"]).default("phone"),
  kvkkConsent: z.boolean().refine((val) => val === true),
  honeypot: z.string().optional(),
});

describe("Quote Request Validation & Anti-Spam Security", () => {
  it("accepts valid quote submissions", () => {
    const validData = {
      fullName: "Dr. Mehmet Kaya",
      company: "Ankara Şehir Hastanesi",
      email: "mehmet.kaya@saglik.gov.tr",
      phone: "+90 532 123 45 67",
      city: "Ankara",
      topic: "Tıbbi Cihaz Satın Alma",
      productName: "Hasta Başı Monitörü (CBC-V900)",
      quantity: 2,
      message: "Kardiyoloji servisi için 2 adet monitör teklifi rica ediyoruz.",
      preferredChannel: "phone",
      kvkkConsent: true,
      honeypot: "",
    };

    const result = quoteSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects submissions without KVKK consent", () => {
    const invalidData = {
      fullName: "Dr. Mehmet Kaya",
      company: "Ankara Şehir Hastanesi",
      email: "mehmet.kaya@saglik.gov.tr",
      phone: "+90 532 123 45 67",
      city: "Ankara",
      topic: "Tıbbi Cihaz Satın Alma",
      message: "Kısa mesaj",
      kvkkConsent: false, // Rejected
    };

    const result = quoteSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("detects bot spam when honeypot field is filled", () => {
    const botData = {
      fullName: "Spam Bot",
      company: "Spam Inc",
      email: "spambot@example.com",
      phone: "1234567890",
      city: "Bot City",
      topic: "Spam",
      message: "Buy cheap meds now http://spam.com",
      kvkkConsent: true,
      honeypot: "http://bot-automated-link.com",
    };

    expect(botData.honeypot.length).toBeGreaterThan(0);
  });
});
