// app/layout.tsx
import Topbar from "@/components/Layout/Topbar";
import "./globals.css";
import Sidebar from "@/components/Layout/Sidebar";

export const metadata = {
  title: "Board App",
  description: "Swimlane Dashboard with Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="p-4 overflow-auto flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
