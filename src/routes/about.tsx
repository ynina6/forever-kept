import { createFileRoute, Link } from "@tanstack/react-router";

import { SectionHeading } from "@/components/store/SectionHeading";
import { productSettings } from "@/config/site";
import { productImages } from "@/data/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | Personalized Engraved Keepsakes" },
      {
        name: "description",
        content:
          "Why we make personalized engraved tags: small keepsakes carrying the words people want to keep close.",
      },
      { property: "og:title", content: "Our Story" },
      {
        property: "og:description",
        content:
          "Small keepsakes carrying the words people want to keep close.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const image = productImages.daughter[0];

  return (
    <div className="shell py-14 md:py-20">
      <SectionHeading
        align="left"
        label="Our story"
        title="Made to be carried, not stored away"
        subtitle="A keepsake is only meaningful if it says something true."
      />

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        {image ? (
          <div className="overflow-hidden rounded-sm bg-secondary">
            <img
              src={image.localPath}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="aspect-4/5 w-full object-cover"
            />
          </div>
        ) : null}

        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            We started with one simple idea: the most meaningful gifts are the
            ones that say something only you would say. Not a slogan — a name, a
            date, a sentence someone will read on a difficult day.
          </p>
          <p>
            Every design in the collection is built around that sentence. You
            choose the words, the language and the details, and we engrave them
            onto a tag small enough to keep in a wallet, on a keyring or close to
            a heart.
          </p>
          <p>{productSettings.materialAnswer}</p>
          <p>
            Engraving can be requested in{" "}
            {productSettings.engravingLanguages
              .filter((language) => language !== "Other")
              .join(", ")}
            , or in another language you specify.
          </p>
          <Link
            to="/personalize"
            className="label-xs inline-flex rounded-sm bg-primary px-8 py-4 text-primary-foreground"
          >
            Create your tag
          </Link>
        </div>
      </div>
    </div>
  );
}
