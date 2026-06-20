import type { Metadata } from "next";
import { MitraContent } from "@/components/MitraContent";
import { PageHeader } from "@/components/PageHeader";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Daftar Mitra NASA Rp 25.000",
  description: "Gabung mitra NASA via Stockist AB.720 Yogyakarta. Harga distributor, tanpa target.",
  path: "/mitra/",
});

export default function MitraPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bisnis"
        title="Jadi Mitra NASA"
        description="Mulai dengan Rp 25.000 - dapatkan harga distributor resmi PT Natural Nusantara."
      />
      <MitraContent />
    </>
  );
}
