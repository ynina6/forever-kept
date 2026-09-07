import { createFileRoute } from "@tanstack/react-router";

import { PersonalizationForm } from "@/components/store/PersonalizationForm";
import { SectionHeading } from "@/components/store/SectionHeading";

export const Route = createFileRoute("/personalize")({
  head: () => ({
    meta: [
      { title: "Create Your Tag | Personalized Engraving" },
      {
        name: "description",
        content:
          "Personalize an engraved tag with a name, a special date, your own message and your chosen engraving language.",
      },
      { property: "og:title", content: "Create Your Tag | Personalized Engraving" },
      {
        property: "og:description",
        content: "Your words. Your story. Your tag.",
      },
      { property: "og:url", content: "/personalize" },
    ],
    links: [{ rel: "canonical", href: "/personalize" }],
  }),
  component: PersonalizePage,
});

function PersonalizePage() {
  return (
    <div className="shell py-14 md:py-20">
      <SectionHeading
        align="left"
        label="Personalization"
        title="Your words. Your story. Your tag."
        subtitle="Create something completely personal."
      />
      <div className="mt-12">
        <PersonalizationForm allowDesignChoice />
      </div>
    </div>
  );
}
