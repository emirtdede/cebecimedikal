"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="p-1.5 rounded-lg text-foreground-muted hover:text-red-400 hover:bg-surface-2 transition-colors focus:outline-none"
      title="Çıkış Yap"
      aria-label="Çıkış Yap"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}
