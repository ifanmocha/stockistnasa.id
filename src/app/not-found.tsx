import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-light mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-[var(--navy)]">404</p>
      <h1 className="mt-4 text-xl font-bold text-ink">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-sm text-ink-muted">Mungkin sudah dipindah atau alamatnya salah.</p>
      <Link href="/" className="btn-primary mt-8">
        Kembali ke beranda
      </Link>
    </div>
  );
}
