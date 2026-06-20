"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/produk/", label: "Katalog" },
  { href: "/artikel/", label: "Panduan" },
  { href: "/mitra/", label: "Mitra" },
  { href: "/kontak/", label: "Kontak" },
];

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-0.5 md:flex">
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href.slice(0, -1)));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              active
                ? "text-[var(--navy)] font-bold"
                : "text-ink-muted hover:text-[var(--navy)]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
