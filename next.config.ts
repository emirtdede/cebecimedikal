import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname, "./"),
  compress: true, // Enable gzip & brotli compression for static and SSR responses
  poweredByHeader: false, // Security: do not reveal Next.js header
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      // English rewrites
      { source: "/:locale(en|ar|ja|zh)/products", destination: "/:locale/urunler" },
      { source: "/:locale(en|ar|ja|zh)/products/:slug*", destination: "/:locale/urunler/:slug*" },
      { source: "/:locale(en|ar|ja|zh)/services", destination: "/:locale/hizmetler" },
      { source: "/:locale(en|ar|ja|zh)/services/:slug*", destination: "/:locale/hizmetler/:slug*" },
      { source: "/:locale(en|ar|ja|zh)/about", destination: "/:locale/hakkimizda" },
      { source: "/:locale(en|ar|ja|zh)/contact", destination: "/:locale/iletisim" },
      { source: "/:locale(en|ar|ja|zh)/quote", destination: "/:locale/teklif" },
      { source: "/:locale(en|ar|ja|zh)/catalogs", destination: "/:locale/kataloglar" },
      { source: "/:locale(en|ar|ja|zh)/references", destination: "/:locale/referanslar" },
      { source: "/:locale(en|ar|ja|zh)/refurbished-equipment", destination: "/:locale/2-el-tibbi-cihazlar" },

      // German rewrites
      { source: "/de/produkte", destination: "/de/urunler" },
      { source: "/de/produkte/:slug*", destination: "/de/urunler/:slug*" },
      { source: "/de/dienstleistungen", destination: "/de/hizmetler" },
      { source: "/de/dienstleistungen/:slug*", destination: "/de/hizmetler/:slug*" },
      { source: "/de/ueber-uns", destination: "/de/hakkimizda" },
      { source: "/de/kontakt", destination: "/de/iletisim" },
      { source: "/de/angebot", destination: "/de/teklif" },
      { source: "/de/kataloge", destination: "/de/kataloglar" },
      { source: "/de/referenzen", destination: "/de/referanslar" },
      { source: "/de/gebrauchtgeraete", destination: "/de/2-el-tibbi-cihazlar" },
    ];
  },
  async headers() {
    return [
      {
        // Global Security Headers for all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        // Strict Anti-Indexing Headers for all admin routes and APIs
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
