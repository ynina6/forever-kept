import { createFileRoute } from "@tanstack/react-router";

import { productSettings, site } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Personalized Engraved Tags" },
      {
        name: "description",
        content:
          "Ordering terms for personalized engraved tags, including personalization accuracy, production and shipping.",
      },
      { property: "og:title", content: "Terms of Service" },
      {
        property: "og:description",
        content: "Ordering terms for personalized engraved keepsakes.",
      },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="shell max-w-3xl py-14 md:py-20">
      <h1 className="display-md uppercase">Terms of service</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This is a starting template. Review and adapt it with your own legal
        advisor before selling.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-sans text-base font-medium text-foreground">
            Personalized items
          </h2>
          <p className="mt-3">
            Engraving is produced exactly as submitted. Please check spelling,
            dates and language carefully before ordering — personalized items
            cannot be resold and cannot be corrected after production begins.
          </p>
        </section>
        <section>
          <h2 className="font-sans text-base font-medium text-foreground">
            Previews
          </h2>
          <p className="mt-3">
            Any preview shown during personalization is a placement reference
            only. Final engraving layout, spacing and font rendering may vary.
          </p>
        </section>
        <section>
          <h2 className="font-sans text-base font-medium text-foreground">
            Production and shipping
          </h2>
          <p className="mt-3">{productSettings.productionTimeAnswer}</p>
          <p className="mt-3">{productSettings.shippingAnswer}</p>
        </section>
        <section>
          <h2 className="font-sans text-base font-medium text-foreground">
            Contact
          </h2>
          <p className="mt-3">Questions about an order: {site.contactEmail}</p>
        </section>
      </div>
    </article>
  );
}
