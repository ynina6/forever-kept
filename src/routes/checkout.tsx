import { createFileRoute, Link } from "@tanstack/react-router";

import { formatPrice } from "@/config/site";
import { useCart } from "@/lib/cart";

/**
 * Checkout shell. Intentionally payment-provider agnostic: no fake successful
 * payments. A Stripe / Shopify / Paddle session creation call plugs into
 * handleCheckout() later without touching this layout.
 */
export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Personalized Engraved Tags" },
      {
        name: "description",
        content:
          "Complete your order of personalized engraved tags. Shipping options and production times are shown before payment.",
      },
      { property: "og:title", content: "Checkout" },
      {
        property: "og:description",
        content: "Complete your personalized order.",
      },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

const fieldClass =
  "w-full rounded-sm border border-input bg-background px-4 py-3.5 text-sm outline-none focus:border-primary";
const labelClass = "label-xs mb-2 block text-muted-foreground";

function CheckoutPage() {
  const { items, subtotal } = useCart();

  return (
    <div className="shell py-14 md:py-20">
      <h1 className="display-md uppercase">Checkout</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-sm border border-border bg-secondary/40 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Your cart is empty, so there is nothing to check out yet.
          </p>
          <Link
            to="/shop"
            className="label-xs mt-8 inline-flex rounded-sm bg-primary px-8 py-4 text-primary-foreground"
          >
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            className="space-y-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <fieldset className="space-y-5">
              <legend className="label-xs text-primary">Contact</legend>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input id="email" type="email" required className={fieldClass} />
              </div>
            </fieldset>

            <fieldset className="space-y-5">
              <legend className="label-xs text-primary">Delivery</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className={labelClass}>
                    First name
                  </label>
                  <input id="first-name" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="last-name" className={labelClass}>
                    Last name
                  </label>
                  <input id="last-name" required className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="address" className={labelClass}>
                  Address
                </label>
                <input id="address" required className={fieldClass} />
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input id="city" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="postcode" className={labelClass}>
                    Postal code
                  </label>
                  <input id="postcode" required className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="country" className={labelClass}>
                    Country
                  </label>
                  <input id="country" required className={fieldClass} />
                </div>
              </div>
            </fieldset>

            <div className="rounded-sm border border-dashed border-border bg-secondary/40 p-6">
              <p className="label-xs text-primary">Payment</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Payment is not connected yet. Once a payment provider is enabled,
                the secure payment step appears here — no order is charged or
                confirmed in the meantime.
              </p>
            </div>
          </form>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm border border-border bg-card p-6">
              <p className="label-xs text-muted-foreground">Order summary</p>
              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="size-16 shrink-0 rounded-sm object-cover"
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-xs">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="label-xs text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Shipping options and production times are shown before payment.
                Please review spelling carefully before ordering personalized
                items.
              </p>
              <Link
                to="/cart"
                className="label-xs mt-6 block rounded-sm border border-input px-6 py-4 text-center"
              >
                Back to cart
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
