import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Personalized Engraved Tags" },
      {
        name: "description",
        content:
          "How we handle the information you share when ordering a personalized engraved tag.",
      },
      { property: "og:title", content: "Privacy Policy" },
      {
        property: "og:description",
        content: "How your order and personalization information is handled.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="shell max-w-3xl py-14 md:py-20">
      <h1 className="display-md uppercase">Privacy policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This is a starting template. Review and adapt it with your own legal
        advisor before selling.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-sans text-base font-medium text-foreground">
            Information we collect
          </h2>
          <p className="mt-3">
            To produce and deliver an order we collect the personalization
            details you enter (name, date, message, engraving language, notes and
            any uploaded photo), your contact email and your delivery address.
          </p>
        </section>
        <section>
          <h2 className="font-sans text-base font-medium text-foreground">
            How we use it
          </h2>
          <p className="mt-3">
            Personalization details are used only to engrave and ship your order
            and to contact you about it. We do not sell your information.
          </p>
        </section>
        <section>
          <h2 className="font-sans text-base font-medium text-foreground">
            Cart storage
          </h2>
          <p className="mt-3">
            Your cart is stored locally in your own browser so your
            personalization is not lost if you leave the page. Clearing your
            browser storage removes it.
          </p>
        </section>
        <section>
          <h2 className="font-sans text-base font-medium text-foreground">
            Contact
          </h2>
          <p className="mt-3">
            Questions about your data: {site.contactEmail}
          </p>
        </section>
      </div>
    </article>
  );
}
