import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead } from "@/components/SiteChrome";
import { images } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — 7 ART Photography" },
    { name: "description", content: "The story and philosophy behind 7 ART Photography." },
    { property: "og:title", content: "About — 7 ART Photography" },
    { property: "og:description", content: "Moments worth remembering, captured with intention." },
  ] }),
  component: () => (
    <>
      <PageHead eyebrow="About" title="Captured with intention." />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-28 md:grid-cols-2">
        <img src={images.wedding} alt="Wedding under an arch" width={768} height={1024} className="w-full grayscale" />
        <div className="space-y-6 text-muted-foreground">
          <p className="font-serif text-3xl italic text-foreground">“We believe the moments worth remembering deserve to be captured with intention.”</p>
          <p>7 ART Photography began as a group of university photographers documenting campus life. Today we cover weddings, graduations, corporate events and private celebrations.</p>
          <p>Our philosophy is simple: observe first, direct gently, and deliver images that feel timeless rather than trendy.</p>
          <p className="text-xs">Studio story is editable placeholder copy for the demonstration.</p>
          <div className="flex gap-6 pt-6">
            <Link to="/photographers" className="btn-ink">Meet the Artists</Link>
            <Link to="/contact" className="eyebrow self-center border-b border-foreground pb-1">Contact</Link>
          </div>
        </div>
      </section>
    </>
  ),
});
