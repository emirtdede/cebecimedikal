import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, locale: string = "tr"): string {
  try {
    return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : locale).format(num);
  } catch {
    return num.toString();
  }
}

export function formatDate(date: Date | string, locale: string = "tr"): string {
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return String(date);
  }
}
