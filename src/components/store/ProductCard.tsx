import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/config/site";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const image = product.images[0];

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden rounded-sm bg-secondary transition-shadow duration-500 group-hover:shadow-lift"
      >
        <div className="aspect-4/5 w-full overflow-hidden">
          {image ? (
            <img
              src={image.localPath}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="label-xs text-muted-foreground">{product.recipient}</p>
        <h3 className="mt-2 font-sans text-[0.95rem] leading-snug font-medium tracking-tight">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            {product.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatPrice(product.price)}
        </p>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="label-xs mt-4 inline-flex w-fit items-center border-b border-foreground/25 pb-1 text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Personalize
        </Link>
      </div>
    </article>
  );
}
