import { productSettings } from "@/config/site";
import { productImages, type ProductImage } from "./images";
import type { CategorySlug } from "./categories";

export interface Product {
  id: string;
  slug: string;
  title: string;
  recipient: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  images: ProductImage[];
  /** Primary Drive file ID for traceability with the master folder. */
  driveFileId: string;
  personalizable: boolean;
  featured: boolean;
  bestseller: boolean;
  languageOptions: readonly string[];
  customMessageAllowed: boolean;
  customNameAllowed: boolean;
  customDateAllowed: boolean;
  photoUploadAllowed: boolean;
}

type Draft = {
  slug: string;
  title: string;
  recipient: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  price: number;
  imageIds: string[];
  featured?: boolean;
  bestseller?: boolean;
};

const drafts: Draft[] = [
  {
    slug: "to-my-daughter-forever-with-you",
    title: "To My Daughter — Forever With You Tag",
    recipient: "For a daughter",
    category: "daughter",
    shortDescription: "A few words she can carry with her forever.",
    description:
      "A small engraved tag made to hold the words you want her to keep. Add her name, a date or a message written only for her.",
    price: 39,
    imageIds: ["daughter-01", "daughter-08", "daughter-13", "daughter-11"],
    featured: true,
    bestseller: true,
  },
  {
    slug: "for-my-daughter-satin-keepsake",
    title: "For My Daughter — Keepsake Tag",
    recipient: "For a daughter",
    category: "daughter",
    shortDescription: "Small enough to carry. Meaningful enough to keep.",
    description:
      "An engraved keepsake tag, personalized with your own words and presented on satin.",
    price: 39,
    imageIds: ["daughter-02", "daughter-07", "daughter-16", "daughter-03"],
    bestseller: true,
  },
  {
    slug: "for-my-daughter-silk-edition",
    title: "For My Daughter — Silk Edition Tag",
    recipient: "For a daughter",
    category: "daughter",
    shortDescription: "Her name, your words, made permanent.",
    description:
      "A personalized engraved tag for a daughter, engraved with the message you choose.",
    price: 42,
    imageIds: ["daughter-05", "daughter-06", "daughter-09", "daughter-14"],
  },
  {
    slug: "to-my-son-always-believe",
    title: "To My Son — Always Believe in Yourself Tag",
    recipient: "For a son",
    category: "son",
    shortDescription: "A reminder of your love, wherever life takes him.",
    description:
      "An engraved tag on deep emerald satin. Personalize it with his name, a date or your own message.",
    price: 39,
    imageIds: ["son-01", "son-02", "son-06", "son-03"],
    featured: true,
    bestseller: true,
  },
  {
    slug: "for-my-son-emerald-keepsake",
    title: "For My Son — Emerald Keepsake Tag",
    recipient: "For a son",
    category: "son",
    shortDescription: "Something he can carry every day.",
    description:
      "A personalized engraved tag for a son, engraved with the words you want him to keep.",
    price: 39,
    imageIds: ["son-04", "son-05", "son-03", "son-01"],
    bestseller: true,
  },
  {
    slug: "to-mom-thank-you-for-everything",
    title: "To Mom — Thank You for Everything Tag",
    recipient: "For a mother",
    category: "mom",
    shortDescription: "For the woman whose love is always with you.",
    description:
      "A personalized engraved medallion for a mother. Add her name, a date or a message she can keep close.",
    price: 42,
    imageIds: ["mom-01", "mom-02"],
    featured: true,
    bestseller: true,
  },
  {
    slug: "to-dad-forever-my-hero",
    title: "To Dad — Forever My Hero Tag",
    recipient: "For a father",
    category: "dad",
    shortDescription: "Words he may never forget.",
    description:
      "An engraved metal keyring tag for a father, personalized with your message, a name or a date.",
    price: 39,
    imageIds: ["dad-01", "dad-05", "dad-03", "dad-04"],
    featured: true,
    bestseller: true,
  },
  {
    slug: "for-dad-with-love",
    title: "For Dad — With Love Tag",
    recipient: "For a father",
    category: "dad",
    shortDescription: "A message he can hold on to.",
    description:
      "A personalized engraved keyring tag, made to carry the words that matter.",
    price: 39,
    imageIds: ["dad-02", "dad-06", "dad-04", "dad-01"],
  },
  {
    slug: "to-my-wife-my-one-and-only",
    title: "To My Wife — My One and Only Tag",
    recipient: "For her",
    category: "for-her",
    shortDescription: "Give her words she can keep forever.",
    description:
      "A personalized engraved tag presented on red velvet. Engrave her name, your date or your own message.",
    price: 45,
    imageIds: ["for-her-02", "for-her-06", "for-her-03", "for-her-05"],
    featured: true,
    bestseller: true,
  },
  {
    slug: "for-her-velvet-keepsake",
    title: "For Her — Velvet Keepsake Tag",
    recipient: "For her",
    category: "for-her",
    shortDescription: "Your words. Made permanent.",
    description:
      "An engraved keepsake tag for someone you love, personalized with your own words.",
    price: 45,
    imageIds: ["for-her-01", "for-her-04", "for-her-05", "for-her-03"],
    bestseller: true,
  },
  {
    slug: "create-your-own-message",
    title: "Create Your Own Message Tag",
    recipient: "For anyone",
    category: "custom",
    shortDescription: "Nothing here says it quite right? Write your own.",
    description:
      "A blank canvas. Choose the recipient, the language and the exact words you want engraved.",
    price: 39,
    imageIds: ["custom-02", "custom-01", "custom-08", "custom-16"],
    featured: true,
    bestseller: true,
  },
  {
    slug: "custom-engraved-tag-satin",
    title: "Custom Engraved Tag — Satin Presentation",
    recipient: "For anyone",
    category: "custom",
    shortDescription: "Carry the words that matter.",
    description:
      "A personalized engraved tag, presented on satin and engraved with your message.",
    price: 39,
    imageIds: ["custom-05", "custom-06", "custom-11", "custom-13"],
  },
];

const byId = new Map(
  Object.values(productImages)
    .flat()
    .map((image) => [image.id, image] as const),
);

export const products: Product[] = drafts.map((draft) => {
  const images = draft.imageIds
    .map((id) => byId.get(id))
    .filter((image): image is ProductImage => Boolean(image));

  return {
    id: draft.slug,
    slug: draft.slug,
    title: draft.title,
    recipient: draft.recipient,
    category: draft.category,
    shortDescription: draft.shortDescription,
    description: draft.description,
    price: draft.price,
    currency: "EUR",
    images,
    driveFileId: images[0]?.driveFileId ?? "",
    personalizable: true,
    featured: draft.featured ?? false,
    bestseller: draft.bestseller ?? false,
    languageOptions: productSettings.engravingLanguages,
    customMessageAllowed: true,
    customNameAllowed: true,
    customDateAllowed: true,
    photoUploadAllowed: true,
  };
});

export const productBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const productsByCategory = (category: string): Product[] =>
  products.filter((product) => product.category === category);

export const bestsellers = products.filter((product) => product.bestseller);
