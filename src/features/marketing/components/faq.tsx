import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqItems } from "../data/faq";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Faq() {
  return (
    <section
      id="faq"
      className="border-border/60 bg-muted/20 relative isolate overflow-hidden border-t"
    >
      <span
        aria-hidden
        className="animate-bob font-display text-brand/[0.035] absolute top-8 right-[7%] -z-10 text-[13rem] leading-none"
      >
        ?
      </span>
      <span
        aria-hidden
        className="animate-twinkle bg-signal absolute top-40 left-[12%] -z-10 size-1.5 rounded-full [animation-delay:-2.4s]"
      />
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            description="Everything you need to know about how BuyWise works."
          />
        </Reveal>
        <Reveal delay={0.1} y={18} blur={6} className="mt-12">
          <Accordion multiple={false} className="gap-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="group/faq border-border/60 bg-card/80 data-open:border-brand/30 data-open:shadow-brand/5 overflow-hidden rounded-2xl border px-5 shadow-sm backdrop-blur-sm transition-all duration-300 data-open:shadow-lg"
              >
                <AccordionTrigger className="py-5 text-base hover:no-underline">
                  <span className="flex items-start gap-3 pr-4">
                    <span className="text-brand mt-0.5 font-mono text-[10px] font-semibold transition-transform duration-300 group-data-open/faq:scale-110">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-8 pb-5 pl-9">
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
