import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "sonner";
import { AnalyticsPage } from "./page";
import { Suspense } from "react";
  


export const metadata: Metadata = {
  title: "Novak & Gouveia",
  description:
    "Gerenciador da consutoria, visualise o seu processo com o nosso dashboard",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AnalyticsPage />
              <Suspense>
                {/* FloatingChat removido temporariamente para investigar erro de runtime */}
              </Suspense>
              <Toaster richColors position="bottom-right" />
           
      </body>
    </html>
  );
  }