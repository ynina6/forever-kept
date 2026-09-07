import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ProductCard } from "@/components/store/ProductCard";
import { PersonalizationForm } from "@/components/store/PersonalizationForm";
import { SectionHeading } from "@/components/store/SectionHeading";
import { categoryBySlug, categoryImages } from "@/data/categories";
import { productsByCategory } from "@/data/products";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Collection unavailable" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: category.seoTitle },
        { name: "description", content: category.seoDescription },
        { property: "og:title", content: category.seoTitle },
        { property: "og:description", content: category.seoDescription },
        { property: "og:url", content: `/shop/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/shop/${params.category}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = productsByCategory(category.slug);
  const images = categoryImages(category);

  return (
    <div className="shell py-14 md:py-20">
      <Link to="/shop" className="label-xs text-muted-foreground hover:text-primary">
        ← All designs
      </Link>

      <div className="mt-8">
        <SectionHeading
          align="left"
          label="Collection"
          title={category.title}
          subtitle={category.subtitle}
        />
      </div>

      {category.comingSoon ? (
        <div className="mt-14 rounded-sm border border-dashed border-border bg-secondary/40 p-12 text-center">
          <p className="label-xs text-primary">Coming soon</p>
          <h2 className="display-md mt-3 uppercase">
            This collection is on its way
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            We&rsquo;re preparing designs for this collection. In the meantime, you
            can create a fully custom tag with your own words.
          </p>
          <Link
            to="/personalize"
            className="label-xs mt-8 inline-flex rounded-sm bg-primary px-8 py-4 text-primary-foreground"
          >
            Create your tag
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {items.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>

          {category.slug === "custom" ? (
            <section className="mt-24">
              <SectionHeading
                align="left"
                label="Custom"
                title="Your words. Your story. Your tag."
                subtitle="Create something completely personal."
              />
              <div className="mt-10">
                <PersonalizationForm allowDesignChoice />
              </div>
            </section>
          ) : null}

          {images.length > items.length ? (
            <section className="mt-24">
              <h2 className="label-xs text-muted-foreground">
                More from this collection
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                {images.slice(0, 8).map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-sm bg-secondary"
                  >
                    <img
                      src={image.localPath}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
