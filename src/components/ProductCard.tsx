import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/lib/types";
import { categories } from "@/lib/site";
import { buildQuickOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const categoryColors: Record<string, string> = {
  pertanian: "bg-emerald-50 text-emerald-800",
  peternakan: "bg-amber-50 text-amber-800",
  herbal: "bg-sky-50 text-sky-800",
  bodycare: "bg-rose-50 text-rose-800",
  homecare: "bg-violet-50 text-violet-800",
  teknologi: "bg-teal-50 text-teal-800",
};

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "grid" | "horizontal" | "featured";
}) {
  const category = categories.find((c) => c.slug === product.category);
  const catStyle = categoryColors[product.category] ?? "bg-brand-light text-brand";
  const waUrl = buildWhatsAppUrl(buildQuickOrderMessage(product.name));

  if (variant === "horizontal") {
    return (
      <article className="card card-hover group flex gap-4 p-4">
        <Link
          href={`/produk/${product.slug}/`}
          className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl ${catStyle.split(" ")[0]}`}
        >
          <Image src={product.image} alt={product.name} fill className="object-contain p-2" sizes="96px" />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          {category && (
            <span className={`inline-block w-fit rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catStyle}`}>
              {category.name}
            </span>
          )}
          <Link href={`/produk/${product.slug}/`}>
            <h3 className="mt-1 font-bold text-ink group-hover:text-[var(--navy)]">{product.name}</h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{product.shortDescription}</p>
        </div>
        <div className="hidden shrink-0 flex-col justify-center sm:flex">
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
            <MessageCircle className="h-3.5 w-3.5" />
            Pesan
          </a>
        </div>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="card card-hover group relative overflow-hidden p-6 md:col-span-2 md:row-span-2">
        <div className="relative flex h-full flex-col">
          {category && (
            <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${catStyle}`}>
              {category.name}
            </span>
          )}
          <Link href={`/produk/${product.slug}/`} className="relative mx-auto mt-6 aspect-square w-full max-w-[220px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition duration-500 group-hover:scale-105"
              sizes="220px"
            />
          </Link>
          <div className="mt-auto pt-6">
            <Link href={`/produk/${product.slug}/`}>
              <h3 className="text-2xl font-bold text-ink">{product.name}</h3>
            </Link>
            <p className="mt-2 text-sm text-ink-muted">{product.shortDescription}</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-sm mt-4"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Pesan sekarang
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link
        href={`/produk/${product.slug}/`}
        className={`relative aspect-[4/3] ${catStyle.split(" ")[0]}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-5 transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        {category && (
          <span className={`w-fit rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${catStyle}`}>
            {category.name}
          </span>
        )}
        <Link href={`/produk/${product.slug}/`}>
          <h3 className="mt-2 font-bold text-ink group-hover:text-[var(--navy)]">{product.name}</h3>
        </Link>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-muted line-clamp-2">
          {product.shortDescription}
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-sm mt-4 w-full text-center"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Pesan
        </a>
      </div>
    </article>
  );
}
