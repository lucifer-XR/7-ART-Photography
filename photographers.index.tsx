import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/SiteChrome";
import { ArtistListing } from "@/components/sections";

export const Route = createFileRoute("/photographers/")({
  head: () => ({ meta: [
    { title: "Photographers & Videographers — 7 ART Photography" },
    { name: "description", content: "Search and sort all nine 7 ART artists." },
    { property: "og:title", content: "Meet the Artists — 7 ART Photography" },
    { property: "og:description", content: "Nine photographers and videographers." },
  ] }),
  component: () => (
    <>
      <PageHead eyebrow="The artists" title="Meet the Artists" intro="Illustrative demo profiles for the university demonstration." />
      <section className="mx-auto max-w-7xl px-6 pb-28"><ArtistListing /></section>
    </>
  ),
});
