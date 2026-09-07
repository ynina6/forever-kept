import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/config/site";
import { categories, visibleCategories } from "@/data/categories";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const navLinkClass =
  "label-xs text-foreground/80 transition-colors hover:text-primary";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="-ml-1 p-2 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-[0.2em] uppercase md:text-xl">
            {site.brandName}
          </span>
          <span className="label-xs hidden text-[0.55rem] text-muted-foreground md:block">
            {site.brandTagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link to="/shop" className={navLinkClass}>
            Shop
          </Link>
          {visibleCategories
            .filter((category) => category.slug !== "custom")
            .map((category) => (
              <Link
                key={category.slug}
                to="/shop/$category"
                params={{ category: category.slug }}
                className={navLinkClass}
              >
                {category.navLabel}
              </Link>
            ))}
          <Link
            to="/shop/$category"
            params={{ category: "custom" }}
            className={navLinkClass}
          >
            Custom
          </Link>
          <Link to="/about" className={navLinkClass}>
            About
          </Link>
          <Link to="/faq" className={navLinkClass}>
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((value) => !value)}
            className="p-2 text-foreground/80 transition-colors hover:text-primary"
          >
            <Search className="size-[1.15rem]" />
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative p-2 text-foreground/80 transition-colors hover:text-primary"
          >
            <ShoppingBag className="size-[1.15rem]" />
            {count > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-primary text-[0.6rem] font-medium text-primary-foreground">
                {count}
              </span>
            ) : null}
          </Link>
          <Link
            to="/personalize"
            className="label-xs ml-1 hidden rounded-sm bg-primary px-4 py-3 text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            Create Your Tag
          </Link>
        </div>
      </div>

      {searchOpen ? (
        <div className="border-t border-border bg-background">
          <div className="shell py-4">
            <label htmlFor="site-search" className="sr-only">
              Search designs
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="Search designs, e.g. daughter"
              className="w-full border-b border-input bg-transparent pb-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Browse the full collection in Shop while search is being finished.
            </p>
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height] duration-500 md:hidden",
          open ? "max-h-[34rem]" : "max-h-0",
        )}
      >
        <nav className="shell flex flex-col gap-1 py-4">
          <MobileLink to="/shop" onClick={() => setOpen(false)}>
            Shop
          </MobileLink>
          {categories.map((category) => (
            <MobileLink
              key={category.slug}
              to="/shop/$category"
              params={{ category: category.slug }}
              onClick={() => setOpen(false)}
            >
              {category.navLabel}
              {category.comingSoon ? (
                <span className="ml-2 text-[0.6rem] text-muted-foreground">
                  Coming soon
                </span>
              ) : null}
            </MobileLink>
          ))}
          <MobileLink to="/about" onClick={() => setOpen(false)}>
            About
          </MobileLink>
          <MobileLink to="/faq" onClick={() => setOpen(false)}>
            FAQ
          </MobileLink>
          <Link
            to="/personalize"
            onClick={() => setOpen(false)}
            className="label-xs mt-3 rounded-sm bg-primary px-4 py-4 text-center text-primary-foreground"
          >
            Create Your Tag
          </Link>
        </nav>
      </div>
    </header>
  );
}

function MobileLink({
  to,
  params,
  onClick,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to as never}
      params={params as never}
      onClick={onClick}
      className="label-xs border-b border-border/60 py-4 text-foreground/85"
    >
      {children}
    </Link>
  );
}
