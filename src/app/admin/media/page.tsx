import fs from "fs";
import path from "path";
import { AdminMediaManager } from "@/features/admin/AdminMediaManager";

export default function AdminMediaPage() {
  const imagesDir = path.join(process.cwd(), "public", "images", "products");
  
  let mediaItems: any[] = [];
  try {
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      mediaItems = files
        .filter((f) => f.endsWith(".webp") || f.endsWith(".png") || f.endsWith(".svg"))
        .map((file) => {
          const stats = fs.statSync(path.join(imagesDir, file));
          const sizeKb = Math.round(stats.size / 1024);
          return {
            name: file,
            url: `/images/products/${file}`,
            size: `${sizeKb} KB`,
            dimensions: "1200x800",
            type: file.endsWith(".webp") ? "image/webp" : file.endsWith(".svg") ? "image/svg+xml" : "image/png",
          };
        });
    }
  } catch (err) {
    console.error("Error reading media directory:", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Medya Kütüphanesi ({mediaItems.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Ürün görselleri, teknik şemalar ve kurumsal belgeleri (WebP / PNG / SVG) arayın, filtreleyin ve yönetin.
        </p>
      </div>

      <AdminMediaManager initialMedia={mediaItems} />
    </div>
  );
}
