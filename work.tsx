import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/SiteChrome";
import { WorkGrid } from "@/components/sections";

export const Route = createFileRoute("/work")({
  head: () => ({ meta: [
    { title: "Selected Work — 7 ART Photography" },
    { name: "description", content: "Weddings, corporate events, portraits, graduations and event films." },
    { property: "og:title", content: "Selected Work — 7 ART Photography" },
    { property: "og:description", content: "A monochrome portfolio of events and portraits." },
  ] }),
  component: () => (
    <>
      <PageHead eyebrow="Portfolio" title="Selected Work" intro="Filter by category. Hover to linger." />
      <section className="mx-auto max-w-7xl px-6 pb-28"><WorkGrid /></section>
    </>
  ),
});
