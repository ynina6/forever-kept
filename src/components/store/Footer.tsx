import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { site } from "@/config/site";
import { visibleCategories } from "@/data/categories";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-xl tracking-[0.2em] uppercase">
            {site.brandName}
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Personalized engraved tags made to hold the words, names and memories
            that matter most.
          </p>
        </div>

        <FooterColumn title="Shop">
          {visibleCategories.map((category) => (
            <Link
              key={category.slug}
              to="/shop/$category"
              params={{ category: category.slug }}
              className="footer-link"
            >
              {category.navLabel}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Help">
          <Link to="/faq" className="footer-link">
            FAQ
          </Link>
          <Link to="/faq" hash="shipping" className="footer-link">
            Shipping
          </Link>
          <Link to="/about" hash="contact" className="footer-link">
            Contact
          </Link>
          <Link to="/personalize" className="footer-link">
            Personalization
          </Link>
        </FooterColumn>

        <div className="space-y-10">
          <FooterColumn title="About">
            <Link to="/about" className="footer-link">
              Our Story
            </Link>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              Instagram
            </a>
          </FooterColumn>
          <FooterColumn title="Legal">
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-link">
              Terms &amp; Conditions
            </Link>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell grid gap-6 py-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="display-md uppercase">Words worth keeping</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              New designs, meaningful gift ideas and special releases.
            </p>
          </div>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                toast.error("Please enter a valid email address.");
                return;
              }
              setEmail("");
              toast.success("Thank you. You're on the list.");
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-sm border border-input bg-background px-4 py-3.5 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="label-xs rounded-sm bg-foreground px-6 py-3.5 text-background transition-opacity hover:opacity-90"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.brandName}. All rights reserved.
          </p>
          <p>Personalized items are made to order.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label-xs text-foreground">{title}</p>
      <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground [&_.footer-link]:transition-colors [&_.footer-link:hover]:text-primary">
        {children}
      </div>
    </div>
  );
}
