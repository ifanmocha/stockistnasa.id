"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function KeranjangClient() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const waUrl =
    items.length > 0
      ? buildWhatsAppUrl(buildOrderMessage(items, { name, city, address, note }))
      : "#";

  if (items.length === 0) {
    return (
      <div className="card border-dashed p-12 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-ink-muted/40" />
        <p className="mt-4 font-medium text-ink-muted">Keranjang masih kosong</p>
        <Link href="/produk/" className="mt-4 inline-block text-sm font-bold text-[var(--navy)]">
          Jelajahi katalog →
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.slug}
            className="card flex items-center gap-4 p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-ink">{item.name}</p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-background"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:bg-background"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.slug)}
              className="rounded-lg p-2 text-[var(--navy)] hover:bg-surface-alt"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <div className="card mt-8 space-y-3 p-5">
        <h2 className="text-sm font-bold text-ink">Data pengiriman</h2>
        <input
          type="text"
          placeholder="Nama lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-[var(--navy)] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Kota"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-[var(--navy)] focus:outline-none"
        />
        <textarea
          placeholder="Alamat lengkap"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={2}
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-[var(--navy)] focus:outline-none"
        />
        <input
          type="text"
          placeholder="Catatan (opsional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:border-[var(--navy)] focus:outline-none"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex"
        >
          <MessageCircle className="h-5 w-5" />
          Kirim pesanan via WhatsApp
        </a>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-xl border border-border py-2.5 text-sm font-semibold text-ink-muted hover:bg-background"
        >
          Kosongkan keranjang
        </button>
      </div>
    </>
  );
}
