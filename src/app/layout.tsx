"use client";

import { useState } from "react";
import Topbar from "@/components/Layout/Topbar";
import Sidebar from "@/components/Layout/Sidebar";
import "./globals.css";

// export const metadata = {
//   title: "Board App",
//   description: "Swimlane Dashboard with Next.js 15",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex flex-col flex-1">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <main className="p-4 flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
