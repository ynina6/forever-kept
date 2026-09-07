/**
 * Central brand + store configuration.
 * Change values here — they propagate across the whole storefront.
 */

export const site = {
  brandName: "KEEPSAKE ATELIER",
  brandTagline: "Personalized engraved tags",
  /** Replace with the real Instagram handle + URL. */
  instagram: {
    handle: "@yourbrand",
    url: "https://instagram.com/",
  },
  contactEmail: "hello@example.com",
  announcement: {
    primary: "Personalized for someone who matters.",
    secondary: "Custom engraving • Meaningful gifts • Made just for you",
  },
  currency: {
    code: "EUR",
    symbol: "€",
  },
} as const;

/**
 * Editable product facts. Keep answers here so nothing unverified is
 * hardcoded into page copy.
 */
export const productSettings = {
  /** Update once manufacturing specifications are verified. */
  materialAnswer:
    "Each tag is made from a polished silver-toned metal and finished with engraving. Full material details are confirmed with your order — we publish only verified specifications.",
  productionTimeAnswer:
    "Production times are shown before checkout and may vary depending on the personalization requested.",
  shippingAnswer:
    "Available destinations and shipping options are shown during checkout.",
  messageMaxLength: 120,
  nameMaxLength: 24,
  engravingLanguages: [
    "English",
    "Russian",
    "Ukrainian",
    "Turkish",
    "Other",
  ] as const,
  recipients: [
    "Daughter",
    "Son",
    "Mom",
    "Dad",
    "Wife",
    "Husband",
    "Partner",
    "Pet",
    "Friend",
    "Other",
  ] as const,
} as const;

export const formatPrice = (value: number) =>
  `${site.currency.symbol}${value.toFixed(2)}`;
