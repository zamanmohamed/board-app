// app/client-layout.tsx
"use client";

import { useState } from "react";
import Topbar from "@/components/Layout/Topbar";
import Sidebar from "@/components/Layout/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
