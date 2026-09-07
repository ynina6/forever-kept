import { createFileRoute, Link } from "@tanstack/react-router";

import { ProductCard } from "@/components/store/ProductCard";
import { SectionHeading } from "@/components/store/SectionHeading";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Personalized Engraved Tags | All Designs" },
      {
        name: "description",
        content:
          "Browse all personalized engraved tags — designs for daughters, sons, mothers, fathers, partners and your own custom message.",
      },
      { property: "og:title", content: "Shop Personalized Engraved Tags" },
      {
        property: "og:description",
        content:
          "Browse every engraved keepsake design and personalize it with your own words.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopIndex,
});

function ShopIndex() {
  return (
    <div className="shell py-14 md:py-20">
      <SectionHeading
        align="left"
        label="Shop"
        title="The collection"
        subtitle="Small enough to carry. Meaningful enough to keep."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((category) =>
          category.comingSoon ? (
            <span
              key={category.slug}
              className="label-xs rounded-sm border border-dashed border-border px-4 py-3 text-muted-foreground"
            >
              {category.navLabel} · soon
            </span>
          ) : (
            <Link
              key={category.slug}
              to="/shop/$category"
              params={{ category: category.slug }}
              className="label-xs rounded-sm border border-border px-4 py-3 transition-colors hover:border-primary hover:text-primary"
            >
              {category.navLabel}
            </Link>
          ),
        )}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            priority={index < 4}
          />
        ))}
      </div>
    </div>
  );
}
