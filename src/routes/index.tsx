import { createFileRoute, Link } from "@tanstack/react-router";
import { PenLine, Sparkles, Stamp } from "lucide-react";

import { CategoryCard } from "@/components/store/CategoryCard";
import { FaqSection } from "@/components/store/FaqSection";
import { PersonalizationForm } from "@/components/store/PersonalizationForm";
import { ProductCard } from "@/components/store/ProductCard";
import { Reveal } from "@/components/store/Reveal";
import { SectionHeading } from "@/components/store/SectionHeading";
import { site } from "@/config/site";
import { visibleCategories, categories } from "@/data/categories";
import { imageById, productImages } from "@/data/images";
import { bestsellers } from "@/data/products";
import { reviews } from "@/data/reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Personalized Engraved Tags | Meaningful Gifts Made Personal" },
      {
        name: "description",
        content:
          "Create personalized engraved tags with names, dates and meaningful messages for daughters, sons, parents, partners and the people who matter most.",
      },
      {
        property: "og:title",
        content: "Personalized Engraved Tags | Meaningful Gifts Made Personal",
      },
      {
        property: "og:description",
        content:
          "Personalized engraved tags made to hold the words, names and memories that matter most.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: site.brandName,
          description:
            "Personalized engraved tags made to hold the words, names and memories that matter most.",
        }),
      },
    ],
  }),
  component: Home,
});

const hero = imageById("for-her-06") ?? productImages["for-her"][0];
const storyImage = imageById("daughter-01") ?? productImages.daughter[0];
const customImage = imageById("custom-02") ?? productImages.custom[0];
const finalImage = imageById("custom-08") ?? productImages.custom[1];
const instagramImages = [
  "daughter-08",
  "son-01",
  "mom-01",
  "dad-01",
  "for-her-02",
  "custom-06",
]
  .map((id) => imageById(id))
  .filter((image): image is NonNullable<typeof image> => Boolean(image));

const steps = [
  {
    number: "01",
    title: "Choose a design",
    copy: "Find a message created for someone special.",
    Icon: Sparkles,
  },
  {
    number: "02",
    title: "Make it yours",
    copy: "Add a name, date, message or your own words.",
    Icon: PenLine,
  },
  {
    number: "03",
    title: "We engrave it",
    copy: "Your personalized piece is prepared and made ready for delivery.",
    Icon: Stamp,
  },
];

