"use client";

import { MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildQuickOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function ProductStickyCTA({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const { addItem } = useCart();
  const waUrl = buildWhatsAppUrl(buildQuickOrderMessage(name));

  return (
    <div
      className="fixed bottom-[5.75rem] left-3 right-3 z-40 md:bottom-6 md:left-auto md:right-6 md:w-[22rem]"
      role="region"
      aria-label="Aksi pemesanan cepat"
    >
      <div className="header-bar flex gap-2 p-2">
        <button
          type="button"
          onClick={() => addItem({ slug, name })}
          className="btn-primary btn-sm min-w-0 flex-1 whitespace-nowrap"
        >
          <ShoppingBag className="h-4 w-4 shrink-0" />
          <span>Keranjang</span>
        </button>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-sm min-w-0 flex-1 whitespace-nowrap"
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          <span>Pesan WA</span>
        </a>
      </div>
    </div>
  );
}
