import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { PersonalizationForm } from "@/components/store/PersonalizationForm";
import { ProductCard } from "@/components/store/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatPrice, productSettings } from "@/config/site";
import { faqItems } from "@/data/faq";
import { productBySlug, products } from "@/data/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Design unavailable" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.title} | Personalized Engraved Tag` },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: product.title },
        { property: "og:description", content: product.shortDescription },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const main = product.images[active] ?? product.images[0];
  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="pb-28 md:pb-0">
      <div className="shell py-8 md:py-14">
        <Link
          to="/shop/$category"
          params={{ category: product.category }}
          className="label-xs text-muted-foreground hover:text-primary"
        >
          ← Back to collection
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden rounded-sm bg-secondary">
              {main ? (
                <img
                  src={main.localPath}
                  alt={main.alt}
                  width={main.width}
                  height={main.height}
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-4/5 w-full object-cover"
                />
              ) : null}
            </div>
            {product.images.length > 1 ? (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`View image ${index + 1}`}
                    className={
                      index === active
                        ? "overflow-hidden rounded-sm ring-1 ring-primary"
                        : "overflow-hidden rounded-sm ring-1 ring-transparent hover:ring-border"
                    }
                  >
                    <img
                      src={image.localPath}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Info + personalization */}
          <div>
            <p className="label-xs text-primary">{product.recipient}</p>
            <h1 className="display-md mt-3">{product.title}</h1>
            <p className="mt-4 text-lg">{formatPrice(product.price)}</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            <div className="mt-10">
              <PersonalizationForm product={product} compact />
            </div>
          </div>
        </div>

        {/* Details */}
        <section className="mx-auto mt-20 max-w-3xl">
          <Accordion type="single" collapsible defaultValue="story">
            <AccordionItem value="story">
              <AccordionTrigger className="font-sans text-[0.95rem] font-medium">
                Product story
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="personalization">
              <AccordionTrigger className="font-sans text-[0.95rem] font-medium">
                Personalization
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Add a name, a special date and your own message. Engraving can be
                  requested in {product.languageOptions.join(", ")}.
                </p>
                <p>{productSettings.materialAnswer}</p>
                <p>
                  Previews are for placement reference only. Please review spelling
                  carefully before ordering.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="font-sans text-[0.95rem] font-medium">
                Shipping
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <p>{productSettings.shippingAnswer}</p>
                <p>{productSettings.productionTimeAnswer}</p>
              </AccordionContent>
            </AccordionItem>
            {faqItems.slice(0, 4).map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-left font-sans text-[0.95rem] font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {related.length ? (
          <section className="mt-24">
            <h2 className="label-xs text-muted-foreground">You may also like</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="shell flex items-center justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-medium">{formatPrice(product.price)}</p>
            <p className="text-xs text-muted-foreground">{product.recipient}</p>
          </div>
          <a
            href="#name"
            className="label-xs rounded-sm bg-primary px-6 py-3.5 text-primary-foreground"
          >
            Personalize
          </a>
        </div>
      </div>
    </div>
  );
}
