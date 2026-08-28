import { db } from "@/lib/db";
import { AdminSettingsForm } from "@/features/admin/AdminSettingsForm";

export default async function AdminSettingsPage() {
  const settingsRows = await db.siteSetting.findMany();
  const settingsMap: Record<string, string> = {};
  for (const row of settingsRows) {
    settingsMap[row.key] = row.value;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Site Ayarları & Tema
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          İletişim numaraları, adres bilgileri, sosyal medya linkleri ve genel platform yapılandırması.
        </p>
      </div>

      <AdminSettingsForm initialSettings={settingsMap} />
    </div>
  );
}
