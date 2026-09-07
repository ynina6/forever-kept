import { Link } from "@tanstack/react-router";
import { categoryImages, type Category } from "@/data/categories";
import { cn } from "@/lib/utils";

export function CategoryCard({
  category,
  imageIndex = 0,
  className,
  priority = false,
}: {
  category: Category;
  imageIndex?: number;
  className?: string;
  priority?: boolean;
}) {
  const images = categoryImages(category);
  const image = images[imageIndex % Math.max(images.length, 1)];

  if (category.comingSoon || !image) {
    return (
      <div
        className={cn(
          "flex flex-col justify-end rounded-sm border border-border bg-secondary/60 p-6",
          "aspect-4/5",
          className,
        )}
      >
        <p className="label-xs text-muted-foreground">Coming soon</p>
        <h3 className="display-md mt-2 uppercase">{category.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          New designs are on the way.
        </p>
      </div>
    );
  }

  return (
    <Link
      to="/shop/$category"
      params={{ category: category.slug }}
      className={cn("group block", className)}
    >
      <div className="overflow-hidden rounded-sm bg-secondary">
        <div className="aspect-4/5 w-full overflow-hidden">
          <img
            src={image.localPath}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>
      </div>
      <div className="pt-4">
        <h3 className="font-display text-2xl uppercase">{category.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{category.shortLine}</p>
        <span className="label-xs mt-3 inline-flex items-center gap-2 text-primary">
          Shop now
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
