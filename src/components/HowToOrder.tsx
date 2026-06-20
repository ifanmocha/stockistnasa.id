import { MessageCircle, Package, Truck } from "lucide-react";
import { siteConfig } from "@/lib/site";

const steps = [
  {
    icon: Package,
    step: "01",
    title: "Pilih produk",
    desc: "Jelajahi katalog atau chat kami untuk rekomendasi produk yang tepat.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Konfirmasi via WA",
    desc: "Kirim pesanan lewat WhatsApp. Kami info harga, stok, dan ongkir.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Bayar & terima",
    desc: "Transfer/QRIS, lalu kami kirim ke alamat Anda di seluruh Indonesia.",
  },
];

export function HowToOrder() {
  return (
    <section className="section-white section-pad mx-auto max-w-7xl px-4">
      <div className="text-center">
        <p className="eyebrow-dark">Cara order</p>
        <h2 className="section-heading mt-2">Pesan dalam 3 langkah mudah</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
          Tanpa ribet - cukup WhatsApp ke {siteConfig.phone}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.step} className="card p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--navy)]/10">
              <s.icon className="h-6 w-6 text-[var(--navy)]" />
            </div>
            <p className="mt-4 text-xs font-bold text-[var(--eyebrow-teal)]">{s.step}</p>
            <h3 className="mt-1 text-lg font-bold text-[var(--navy)]">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <MessageCircle className="h-5 w-5" />
          Mulai pesan sekarang
        </a>
      </div>
    </section>
  );
}
