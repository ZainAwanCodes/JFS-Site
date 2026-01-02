import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jeeway Fateh Sons Goods Transport - Reliable Transport Services",
  description: "Professional goods transportation services across Pakistan. Mazdas, Hyundais, Shehzores, and Special Container services. Book your shipment today!",
  keywords: "goods transport, logistics, Pakistan, Mazda transport, Hyundai transport, container service",
};

import { AdminProvider } from "@/context/AdminContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AdminProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </AdminProvider>
      </body>
    </html>
  );
}

