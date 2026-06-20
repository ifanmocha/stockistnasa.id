"use client";

import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { HeaderNav } from "./HeaderNav";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <div className="header-bar mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--navy)] text-xs font-extrabold text-white">
            SN
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-extrabold leading-tight text-[var(--navy)]">
              StockistNasa<span className="text-[var(--navy-light)]">.id</span>
            </p>
            <p className="text-[10px] font-semibold text-ink-muted">
              AB.{siteConfig.stockistCode} · {siteConfig.city}
            </p>
          </div>
        </Link>

        <HeaderNav />

        <div className="flex items-center gap-2">
          <Link
            href="/keranjang/"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border text-ink transition hover:bg-surface-alt"
            aria-label="Keranjang belanja"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--mint)] px-1 text-[9px] font-bold text-[var(--navy)]">
                {totalItems}
              </span>
            )}
          </Link>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav hidden sm:inline-flex"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Chat
          </a>
        </div>
      </div>
    </header>
  );
}