const benefits = [
  { title: "Personal", copy: "Created around your words and your story." },
  { title: "Made to last", copy: "A keepsake designed to stay with them." },
  {
    title: "Meaningful",
    copy: "A gift that says more than something ordinary.",
  },
  {
    title: "Uniquely theirs",
    copy: "Names, dates and personal messages make every piece different.",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="shell grid gap-10 pt-10 pb-16 md:grid-cols-2 md:items-center md:gap-16 md:pt-20 md:pb-24">
        <div className="order-2 md:order-1">
          <p className="label-xs text-primary">Engraved keepsakes</p>
          <h1 className="display-xl mt-5 uppercase">
            A message
            <br />
            they&rsquo;ll carry forever.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Personalized engraved tags made to hold the words, names and memories
            that matter most.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/personalize"
              className="label-xs rounded-sm bg-primary px-8 py-4 text-center text-primary-foreground transition-opacity hover:opacity-90"
            >
              Create your tag
            </Link>
            <Link
              to="/shop"
              className="label-xs rounded-sm border border-foreground/20 px-8 py-4 text-center transition-colors hover:border-primary hover:text-primary"
            >
              Shop the collection
            </Link>
          </div>
          <p className="label-xs mt-8 text-muted-foreground">
            Personalized <span className="mx-2 opacity-40">•</span> Meaningful
            <span className="mx-2 opacity-40">•</span> Made just for you
          </p>
        </div>

        <div className="order-1 md:order-2">
          <div className="overflow-hidden rounded-sm bg-secondary">
            <img
              src={hero.localPath}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="aspect-4/5 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="shell py-16 md:py-24">
        <Reveal>
          <SectionHeading
            label="Collections"
            title="Made for someone special"
            subtitle="Find a message for the person who means the most."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 60}>
              <CategoryCard
                category={category}
                imageIndex={index * 3}
                priority={index < 2}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {categories
            .filter((category) => category.comingSoon)
            .map((category) => (
              <div
                key={category.slug}
                className="flex flex-col justify-between gap-4 rounded-sm border border-border bg-secondary/40 p-8 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-display text-2xl uppercase">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    New designs are on the way.
                  </p>
                </div>
                <p className="label-xs text-muted-foreground">Coming soon</p>
              </div>
            ))}
        </div>
      </section>

      <div className="shell">
        <div className="hairline" />
      </div>

      {/* BESTSELLERS */}
      <section className="shell py-16 md:py-24">
        <Reveal>
          <SectionHeading
            label="Bestsellers"
            title="Most loved"
            subtitle="Small gifts. Big meaning."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {bestsellers.slice(0, 8).map((product, index) => (
            <Reveal key={product.slug} delay={index * 50}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="label-xs inline-flex border-b border-foreground/25 pb-1 transition-colors hover:border-primary hover:text-primary"
          >
            View all designs
          </Link>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-secondary/60 py-16 md:py-24">
        <div className="shell grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-sm">
              <img
                src={storyImage.localPath}
                alt={storyImage.alt}
                width={storyImage.width}
                height={storyImage.height}
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg uppercase">
              Some words deserve more than a message.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>A few words can become a reminder they carry every day.</p>
              <p>
                A personalized engraved tag turns names, memories and feelings into
                something real — something they can hold, keep and take with them
                wherever they go.
              </p>
              <p>This is more than a gift. It&rsquo;s your message, made permanent.</p>
            </div>
            <Link
              to="/personalize"
              className="label-xs mt-8 inline-flex rounded-sm bg-primary px-8 py-4 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Create something personal
            </Link>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="shell py-20 md:py-28">
        <Reveal>
          <SectionHeading
            label="How it works"
            title="Create something personal"
            subtitle="Choose. Personalize. We engrave."
          />
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 70}>
              <div className="border-t border-border pt-8">
                <step.Icon className="size-6 text-primary" strokeWidth={1.2} />
                <p className="label-xs mt-6 text-muted-foreground">
                  {step.number}
                </p>
                <h3 className="mt-2 font-display text-2xl uppercase">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PERSONALIZATION BUILDER */}
      <section id="personalize" className="bg-secondary/60 py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              label="Personalization"
              align="left"
              title="Your words. Your story. Your tag."
              subtitle="Create something completely personal."
            />
          </Reveal>
          <div className="mt-12">
            <PersonalizationForm allowDesignChoice />
          </div>
        </div>
      </section>

      {/* CUSTOM */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <h2 className="display-lg uppercase">
              Nothing here says it quite right?
            </h2>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              Write your own message and create a tag that belongs to only one
              person.
            </p>
            <Link
              to="/shop/$category"
              params={{ category: "custom" }}
              className="label-xs mt-8 inline-flex rounded-sm border border-foreground/20 px-8 py-4 transition-colors hover:border-primary hover:text-primary"
            >
              Create your own
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="overflow-hidden rounded-sm">
              <img
                src={customImage.localPath}
                alt={customImage.alt}
                width={customImage.width}
                height={customImage.height}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="shell py-16 md:py-24">
        <Reveal>
          <SectionHeading label="Why" title="More than a gift" />
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 60}>
              <div className="border-t border-border pt-6">
                <h3 className="label-xs text-primary">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {benefit.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="shell py-16 md:py-24">
        <Reveal>
          <SectionHeading label="Reviews" title="Made to be remembered" />
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.id} delay={index * 60}>
              <figure className="h-full rounded-sm border border-border bg-card p-8">
                <blockquote className="font-display text-xl leading-snug">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="label-xs mt-6 text-muted-foreground">
                  — {review.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Sample content shown while we collect real customer testimonials.
        </p>
      </section>

      {/* INSTAGRAM */}
      <section className="shell py-16 md:py-24">
        <Reveal>
          <SectionHeading
            label="Instagram"
            title="Follow the story"
            subtitle="New designs, personal messages and gift inspiration."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {instagramImages.map((image) => (
            <a
              key={image.id}
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-sm bg-secondary"
            >
              <img
                src={image.localPath}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
              />
            </a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="label-xs inline-flex rounded-sm border border-foreground/20 px-8 py-4 transition-colors hover:border-primary hover:text-primary"
          >
            Follow us on Instagram
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            {site.instagram.handle}
          </p>
        </div>
      </section>

      <FaqSection heading="Common questions" />

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden">
        <img
          src={finalImage.localPath}
          alt={finalImage.alt}
          width={finalImage.width}
          height={finalImage.height}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/70" />
        <div className="shell py-24 text-center text-ink-foreground md:py-32">
          <h2 className="display-lg mx-auto max-w-2xl uppercase">
            Turn your words into something they&rsquo;ll keep.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm opacity-85">
            Create a personalized engraved tag for someone who matters.
          </p>
          <Link
            to="/personalize"
            className="label-xs mt-10 inline-flex rounded-sm bg-primary px-10 py-4 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Create your tag
          </Link>
        </div>
      </section>
    </>
  );
}
