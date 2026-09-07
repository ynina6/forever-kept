import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import { SectionHeading } from "./SectionHeading";

export function FaqSection({
  heading = "QUESTIONS",
  subtitle = "Everything about personalizing your tag.",
  limit,
}: {
  heading?: string;
  subtitle?: string;
  limit?: number;
}) {
  const items = limit ? faqItems.slice(0, limit) : faqItems;

  return (
    <section id="faq" className="shell py-20 md:py-28">
      <SectionHeading label="FAQ" title={heading} subtitle={subtitle} />
      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-sans text-[0.95rem] font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
