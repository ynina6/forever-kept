import { productSettings } from "@/config/site";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Can I use my own message?",
    answer:
      "Yes. You can personalize your tag with your own message, name, date or meaningful words.",
  },
  {
    question: "Can I add a name?",
    answer: "Yes. Names can be engraved exactly as you enter them.",
  },
  {
    question: "Can I add a special date?",
    answer: "Yes. A special date can be added to your personalization.",
  },
  {
    question: "Can I order in another language?",
    answer:
      "Yes. Personalized engraving can be requested in different languages, including English, Russian, Ukrainian and Turkish. Please enter the exact text you want engraved.",
  },
  {
    question: "Can I add a photo?",
    answer:
      "You can upload an optional photo in the personalization form so we can see the reference you have in mind.",
  },
  {
    question: "How long does personalization take?",
    answer: productSettings.productionTimeAnswer,
  },
  {
    question: "What material is the tag?",
    answer: productSettings.materialAnswer,
  },
  {
    question: "Do you ship internationally?",
    answer: productSettings.shippingAnswer,
  },
  {
    question: "Can I order more than one?",
    answer:
      "Yes. Customers can personalize multiple designs separately, each with its own message.",
  },
  {
    question: "Will my design look exactly like the preview?",
    answer:
      "Digital previews are intended to show approximate placement. Final engraving may vary slightly depending on the design and personalization.",
  },
];
