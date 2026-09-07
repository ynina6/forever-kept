import { productImages, type ImageCategory, type ProductImage } from "./images";

export type CategorySlug =
  | "daughter"
  | "son"
  | "mom"
  | "dad"
  | "for-her"
  | "custom"
  | "husband"
  | "pets";

export interface Category {
  slug: CategorySlug;
  /** Collection title as shown on the storefront. */
  title: string;
  subtitle: string;
  shortLine: string;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  /** Image bucket used for this collection. Undefined = no real photos yet. */
  imageCategory?: ImageCategory;
  /** Categories without real product photography render a Coming Soon state. */
  comingSoon?: boolean;
}

export const categories: Category[] = [
  {
    slug: "daughter",
    title: "FOR DAUGHTER",
    subtitle: "A few words she can carry with her forever.",
    shortLine: "Words she can keep close.",
    navLabel: "Daughter",
    seoTitle: "Personalized Gifts for Daughter | Engraved Keepsake Tags",
    seoDescription:
      "Personalized engraved tags for a daughter — add her name, a date or your own message.",
    imageCategory: "daughter",
  },
  {
    slug: "son",
    title: "FOR SON",
    subtitle: "A reminder of your love, wherever life takes him.",
    shortLine: "Something he can carry every day.",
    navLabel: "Son",
    seoTitle: "Personalized Gifts for Son | Engraved Keepsake Tags",
    seoDescription:
      "Personalized engraved tags for a son — names, dates and messages engraved to keep.",
    imageCategory: "son",
  },
  {
    slug: "mom",
    title: "FOR MOM",
    subtitle: "For the woman whose love is always with you.",
    shortLine: "Say thank you in a way she keeps.",
    navLabel: "Mom",
    seoTitle: "Personalized Gifts for Mom | Engraved Keepsake Tags",
    seoDescription:
      "Personalized engraved tags for a mother — a small keepsake with your own words.",
    imageCategory: "mom",
  },
  {
    slug: "dad",
    title: "FOR DAD",
    subtitle: "Words he may never forget.",
    shortLine: "A message he can hold on to.",
    navLabel: "Dad",
    seoTitle: "Personalized Gifts for Dad | Engraved Keepsake Tags",
    seoDescription:
      "Personalized engraved tags and keyrings for a father — engraved with your message.",
    imageCategory: "dad",
  },
  {
    slug: "for-her",
    title: "FOR HER",
    subtitle: "Give her words she can keep forever.",
    shortLine: "Romantic, personal, permanent.",
    navLabel: "For Her",
    seoTitle: "Personalized Gifts for Her | Engraved Keepsake Tags",
    seoDescription:
      "Personalized engraved tags for her — your words, engraved and made to keep.",
    imageCategory: "for-her",
  },
  {
    slug: "custom",
    title: "CUSTOM",
    subtitle: "Write your own message and make it entirely yours.",
    shortLine: "Your words. Your story.",
    navLabel: "Custom",
    seoTitle: "Custom Engraved Tags | Your Own Message Engraved",
    seoDescription:
      "Create a custom engraved tag with your own message, name, date or language.",
    imageCategory: "custom",
  },
  {
    slug: "husband",
    title: "FOR HUSBAND",
    subtitle: "Coming soon.",
    shortLine: "New designs on the way.",
    navLabel: "Husband",
    seoTitle: "Personalized Gifts for Husband | Coming Soon",
    seoDescription:
      "Personalized engraved tags for a husband — this collection is coming soon.",
    comingSoon: true,
  },
  {
    slug: "pets",
    title: "FOR PETS",
    subtitle: "Coming soon.",
    shortLine: "New designs on the way.",
    navLabel: "Pets",
    seoTitle: "Personalized Pet Tags | Coming Soon",
    seoDescription:
      "Personalized engraved pet tags — this collection is coming soon.",
    comingSoon: true,
  },
];

export const visibleCategories = categories.filter((c) => !c.comingSoon);

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);

export const categoryImages = (category: Category): ProductImage[] =>
  category.imageCategory ? productImages[category.imageCategory] : [];
