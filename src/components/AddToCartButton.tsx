"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem({ slug: product.slug, name: product.name })}
      className="btn-secondary"
    >
      <ShoppingBag className="h-4 w-4" />
      + Keranjang
    </button>
  );
}
