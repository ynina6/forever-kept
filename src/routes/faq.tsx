import { createFileRoute, Link } from "@tanstack/react-router";

import { FaqSection } from "@/components/store/FaqSection";
import { faqItems } from "@/data/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Personalization, Languages, Shipping" },
      {
        name: "description",
        content:
          "Answers about personalization, engraving languages, photo uploads, production times, material, shipping, quantities and preview limitations.",
      },
      { property: "og:title", content: "Frequently Asked Questions" },
      {
        property: "og:description",
        content:
          "Personalization, languages, photos, production times, material, shipping and previews.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="py-14 md:py-20">
      <FaqSection />
      <div className="shell mt-12 text-center">
        <Link
          to="/personalize"
          className="label-xs inline-flex rounded-sm bg-primary px-8 py-4 text-primary-foreground"
        >
          Create your tag
        </Link>
      </div>
    </div>
  );
}
