import { db } from "@/lib/db";
import { AdminAuditLogsManager } from "@/features/admin/AdminAuditLogsManager";

export default async function AdminAuditLogsPage() {
  const logs = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Audit Log (Denetim Kayıtları)
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Yönetici girişleri, ürün değişiklikleri, durum güncellemeleri ve güvenlik olaylarının değişmez kayıtlarını arayın ve inceleyin.
        </p>
      </div>

      <AdminAuditLogsManager initialLogs={logs} />
    </div>
  );
}
