import { db } from "@/lib/db";
import { AdminServicesManager } from "@/features/admin/AdminServicesManager";

export default async function AdminServicesPage() {
  const services = await db.service.findMany({
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Hizmet Yönetimi ({services.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Biyomedikal teknik servis, periyodik bakım ve danışmanlık hizmetlerini ekleyin, düzenleyin ve 6 dilde yönetin.
        </p>
      </div>

      <AdminServicesManager initialServices={services} />
    </div>
  );
}
