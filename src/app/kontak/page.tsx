import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Hubungi Stockist NASA Yogyakarta",
  description: `Hubungi Stockist AB.720 Yogyakarta. WA ${siteConfig.phone}.`,
  path: "/kontak/",
});

export default function KontakPage() {
  const cards = [
    {
      icon: Phone,
      title: "WhatsApp",
      content: siteConfig.phone,
      href: siteConfig.whatsappUrl,
      accent: "text-[var(--navy)]",
    },
    {
      icon: MapPin,
      title: "Lokasi",
      content: siteConfig.address,
    },
    {
      icon: Clock,
      title: "Jam layanan",
      content: "Senin – Minggu, 08:00 – 21:00 WIB",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title="Hubungi Kami"
        description={`Stockist resmi AB.${siteConfig.stockistCode} di ${siteConfig.city}. Senang membantu!`}
      />
      <div className="section-white mx-auto max-w-3xl px-4 section-pad">
        <div className="grid gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="card flex items-start gap-4 p-6"
            >
              <div className={`rounded-xl bg-surface-alt p-3 ${card.accent ?? "text-[var(--navy)]"}`}>
                <card.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-ink">{card.title}</h2>
                {card.href ? (
                  <a href={card.href} className="mt-1 block font-semibold text-[var(--navy)] hover:underline">
                    {card.content}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-ink-muted">{card.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="panel-dark mt-10 p-8 text-center">
          <p className="text-xl font-bold text-white">Paling cepat via WhatsApp</p>
          <p className="mt-2 text-sm text-white/70">Konsultasi produk, cek harga, atau order</p>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 inline-flex"
          >
            Chat sekarang
          </a>
        </div>
      </div>
    </>
  );
}
