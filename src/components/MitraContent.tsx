"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buildMemberMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const benefits = [
  "Harga distributor 30-40% lebih murah dari eceran",
  "Tanpa target penjualan dan tanpa biaya bulanan",
  "ID mitra resmi PT Natural Nusantara",
  "Kelola bisnis lewat aplikasi NASA",
  "Pendampingan langsung dari stockist AB.720",
  "Beli untuk sendiri pun sudah untung",
];

export function MitraContent() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const waUrl = buildWhatsAppUrl(buildMemberMessage(name, city));

  return (
    <div className="section-light mx-auto max-w-3xl px-4 py-12">
      <div className="panel-dark overflow-hidden text-center">
        <div className="p-8 md:p-12">
          <p className="eyebrow">Gabung jaringan NASA</p>
          <p className="mt-4 text-5xl font-bold md:text-6xl">
            Rp {siteConfig.memberFee.toLocaleString("id-ID")}
          </p>
          <p className="mt-2 text-sm text-white/70">Sekali bayar · harga mitra seumur hidup</p>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {benefits.map((b) => (
          <div key={b} className="card flex items-start gap-3 p-4">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mint-dark)]" />
            <span className="text-sm text-ink-muted">{b}</span>
          </div>
        ))}
      </div>

      <div className="card mt-10 p-6">
        <h2 className="text-xl font-bold text-ink">Form pendaftaran</h2>
        <p className="mt-1 text-sm text-ink-muted">Isi data, lalu lanjut ke WhatsApp</p>
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
          />
          <input
            type="text"
            placeholder="Kota domisili"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/20"
          />
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex w-full"
          >
            <MessageCircle className="h-5 w-5" />
            Daftar via WhatsApp
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-ink-muted">
        Mau belanja dulu?{" "}
        <Link href="/produk/" className="font-bold text-[var(--navy)] hover:underline">
          Lihat katalog
        </Link>
      </p>
    </div>
  );
}
