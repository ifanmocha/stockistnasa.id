import { siteConfig } from "@/lib/site";
import type { CartItem } from "@/lib/types";

export function buildWhatsAppUrl(
  message: string,
  phone = siteConfig.phoneIntl,
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildOrderMessage(
  items: CartItem[],
  customer?: { name?: string; city?: string; address?: string; note?: string },
): string {
  const lines = [
    `Halo Stockist NASA AB.${siteConfig.stockistCode},`,
    "",
    "Saya mau pesan dari stockistnasa.id:",
    "",
    ...items.map(
      (item, i) => `${i + 1}. ${item.name} x${item.quantity}`,
    ),
    "",
  ];

  if (customer?.name) lines.push(`Nama: ${customer.name}`);
  if (customer?.city) lines.push(`Kota: ${customer.city}`);
  if (customer?.address) lines.push(`Alamat: ${customer.address}`);
  if (customer?.note) lines.push(`Catatan: ${customer.note}`);

  lines.push("", "Mohon info harga & ongkir. Terima kasih!");
  return lines.join("\n");
}

export function buildMemberMessage(name?: string, city?: string): string {
  return [
    `Halo, saya ingin daftar Mitra NASA melalui Stockist AB.${siteConfig.stockistCode} Yogyakarta.`,
    "",
    name ? `Nama: ${name}` : "Nama: ",
    city ? `Kota: ${city}` : "Kota: ",
    "",
    "Mohon info cara pendaftaran. Terima kasih!",
  ].join("\n");
}

export function buildConsultMessage(productName?: string): string {
  return productName
    ? `Halo Stockist NASA AB.${siteConfig.stockistCode}, saya ingin konsultasi tentang produk ${productName}.`
    : `Halo Stockist NASA AB.${siteConfig.stockistCode}, saya ingin konsultasi produk NASA.`;
}

export function buildQuickOrderMessage(productName: string): string {
  return [
    `Halo Stockist NASA AB.${siteConfig.stockistCode},`,
    `Saya mau pesan *${productName}* dari stockistnasa.id.`,
    "",
    "Mohon info harga & ongkir. Terima kasih!",
  ].join("\n");
}
