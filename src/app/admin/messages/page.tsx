import { db } from "@/lib/db";
import { AdminMessagesManager } from "@/features/admin/AdminMessagesManager";

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          İletişim Mesajları ({messages.length})
        </h1>
        <p className="text-xs sm:text-sm text-foreground-muted mt-1">
          Web sitesi iletişim formu üzerinden iletilen mesajları arayın, filtreleyin, yanıtlayın ve yönetin.
        </p>
      </div>

      <AdminMessagesManager initialMessages={messages} />
    </div>
  );
}
