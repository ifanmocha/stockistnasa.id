import Link from "next/link";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="section-dark mt-auto">
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mint)] text-sm font-extrabold text-[var(--navy)]">
              SN
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Stockist resmi PT Natural Nusantara AB.{siteConfig.stockistCode} di{" "}
              {siteConfig.city}. Produk original, konsultasi gratis, pengiriman nasional.
            </p>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Menu</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li><Link href="/produk/" className="hover:text-white">Katalog</Link></li>
                <li><Link href="/artikel/" className="hover:text-white">Panduan</Link></li>
                <li><Link href="/mitra/" className="hover:text-white">Gabung Mitra</Link></li>
                <li><Link href="/stockist-nasa-yogyakarta/" className="hover:text-white">Lokasi</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Bantuan</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li><Link href="/kontak/" className="hover:text-white">Kontak</Link></li>
                <li><Link href="/keranjang/" className="hover:text-white">Keranjang</Link></li>
                <li>
                  <a href={siteConfig.whatsappUrl} className="inline-flex items-center gap-1 hover:text-white">
                    Konsultasi <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Alamat</p>
            <div className="mt-4 flex gap-2 text-sm text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mint)]" />
              <span>
                {siteConfig.address}
                <br />
                Pengiriman {siteConfig.shipping}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} stockistnasa.id</span>
          <span>AB.{siteConfig.stockistCode} · PT Natural Nusantara</span>
        </div>
      </div>
    </footer>
  );
}
