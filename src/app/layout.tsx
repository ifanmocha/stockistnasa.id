import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CartProvider } from "@/context/CartContext";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.domain),
  keywords: [
    "stockist nasa",
    "stockist nasa yogyakarta",
    "distributor nasa",
    "produk nasa original",
    "AB.720",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: "StockistNasa.id",
    locale: "id_ID",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased pb-28 md:pb-0">
        <CartProvider>
          <JsonLd data={localBusinessSchema()} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
