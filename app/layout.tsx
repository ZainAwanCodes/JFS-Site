import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jeeway Fateh Sons Goods Transport - Reliable Transport Services",
  description: "Professional goods transportation services across Pakistan. Mazdas, Hyundais, Shehzores, and Special Container services. Book your shipment today!",
  keywords: "goods transport, logistics, Pakistan, Mazda transport, Hyundai transport, container service",
};

import { AdminProvider } from "@/context/AdminContext";
import ConditionalShell from "@/components/ConditionalShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AdminProvider>
          <ConditionalShell>
            {children}
          </ConditionalShell>
        </AdminProvider>
      </body>
    </html>
  );
}

