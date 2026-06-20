"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const isProductDetail =
    pathname.startsWith("/produk/") && pathname !== "/produk/";

  if (isProductDetail) return null;

  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 left-4 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-[var(--navy)] text-white shadow-lg transition hover:scale-105 md:bottom-6 md:flex"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
