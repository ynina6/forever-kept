import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";

import { formatPrice } from "@/config/site";
import { useCart, type CartItem } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Personalized Engraved Tags" },
      {
        name: "description",
        content:
          "Review your personalized engraved tags, check your engraving details and continue to checkout.",
      },
      { property: "og:title", content: "Your Cart" },
      {
        property: "og:description",
        content: "Review your personalization before checkout.",
      },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="shell py-14 md:py-20">
      <h1 className="display-md uppercase">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-sm border border-border bg-secondary/40 p-12 text-center">
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          <Link
            to="/shop"
            className="label-xs mt-8 inline-flex rounded-sm bg-primary px-8 py-4 text-primary-foreground"
          >
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <CartRow
                key={item.key}
                item={item}
                onQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </ul>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm border border-border bg-card p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="label-xs text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Shipping and taxes are calculated at checkout.
              </p>
              <Link
                to="/checkout"
                className="label-xs mt-6 block rounded-sm bg-primary px-6 py-4 text-center text-primary-foreground transition-opacity hover:opacity-90"
              >
                Checkout
              </Link>
              <p className="mt-4 text-xs text-muted-foreground">
                Please review spelling carefully before ordering personalized
                items.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function CartRow({
  item,
  onQuantity,
  onRemove,
}: {
  item: CartItem;
  onQuantity: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}) {
  const { personalization: p } = item;
  const summary = [
    p.recipient && `For: ${p.recipient}`,
    p.name && `Name: ${p.name}`,
    p.date && `Date: ${p.date}`,
    p.message && `Message: “${p.message}”`,
    p.language && `Language: ${p.language}`,
    p.instructions && `Notes: ${p.instructions}`,
    p.photoName && `Photo: ${p.photoName}`,
  ].filter(Boolean) as string[];

  return (
    <li className="flex gap-4 py-6 sm:gap-6">
      <Link
        to="/product/$slug"
        params={{ slug: item.slug }}
        className="w-24 shrink-0 overflow-hidden rounded-sm bg-secondary sm:w-28"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            className="aspect-4/5 w-full object-cover"
          />
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-sans text-sm font-medium">{item.title}</h2>
            <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
              {summary.map((line) => (
                <li key={line} className="break-words">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm whitespace-nowrap">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <label className="sr-only" htmlFor={`qty-${item.key}`}>
            Quantity
          </label>
          <input
            id={`qty-${item.key}`}
            type="number"
            min={1}
            max={20}
            value={item.quantity}
            onChange={(event) =>
              onQuantity(item.key, Number(event.target.value) || 1)
            }
            className="w-20 rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => onRemove(item.key)}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="size-4" />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
