import { PageHeader } from "@/components/PageHeader";
import { KeranjangClient } from "@/components/KeranjangClient";

export default function KeranjangPage() {
  return (
    <>
      <PageHeader eyebrow="Order" title="Keranjang Belanja" />
      <div className="section-light mx-auto max-w-lg px-4 py-10">
        <KeranjangClient />
      </div>
    </>
  );
}
