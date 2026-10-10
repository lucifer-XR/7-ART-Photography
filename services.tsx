import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/SiteChrome";
import { Packages, Services } from "@/components/sections";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faq: [string, string][] = [
  ["How far in advance should I book?", "We recommend 6–8 weeks for weddings and 2–3 weeks for smaller events."],
  ["When do we receive our images?", "Edited galleries are delivered within 3 weeks; films within 6 weeks."],
  ["Are the listed prices final?", "Listed prices are samples. Your final quote is calculated by our booking system based on date, duration and extras."],
  ["Do you travel?", "Yes — travel outside Colombo is quoted separately."],
];

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services & Investment — 7 ART Photography" },
    { name: "description", content: "Event photography, videography and combined packages in LKR." },
    { property: "og:title", content: "Services & Investment — 7 ART Photography" },
    { property: "og:description", content: "Essential, Signature and Full Day packages." },
  ] }),
  component: () => (
    <>
      <PageHead eyebrow="What we do" title="Services" />
      <section className="mx-auto max-w-7xl px-6"><Services /></section>
      <section className="mx-auto max-w-7xl px-6 py-28">
        <h2 className="mb-12 text-4xl uppercase tracking-[0.15em]">Investment</h2>
        <Packages />
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-28">
        <h2 className="mb-8 text-4xl italic">Questions</h2>
        <Accordion type="single" collapsible>
          {faq.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="font-serif text-xl">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  ),
});
