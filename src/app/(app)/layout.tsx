import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "@/themes/legacy-elementor/styles/wp-elementor-globals.css";
import { getThemeConfig } from "@/themes";
import { ClientPuckProvider } from '@/providers/ClientPuckProvider';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inicio - Bradesco México",
  description: "Tu dinero, en movimiento contigo. Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ThemeLayout = getThemeConfig().RootLayout;

  return (
    <html lang="es" className={inter.variable}>
      <ThemeLayout>
        <ClientPuckProvider>
          {children}
        </ClientPuckProvider>
      </ThemeLayout>
    </html>
  );
}
