/**
 * SAMPLE content only. These are demonstration placeholders, not verified
 * purchases. Replace with real customer testimonials when supplied.
 */
export interface Review {
  id: string;
  quote: string;
  author: string;
  /** True until a real, verified customer testimonial replaces the entry. */
  isSample: boolean;
}

export const reviews: Review[] = [
  {
    id: "sample-1",
    quote:
      "I wanted something small but meaningful for my daughter. This was exactly the feeling I wanted to give her.",
    author: "Sample customer",
    isSample: true,
  },
  {
    id: "sample-2",
    quote: "The message made the gift feel completely personal.",
    author: "Sample customer",
    isSample: true,
  },
  {
    id: "sample-3",
    quote:
      "Simple, quiet and personal — it said more than anything I could have bought in a shop.",
    author: "Sample customer",
    isSample: true,
  },
];
