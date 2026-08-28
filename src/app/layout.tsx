import type { Metadata } from "next";
import { ThemeScript } from "@/components/layout/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cebeci Medikal | Tıbbi Cihazlar, Biyomedikal Teknik Servis & Danışmanlık",
  description: "2015'ten bu yana yüksek standartlı tıbbi cihaz tedariki, profesyonel biyomedikal teknik servis, periyodik koruyucu bakım ve sağlık yatırımı danışmanlığı.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cebecimedikal.com"),
  keywords: [
    "tıbbi cihaz",
    "medikal cihaz",
    "ikinci el tıbbi cihaz",
    "biyomedikal teknik servis",
    "hastabaşı monitör",
    "mekanik ventilatör",
    "ameliyathane masası",
    "Ankara medikal",
  ],
  authors: [{ name: "Cebeci Medikal" }],
  creator: "Cebeci Medikal",
  publisher: "Cebeci Medikal",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/Logo/CBC_Medikal_Symbol_White.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/Logo/CBC_Medikal_Symbol_White.svg",
    apple: "/Logo/CBC_Medikal_Symbol_White.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
