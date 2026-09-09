import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getThemeConfig } from "@/themes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inicio - Bradesco México",
  description: "Tu dinero, en movimiento contigo. Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.",
};

import { ClientPuckProvider } from '@/providers/ClientPuckProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ThemeLayout = getThemeConfig().RootLayout;

  return (
    <html lang="es">
      <ThemeLayout>
        <ClientPuckProvider>
          {children}
        </ClientPuckProvider>
      </ThemeLayout>
    </html>
  );
}
