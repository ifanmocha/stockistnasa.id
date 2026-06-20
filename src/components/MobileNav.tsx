"use client";

import Link from "next/link";
import { Home, Grid3x3, ShoppingBag, MessageCircle, UserPlus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/lib/site";

export function MobileNav() {
  const { totalItems } = useCart();

  const items = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/produk/", icon: Grid3x3, label: "Katalog" },
    { href: "/keranjang/", icon: ShoppingBag, label: "Order", badge: totalItems },
    { href: siteConfig.whatsappUrl, icon: MessageCircle, label: "Chat", external: true, highlight: true },
    { href: "/mitra/", icon: UserPlus, label: "Mitra" },
  ];

  return (
    <nav className="fixed bottom-4 left-3 right-3 z-50 md:hidden">
      <div className="header-bar flex items-center justify-between px-1.5 py-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const inner = (
            <>
              <div className="relative">
                <Icon className={`h-5 w-5 ${item.highlight ? "text-[var(--mint-dark)]" : "text-[var(--navy)]"}`} />
                {item.badge ? (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--mint)] px-1 text-[9px] font-bold text-[var(--navy)]">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[9px] font-bold ${item.highlight ? "text-[var(--navy)]" : "text-ink-muted"}`}>
                {item.label}
              </span>
            </>
          );

          const cls = "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2";

          if (item.external) {
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            );
          }

          return (
            <Link key={item.label} href={item.href} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
