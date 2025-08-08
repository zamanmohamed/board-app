// app/layout.tsx

export const metadata = {
  title: "Board App",
  description: "Swimlane Dashboard with Next.js 15",
};

import "./globals.css";
import ClientLayout from "./client-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
